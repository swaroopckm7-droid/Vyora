import { sampleProducts } from '../../server/seed/seedData.js';

const API_BASE_URL = '/api';

export const fetchProducts = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/products?${queryString}`);
    if (!response.ok) throw new Error('API network response error');
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.warn('Backend API unreachable, using sample dataset:', error);
    let list = [...sampleProducts];
    if (params.category && params.category !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
    }
    if (params.gender && params.gender !== 'All') {
      list = list.filter(p => p.gender.toLowerCase() === params.gender.toLowerCase() || p.gender === 'Unisex');
    }
    if (params.collectionType && params.collectionType !== 'All') {
      list = list.filter(p => p.collectionType.toLowerCase() === params.collectionType.toLowerCase());
    }
    if (params.search) {
      const term = params.search.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }
    return list;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    const mockCreated = {
      _id: 'prod-local-' + Date.now(),
      ...productData,
      slug: productData.name.toLowerCase().replace(/\s+/g, '-'),
      rating: 5.0,
      reviewsCount: 1
    };
    sampleProducts.unshift(mockCreated);
    return { success: true, product: mockCreated, message: 'Added product locally' };
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    const idx = sampleProducts.findIndex(p => p._id === id || p.id === id);
    if (idx !== -1) sampleProducts.splice(idx, 1);
    return { success: true, message: 'Removed product locally' };
  }
};

export const fetchOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    const data = await response.json();
    return data.orders || [];
  } catch (error) {
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    const data = await response.json();
    return data.product;
  } catch (error) {
    return sampleProducts.find(p => p._id === id || p.id === id) || sampleProducts[0];
  }
};

export const submitOrder = async (orderPayload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: true,
      order: {
        orderNumber: 'VYR-' + Math.floor(100000 + Math.random() * 900000),
        totalAmount: orderPayload.totalAmount,
        paymentStatus: 'Paid'
      }
    };
  }
};

export const subscribeNewsletter = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: true, message: 'Welcome to the VyoraThreads Community!' };
  }
};
