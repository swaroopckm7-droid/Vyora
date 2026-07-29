import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, ShieldAlert, Package, ShoppingCart, RefreshCw, Check, Sparkles, Image, DollarSign, Tag, Layers, CheckCircle2 } from 'lucide-react';
import { addProduct, deleteProduct, fetchOrders, fetchProducts } from '../services/api';
import { useToast } from '../context/ToastContext';

export const OwnerDashboard = ({ onProductAdded }) => {
  const [activeTab, setActiveTab] = useState('add-product'); // 'add-product' | 'inventory' | 'orders'
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);

  // Add Product Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Hoodies',
    gender: 'Unisex',
    collectionType: 'Premium Essentials',
    price: '',
    originalPrice: '',
    discount: '',
    stockCount: '50',
    fabric: '100% Organic Supima Cotton',
    careInstructions: 'Machine wash cold, lay flat to dry.',
    description: '',
    images: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    colorName: 'Onyx Black',
    colorHex: '#0A0A0A',
    isNewArrival: true,
    isTrending: false
  });

  const categories = ['Hoodies', 'Oversized Wear', 'T-Shirts', 'Shirts', 'Jeans', 'Jackets', 'Accessories'];
  const genders = ['Unisex', 'Men', 'Women'];
  const collections = ['Premium Essentials', 'Streetwear', 'Casual Wear', 'Summer Collection', 'Winter Collection'];

  const loadData = async () => {
    setLoading(true);
    const prods = await fetchProducts();
    const ords = await fetchOrders();
    setInventory(prods);
    setOrders(ords);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.images) {
      showToast('Please fill out required fields (Name, Price, Image URL)', 'error');
      return;
    }

    setLoading(true);
    const productPayload = {
      name: formData.name,
      category: formData.category,
      gender: formData.gender,
      collectionType: formData.collectionType,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice || formData.price),
      discount: Number(formData.discount || 0),
      stockCount: Number(formData.stockCount || 50),
      fabric: formData.fabric,
      careInstructions: formData.careInstructions,
      description: formData.description || `${formData.name} crafted with luxury organic fibers.`,
      images: [formData.images],
      colors: [{ name: formData.colorName, hex: formData.colorHex }],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      isNewArrival: formData.isNewArrival,
      isTrending: formData.isTrending
    };

    const res = await addProduct(productPayload);
    setLoading(false);

    if (res.success) {
      showToast('✨ Product added to MongoDB & Vyora Catalog!', 'success');
      setFormData({
        name: '',
        category: 'Hoodies',
        gender: 'Unisex',
        collectionType: 'Premium Essentials',
        price: '',
        originalPrice: '',
        discount: '',
        stockCount: '50',
        fabric: '100% Organic Supima Cotton',
        careInstructions: 'Machine wash cold, lay flat to dry.',
        description: '',
        images: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
        colorName: 'Onyx Black',
        colorHex: '#0A0A0A',
        isNewArrival: true,
        isTrending: false
      });
      loadData();
      if (onProductAdded) onProductAdded();
    } else {
      showToast(res.message || 'Failed to add product', 'error');
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name} from MongoDB catalog?`)) return;
    setLoading(true);
    const res = await deleteProduct(id);
    setLoading(false);
    if (res.success) {
      showToast(`Deleted ${name} from inventory`, 'info');
      loadData();
      if (onProductAdded) onProductAdded();
    }
  };

  return (
    <div className="py-12 bg-vyora-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gold/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Owner Portal & Inventory Manager</span>
            </div>
            <h1 className="font-poppins font-black text-3xl sm:text-4xl text-white">
              VyoraThreads Store Management
            </h1>
          </div>

          <button
            onClick={loadData}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-charcoal hover:bg-gold hover:text-black text-gray-200 text-xs font-bold py-2.5 px-4 rounded-xl border border-white/10 transition-colors shadow-md"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync MongoDB</span>
          </button>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 border-b border-white/10">
          {[
            { id: 'add-product', label: 'Add New Product', icon: PlusCircle },
            { id: 'inventory', label: `Catalog Inventory (${inventory.length})`, icon: Package },
            { id: 'orders', label: `Customer Orders (${orders.length})`, icon: ShoppingCart }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold text-black shadow-gold-glow font-extrabold'
                    : 'bg-charcoal text-gray-300 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Add New Product Form */}
        {activeTab === 'add-product' && (
          <div className="bg-vyora-card border border-gold/30 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto text-left">
            <h2 className="font-poppins font-bold text-2xl text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-gold" />
              <span>Add Clothing Item to MongoDB Catalog</span>
            </h2>
            <p className="text-gray-400 text-xs mb-8">
              Fill out product details below. Newly added items automatically update the live store grid.
            </p>

            <form onSubmit={handleAddProduct} className="space-y-6">
              
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Imperial Gold Heavyweight Trench"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-gold outline-none"
                  required
                />
              </div>

              {/* Category, Gender, Collection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-xs font-bold text-white focus:border-gold outline-none"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Gender Target</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-xs font-bold text-white focus:border-gold outline-none"
                  >
                    {genders.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Collection Capsule</label>
                  <select
                    value={formData.collectionType}
                    onChange={(e) => setFormData({ ...formData, collectionType: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-xs font-bold text-white focus:border-gold outline-none"
                  >
                    {collections.map(col => <option key={col} value={col}>{col}</option>)}
                  </select>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Price ($) *</label>
                  <input
                    type="number"
                    placeholder="129"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-gold outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Original Price ($)</label>
                  <input
                    type="number"
                    placeholder="169"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Discount OFF (%)</label>
                  <input
                    type="number"
                    placeholder="20"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Stock Count</label>
                  <input
                    type="number"
                    placeholder="50"
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-gold outline-none"
                  />
                </div>
              </div>

              {/* Image URL & Color */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Product Image URL *</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-gold outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Color Name & Hex</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Onyx Black"
                      value={formData.colorName}
                      onChange={(e) => setFormData({ ...formData, colorName: e.target.value })}
                      className="flex-1 bg-charcoal border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none"
                    />
                    <input
                      type="color"
                      value={formData.colorHex}
                      onChange={(e) => setFormData({ ...formData, colorHex: e.target.value })}
                      className="w-12 h-12 rounded-xl bg-charcoal border border-white/10 cursor-pointer p-1"
                    />
                  </div>
                </div>
              </div>

              {/* Description & Fabric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Fabric Composition</label>
                  <input
                    type="text"
                    placeholder="100% Organic Heavyweight French Terry (480GSM)"
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-sm text-white outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Care Instructions</label>
                  <input
                    type="text"
                    placeholder="Machine wash cold inside out, lay flat to dry."
                    value={formData.careInstructions}
                    onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-sm text-white outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed description of tailoring, fit, and aesthetic details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-charcoal border border-white/10 rounded-xl p-3.5 text-sm text-white outline-none focus:border-gold resize-none"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                    className="w-4 h-4 accent-gold"
                  />
                  <span>Mark as New Arrival</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                    className="w-4 h-4 accent-gold"
                  />
                  <span>Mark as Trending</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-amber-400 to-gold-dark text-black font-extrabold text-sm py-4 rounded-full shadow-gold-glow hover:scale-[1.01] transition-transform uppercase tracking-wider disabled:opacity-50"
              >
                <PlusCircle className="w-5 h-5" />
                <span>{loading ? 'Publishing Product...' : 'Publish Product to MongoDB Catalog'}</span>
              </button>

            </form>
          </div>
        )}

        {/* Tab 2: Inventory Management Table */}
        {activeTab === 'inventory' && (
          <div className="bg-vyora-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-poppins font-bold text-xl text-white">Live MongoDB Product Catalog</h3>
              <span className="text-xs text-gold font-bold">{inventory.length} items total</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-charcoal text-gold font-bold uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-4">Item</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Gender</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Flags</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {inventory.map((item) => (
                    <tr key={item._id || item.id} className="hover:bg-white/5">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={item.images ? item.images[0] : item.image}
                          alt=""
                          className="w-10 h-12 object-cover rounded-lg border border-white/10 shrink-0"
                        />
                        <span className="font-bold text-white line-clamp-1">{item.name}</span>
                      </td>
                      <td className="p-4 font-semibold text-gold uppercase">{item.category}</td>
                      <td className="p-4">{item.gender}</td>
                      <td className="p-4 font-bold text-white">${item.price}</td>
                      <td className="p-4 font-bold text-emerald-400">{item.stockCount || 50} in stock</td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          {item.isNewArrival && <span className="bg-blue-950 text-blue-300 text-[9px] px-2 py-0.5 rounded font-bold">New</span>}
                          {item.isTrending && <span className="bg-amber-950 text-gold text-[9px] px-2 py-0.5 rounded font-bold">Trending</span>}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(item._id || item.id, item.name)}
                          className="text-gray-500 hover:text-rose-400 p-2 rounded-lg bg-black/40 hover:bg-rose-950/40 transition-colors"
                          title="Delete from MongoDB"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Customer Orders Overview */}
        {activeTab === 'orders' && (
          <div className="bg-vyora-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-poppins font-bold text-xl text-white">Customer Orders Overview</h3>
              <span className="text-xs text-gold font-bold">{orders.length} orders placed</span>
            </div>

            {orders.length > 0 ? (
              <div className="p-6 space-y-4">
                {orders.map((ord, idx) => (
                  <div key={idx} className="bg-charcoal border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-left">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-poppins font-bold text-gold text-sm">{ord.orderNumber}</span>
                        <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                          {ord.paymentStatus || 'Paid'}
                        </span>
                      </div>
                      <p className="text-white font-semibold">{ord.customer?.fullName} ({ord.customer?.email})</p>
                      <p className="text-gray-400 mt-0.5">{ord.customer?.address}, {ord.customer?.city}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-poppins font-black text-lg text-gold">${ord.totalAmount?.toFixed(2)}</p>
                      <p className="text-gray-400 text-[10px] uppercase">Payment: {ord.paymentMethod || 'Card'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400 text-sm">
                No orders recorded in MongoDB yet. Place an order on the store to see it appear here!
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
