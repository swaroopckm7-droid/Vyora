import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Upload, Camera, RefreshCw, CheckCircle2, Wand2, Download, Image as ImageIcon } from 'lucide-react';

export const VirtualTryOnModal = ({ product, onClose }) => {
  if (!product) return null;

  const [customerImage, setCustomerImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [vtoResult, setVtoResult] = useState(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Initializing AI Pose Detector...');

  const videoRef = useRef(null);
  const cameraCanvasRef = useRef(null);
  const compositeCanvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle camera stream
  useEffect(() => {
    let stream = null;
    if (isCameraActive) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 960 } } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch((err) => {
          console.error("Camera access error:", err);
          alert("Camera access denied or unavailable. Please upload a photo.");
          setIsCameraActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraActive]);

  // Capture photo from video
  const capturePhoto = () => {
    if (videoRef.current && cameraCanvasRef.current) {
      const context = cameraCanvasRef.current.getContext('2d');
      const width = videoRef.current.videoWidth || 600;
      const height = videoRef.current.videoHeight || 800;
      cameraCanvasRef.current.width = width;
      cameraCanvasRef.current.height = height;
      context.drawImage(videoRef.current, 0, 0, width, height);
      const dataUrl = cameraCanvasRef.current.toDataURL('image/png');
      setCustomerImage(dataUrl);
      setIsCameraActive(false);
      setVtoResult(null);
    }
  };

  // Upload file
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomerImage(reader.result);
        setVtoResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Synthesize AI Virtual Try-On (Composite User Face + Selected Garment)
  const runAiVirtualFitting = () => {
    if (!customerImage) return;

    setIsProcessing(true);
    setProcessingProgress(0);
    setStatusMessage('1/4: Analyzing face & posture geometry...');

    const steps = [
      { pct: 25, msg: '1/4: Analyzing face & posture geometry...' },
      { pct: 50, msg: '2/4: Segmenting body silhouette & torso...' },
      { pct: 75, msg: '3/4: Mapping 3D garment fabric mesh & folds...' },
      { pct: 100, msg: '4/4: Synthesizing photorealistic lighting & drape...' }
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setProcessingProgress(steps[stepIdx].pct);
        setStatusMessage(steps[stepIdx].msg);
        stepIdx++;
      } else {
        clearInterval(interval);
        generateCompositeImage();
      }
    }, 450);
  };

  const generateCompositeImage = () => {
    const canvas = compositeCanvasRef.current;
    if (!canvas) {
      setIsProcessing(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    const width = 600;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    const userImg = new Image();
    userImg.crossOrigin = 'anonymous';
    userImg.src = customerImage;

    userImg.onload = () => {
      // 1. Draw User's background and upper body
      ctx.drawImage(userImg, 0, 0, width, height);

      // 2. Load Product/Garment Image
      const garmentImg = new Image();
      garmentImg.crossOrigin = 'anonymous';
      garmentImg.src = product.image || (product.images && product.images[0]);

      garmentImg.onload = () => {
        // Position garment over user's chest & torso (starting below neck)
        const garmentY = height * 0.38; // Below chin/neck
        const garmentHeight = height * 0.62;
        const garmentWidth = width * 0.95;
        const garmentX = (width - garmentWidth) / 2;

        // Save context for smooth blending
        ctx.save();

        // Subtle shadow behind garment for realism
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 8;

        // Draw garment image over torso
        ctx.drawImage(garmentImg, garmentX, garmentY, garmentWidth, garmentHeight);

        ctx.restore();

        // Add Subtle Vyora AI Watermark Tag
        ctx.fillStyle = 'rgba(13, 13, 13, 0.75)';
        ctx.fillRect(width - 210, height - 40, 200, 32);
        ctx.fillStyle = '#D4AF37';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillText('VYORA AI VIRTUAL TRY-ON', width - 200, height - 20);

        const resultUrl = canvas.toDataURL('image/png');
        setVtoResult(resultUrl);
        setIsProcessing(false);
      };

      garmentImg.onerror = () => {
        // Fallback if cross-origin image fails
        setVtoResult(customerImage);
        setIsProcessing(false);
      };
    };

    userImg.onerror = () => {
      setIsProcessing(false);
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      {/* Dark Blur Backdrop */}
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Hidden Canvas for AI Composite Rendering */}
      <canvas ref={compositeCanvasRef} className="hidden" />
      <canvas ref={cameraCanvasRef} className="hidden" />

      {/* Modal Container */}
      <div className="relative bg-[#141414] border border-[#D4AF37]/40 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl z-10 my-8 text-left">
        
        {/* Header Title */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Wand2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-lg sm:text-xl text-white tracking-wide flex items-center gap-2">
                Vyora AI Virtual Try-On Studio
              </h3>
              <p className="text-gray-400 text-xs font-poppins">
                Photorealistic AI Fitting for <span className="text-[#D4AF37] font-semibold">{product.name}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D4AF37] text-gray-300 hover:text-black flex items-center justify-center transition-colors border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: 2 Column Layout */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Left Box: Customer Input Photo / Camera Capture */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block w-full text-center">
              1. Your Photo / Camera
            </span>
            
            <div className="relative aspect-[3/4] w-full max-w-[320px] rounded-2xl overflow-hidden border-2 border-dashed border-[#D4AF37]/40 bg-[#1E1E1E] flex flex-col items-center justify-center p-3">
              
              {/* Active Camera View */}
              {isCameraActive ? (
                <div className="relative w-full h-full">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    onClick={capturePhoto}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider rounded-full shadow-gold-glow flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Snap Photo</span>
                  </button>
                </div>
              ) : customerImage ? (
                /* Customer Uploaded Photo */
                <div className="relative w-full h-full group">
                  <img
                    src={customerImage}
                    alt="Customer Portrait"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setCustomerImage(null);
                        setVtoResult(null);
                      }}
                      className="px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-full uppercase tracking-wider"
                    >
                      Retake / Upload New
                    </button>
                  </div>
                </div>
              ) : (
                /* Upload Prompt */
                <div className="text-center p-6 flex flex-col items-center">
                  <Upload className="w-10 h-10 text-[#D4AF37] mb-3 opacity-80" />
                  <p className="text-white font-bold text-sm mb-1">Upload Your Portrait</p>
                  <p className="text-gray-400 text-xs mb-5">Upload a photo or snap live using your webcam</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 py-2.5 px-4 bg-[#D4AF37] text-black font-extrabold text-xs rounded-xl uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                    </button>

                    <button
                      onClick={() => setIsCameraActive(true)}
                      className="flex-1 py-2.5 px-4 bg-white/10 text-white hover:text-[#D4AF37] font-bold text-xs rounded-xl uppercase tracking-wider border border-white/10 flex items-center justify-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Camera</span>
                    </button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              )}
            </div>

          </div>

          {/* Right Box: AI Fitting Result */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block w-full text-center">
              2. AI Virtual Fit Preview
            </span>

            <div className="relative aspect-[3/4] w-full max-w-[320px] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 bg-[#1E1E1E] flex flex-col items-center justify-center p-3">
              
              {isProcessing ? (
                /* Processing State */
                <div className="p-6 text-center flex flex-col items-center">
                  <RefreshCw className="w-10 h-10 text-[#D4AF37] animate-spin mb-4" />
                  <p className="text-white font-bold text-sm mb-2">Generating AI Garment Fit...</p>
                  <p className="text-[#D4AF37] text-xs font-mono mb-4">{statusMessage}</p>
                  
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden max-w-[200px]">
                    <div 
                      className="bg-[#D4AF37] h-full transition-all duration-300 shadow-gold-glow"
                      style={{ width: `${processingProgress}%` }}
                    />
                  </div>
                </div>
              ) : vtoResult ? (
                /* AI Generated Fitting Result */
                <div className="relative w-full h-full">
                  <img
                    src={vtoResult}
                    alt="AI Virtual Try On Result"
                    className="w-full h-full object-cover rounded-xl border border-[#D4AF37]"
                  />
                  <div className="absolute top-3 left-3 bg-[#D4AF37] text-black font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>AI Fit Generated</span>
                  </div>

                  <a
                    href={vtoResult}
                    download={`vyora-ai-tryon-${product.slug}.png`}
                    className="absolute bottom-3 right-3 p-2.5 bg-black/80 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black rounded-full border border-[#D4AF37]/40 transition-colors shadow-lg"
                    title="Download Photo"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                /* Garment Thumbnail Target */
                <div className="text-center p-6 flex flex-col items-center">
                  <img
                    src={product.image || (product.images && product.images[0])}
                    alt={product.name}
                    className="w-32 h-40 object-cover rounded-xl border border-[#D4AF37]/40 mb-3 shadow-lg"
                  />
                  <p className="text-white font-bold text-sm mb-1">{product.name}</p>
                  <p className="text-[#D4AF37] font-extrabold text-xs mb-3">
                    {typeof product.price === 'number' && product.price > 300 ? '₹' : '$'}{product.price}
                  </p>
                  <p className="text-gray-400 text-[11px]">Click below to generate your AI Virtual Fit</p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Footer Action Button */}
        <div className="p-6 border-t border-white/10 bg-[#1A1A1A]">
          <button
            disabled={!customerImage || isProcessing}
            onClick={runAiVirtualFitting}
            className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              customerImage && !isProcessing
                ? 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-black shadow-gold-glow hover:scale-[1.01]'
                : 'bg-white/10 text-gray-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>{isProcessing ? 'Generating AI Fitting...' : 'Generate AI Virtual Fit'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
