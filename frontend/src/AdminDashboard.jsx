import React, { useState, useEffect } from 'react';
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Truck, 
  XCircle, 
  Trash2, 
  MessageCircle, 
  Save, 
  RefreshCw, 
  ArrowLeft, 
  Lock, 
  Eye, 
  Tag, 
  Image as ImageIcon, 
  Search, 
  Phone, 
  MapPin, 
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Send,
  Bell,
  Check,
  HelpCircle
} from 'lucide-react';

export default function AdminDashboard({ backendUrl, onBackToShop, onProductsUpdated }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'telegram'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Telegram settings state
  const [telegramToken, setTelegramToken] = useState('');
  const [telegramChatId, setTelegramChatId] = useState('');
  const [telegramTesting, setTelegramTesting] = useState(false);
  const [telegramTestSuccess, setTelegramTestSuccess] = useState('');
  const [telegramTestError, setTelegramTestError] = useState('');

  // Preset image choices
  const presetImages = [
    { label: 'Savon Liquide', url: '/images/savon-liquide.jpg' },
    { label: 'Sérum Visage', url: '/images/serum-visage.jpg' },
    { label: 'Crème Visage', url: '/images/creme-visage.jpg' },
    { label: 'Soin Localisé Tube', url: '/images/creme-tube.jpg' },
    { label: 'Hero Pack Complet', url: '/images/hero-products.jpg' },
  ];

  // Check saved session
  useEffect(() => {
    const session = localStorage.getItem('lyxene_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch(`${backendUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('lyxene_admin_session', 'true');
        fetchData();
      } else {
        setLoginError('Mot de passe incorrect.');
      }
    } catch (err) {
      if (password === 'yassir2027') {
        setIsAuthenticated(true);
        localStorage.setItem('lyxene_admin_session', 'true');
        fetchData();
      } else {
        setLoginError('Mot de passe incorrect ou erreur de connexion.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('lyxene_admin_session');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Products
      const pRes = await fetch(`${backendUrl}/api/products`);
      if (pRes.ok) {
        const pData = await pRes.json();
        setProducts(pData);
      }

      // Fetch Orders
      const oRes = await fetch(`${backendUrl}/api/orders`);
      if (oRes.ok) {
        const oData = await oRes.json();
        setOrders(oData.orders || []);
      }

      // Fetch Settings
      const sRes = await fetch(`${backendUrl}/api/settings`);
      if (sRes.ok) {
        const sData = await sRes.json();
        setTelegramToken(sData.telegramToken || '');
        setTelegramChatId(sData.telegramChatId || '');
      }
    } catch (e) {
      console.error('Error fetching admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  // Product field update
  const handleProductChange = (id, field, value) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, [field]: value };
        if (field === 'price') {
          updated.price = Number(value) || 0;
          updated.priceLabel = `${value} DH`;
        }
        return updated;
      }
      return p;
    }));
  };

  // Save single product
  const saveProduct = async (product) => {
    try {
      const res = await fetch(`${backendUrl}/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (res.ok) {
        setSaveSuccess(`Produit "${product.name}" mis à jour avec succès!`);
        setTimeout(() => setSaveSuccess(''), 4000);
        if (onProductsUpdated) onProductsUpdated();
      }
    } catch (e) {
      alert('Erreur lors de la sauvegarde');
    }
  };

  // Reset to default products
  const resetProducts = async () => {
    if (!window.confirm('Voulez-vous vraiment réinitialiser tous les produits aux valeurs par défaut ?')) return;
    try {
      const res = await fetch(`${backendUrl}/api/products/reset`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
        setSaveSuccess('Produits réinitialisés par défaut !');
        setTimeout(() => setSaveSuccess(''), 4000);
        if (onProductsUpdated) onProductsUpdated();
      }
    } catch (e) {
      alert('Erreur');
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${backendUrl}/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (e) {
      alert('Erreur');
    }
  };

  // Delete order
  const deleteOrder = async (orderId) => {
    if (!window.confirm(`Supprimer définitivement la commande ${orderId} ?`)) return;
    try {
      const res = await fetch(`${backendUrl}/api/orders/${orderId}`, { method: 'DELETE' });
      if (res.ok) {
        setOrders(prev => prev.filter(o => o.id !== orderId));
      }
    } catch (e) {
      alert('Erreur');
    }
  };

  // Save Telegram Settings
  const handleSaveTelegram = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramToken, telegramChatId })
      });
      if (res.ok) {
        setSaveSuccess('Paramètres Telegram enregistrés avec succès !');
        setTimeout(() => setSaveSuccess(''), 4000);
      }
    } catch (e) {
      alert('Erreur lors de la sauvegarde des paramètres');
    }
  };

  // Test Telegram Notification
  const handleTestTelegram = async () => {
    setTelegramTesting(true);
    setTelegramTestSuccess('');
    setTelegramTestError('');

    try {
      const res = await fetch(`${backendUrl}/api/test-telegram`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramToken, telegramChatId })
      });
      const data = await res.json();
      if (data.success) {
        setTelegramTestSuccess(data.message);
      } else {
        setTelegramTestError(data.error || 'Erreur Telegram');
      }
    } catch (err) {
      setTelegramTestError('Erreur de connexion au serveur Render.');
    } finally {
      setTelegramTesting(false);
    }
  };

  // Format phone to international WhatsApp link
  const getWhatsAppLink = (phone, name, orderId, total) => {
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '212' + cleanPhone.substring(1);
    }
    const msg = `Salam ${name}, marhba bik f LYXENE Skincare! 🌿\nBghina n-akdou m3ak la commande dyalek N° *${orderId}* (${total} DH).\nWash l'adresse s7i7a bach nsiftoha lik ?`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      (o.fullName && o.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.phone && o.phone.includes(searchQuery)) ||
      (o.city && o.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.id && o.id.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const confirmedOrders = orders.filter(o => o.status === 'confirmed' || o.status === 'delivered').length;

  // ============================================
  //  LOGIN SCREEN
  // ============================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#FBF9F5] rounded-3xl p-8 shadow-2xl border border-[#DFD6C7]">
          <div className="text-center mb-8">
            <img 
              src="/images/logo.png" 
              alt="LYXENE Logo" 
              className="w-16 h-16 object-contain mx-auto mb-3 rounded-full shadow-md"
            />
            <h1 className="font-serif font-bold text-2xl text-[#2D4030]">LYXENE PARIS</h1>
            <p className="text-xs text-[#A26D62] font-semibold uppercase tracking-wider mt-1">Espace Administration</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#2D4030]" /> Mot de passe Administrateur
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                className="w-full text-sm p-3.5 rounded-xl border border-[#DFD6C7] bg-white focus:outline-none focus:border-[#2D4030] focus:ring-2 focus:ring-[#2D4030]/20"
                autoFocus
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#2D4030] hover:bg-[#202E23] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {loginLoading ? 'Connexion...' : 'Accéder au Dashboard'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onBackToShop}
              className="text-xs text-[#2D4030] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Retour à la boutique
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  //  MAIN DASHBOARD
  // ============================================
  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#1E2922] font-sans antialiased">
      
      {/* Top Admin Header */}
      <header className="bg-[#2D4030] text-[#F7F4EE] sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/images/logo.png" 
              alt="LYXENE Logo" 
              className="w-10 h-10 object-contain rounded-full bg-white/10 p-0.5"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg tracking-wider">LYXENE</span>
                <span className="bg-[#A26D62] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Admin</span>
              </div>
              <span className="text-[11px] text-gray-300 block">Gestion Produits & Commandes COD</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              title="Actualiser les données"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Actualiser</span>
            </button>
            <button
              onClick={onBackToShop}
              className="bg-[#F7F4EE] text-[#2D4030] px-4 py-2 rounded-xl text-xs font-bold hover:bg-white transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Voir la Boutique</span>
            </button>
            <button
              onClick={handleLogout}
              className="text-xs text-gray-300 hover:text-white px-2 py-1 cursor-pointer"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Sub-tabs bar */}
        <div className="max-w-7xl mx-auto px-6 border-t border-[#405844] flex gap-2 pt-2 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-[#F4EFE6] text-[#2D4030] shadow'
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            <Package className="w-4 h-4" />
            📦 Produits & Prix ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-[#F4EFE6] text-[#2D4030] shadow'
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            📋 Commandes & Leads ({orders.length})
            {pendingOrders > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {pendingOrders}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('telegram')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'telegram'
                ? 'bg-[#F4EFE6] text-[#2D4030] shadow'
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            <Send className="w-4 h-4 text-[#29b6f6]" />
            🔔 Alertes Telegram (Groupe)
            {telegramToken && telegramChatId && (
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <CheckCircle className="w-5 h-5 text-green-700" />
              <span>{saveSuccess}</span>
            </div>
            <button onClick={() => setSaveSuccess('')} className="text-green-700 hover:text-green-900 text-xs font-bold">
              ✕
            </button>
          </div>
        )}

        {/* ============================================
            TAB 1: PRODUCTS & PRICES MANAGEMENT
        ============================================ */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FBF9F5] p-5 rounded-2xl border border-[#DFD6C7]">
              <div>
                <h2 className="font-serif font-bold text-xl text-[#2D4030]">Gestion des Produits & Tarification</h2>
                <p className="text-xs text-gray-600 mt-0.5">Modifiez les prix, les images et les descriptions. Tout changement est sauvegardé et visible sur la boutique en temps réel.</p>
              </div>
              <button
                onClick={resetProducts}
                className="text-xs text-gray-500 hover:text-red-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Réinitialiser par défaut
              </button>
            </div>

            {/* Product Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-[#FBF9F5] rounded-3xl p-6 border border-[#DFD6C7] shadow-sm hover:shadow-md transition space-y-4"
                >
                  
                  {/* Top Product Header */}
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 rounded-2xl bg-white border border-[#DFD6C7] overflow-hidden flex-shrink-0 relative group">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = '/images/savon-liquide.jpg'; }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#A26D62] uppercase tracking-wider">{product.tag}</span>
                        <span className="text-[10px] bg-[#EFEAE1] text-[#2D4030] font-semibold px-2 py-0.5 rounded-full">{product.badge}</span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#2D4030] mt-1">{product.name}</h3>
                      <p className="text-xs text-gray-500 line-clamp-1">{product.subtitle}</p>
                      
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xl font-bold text-[#2D4030]">{product.price} DH</span>
                        <span className="text-[11px] text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-md">Actif sur le site</span>
                      </div>
                    </div>
                  </div>

                  <hr className="border-[#EFEAE1]" />

                  {/* Form fields */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    
                    {/* Price field */}
                    <div>
                      <label className="font-bold text-gray-700 block mb-1 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-[#2D4030]" /> Prix (DH) *
                      </label>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) => handleProductChange(product.id, 'price', e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#DFD6C7] bg-white font-bold text-sm text-[#2D4030] focus:outline-none focus:border-[#2D4030]"
                      />
                    </div>

                    {/* Badge */}
                    <div>
                      <label className="font-bold text-gray-700 block mb-1 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-[#2D4030]" /> Badge Promo
                      </label>
                      <input
                        type="text"
                        value={product.badge || ''}
                        onChange={(e) => handleProductChange(product.id, 'badge', e.target.value)}
                        placeholder="Ex: Best Seller"
                        className="w-full p-2.5 rounded-xl border border-[#DFD6C7] bg-white focus:outline-none focus:border-[#2D4030]"
                      />
                    </div>

                    {/* Image URL */}
                    <div className="col-span-2">
                      <label className="font-bold text-gray-700 block mb-1 flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5 text-[#2D4030]" /> URL de l'Image
                      </label>
                      <input
                        type="text"
                        value={product.image}
                        onChange={(e) => handleProductChange(product.id, 'image', e.target.value)}
                        placeholder="/images/savon-liquide.jpg ou URL externe"
                        className="w-full p-2.5 rounded-xl border border-[#DFD6C7] bg-white text-[11px] focus:outline-none focus:border-[#2D4030]"
                      />
                      
                      {/* Presets */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="text-[10px] text-gray-400 self-center mr-1">Photos dispo :</span>
                        {presetImages.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleProductChange(product.id, 'image', img.url)}
                            className={`text-[10px] px-2 py-0.5 rounded-lg border transition cursor-pointer ${
                              product.image === img.url 
                                ? 'bg-[#2D4030] text-white border-[#2D4030]' 
                                : 'bg-white text-gray-600 border-[#DFD6C7] hover:bg-gray-50'
                            }`}
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Titre FR */}
                    <div className="col-span-2">
                      <label className="font-bold text-gray-700 block mb-1">Nom du Produit (Français)</label>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                        className="w-full p-2 rounded-xl border border-[#DFD6C7] bg-white focus:outline-none focus:border-[#2D4030]"
                      />
                    </div>

                    {/* Description FR */}
                    <div className="col-span-2">
                      <label className="font-bold text-gray-700 block mb-1">Description (Français)</label>
                      <textarea
                        value={product.subtitle}
                        onChange={(e) => handleProductChange(product.id, 'subtitle', e.target.value)}
                        rows={2}
                        className="w-full p-2 rounded-xl border border-[#DFD6C7] bg-white focus:outline-none focus:border-[#2D4030] resize-none"
                      />
                    </div>

                    {/* Titre AR */}
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">الاسم بالعربية</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={product.arName || ''}
                        onChange={(e) => handleProductChange(product.id, 'arName', e.target.value)}
                        className="w-full p-2 rounded-xl border border-[#DFD6C7] bg-white focus:outline-none focus:border-[#2D4030]"
                      />
                    </div>

                    {/* Tag Étape */}
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Tag Étape</label>
                      <input
                        type="text"
                        value={product.tag || ''}
                        onChange={(e) => handleProductChange(product.id, 'tag', e.target.value)}
                        placeholder="Ex: Étape 1 : Nettoyage"
                        className="w-full p-2 rounded-xl border border-[#DFD6C7] bg-white focus:outline-none focus:border-[#2D4030]"
                      />
                    </div>
                  </div>

                  {/* Save button */}
                  <div className="pt-2">
                    <button
                      onClick={() => saveProduct(product)}
                      className="w-full bg-[#2D4030] hover:bg-[#202E23] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      Enregistrer les modifications ({product.price} DH)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================
            TAB 2: ORDERS & LEADS MANAGEMENT
        ============================================ */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#FBF9F5] p-5 rounded-2xl border border-[#DFD6C7]">
                <span className="text-xs text-gray-500 font-semibold block">Total Commandes</span>
                <span className="text-2xl font-bold text-[#2D4030] mt-1 block">{orders.length}</span>
              </div>

              <div className="bg-[#FBF9F5] p-5 rounded-2xl border border-[#DFD6C7]">
                <span className="text-xs text-gray-500 font-semibold block">Chiffre d'Affaires</span>
                <span className="text-2xl font-bold text-[#2D4030] mt-1 block">{totalRevenue} DH</span>
              </div>

              <div className="bg-[#FBF9F5] p-5 rounded-2xl border border-[#DFD6C7]">
                <span className="text-xs text-amber-700 font-semibold block">En Attente (Nouveau)</span>
                <span className="text-2xl font-bold text-amber-600 mt-1 block">{pendingOrders}</span>
              </div>

              <div className="bg-[#FBF9F5] p-5 rounded-2xl border border-[#DFD6C7]">
                <span className="text-xs text-green-700 font-semibold block">Confirmées / Livrées</span>
                <span className="text-2xl font-bold text-green-700 mt-1 block">{confirmedOrders}</span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-[#DFD6C7] flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par nom, téléphone, ville..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#DFD6C7] bg-white text-xs focus:outline-none focus:border-[#2D4030]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">Filtrer:</span>
                {['all', 'pending', 'confirmed', 'delivered', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-semibold capitalize whitespace-nowrap transition cursor-pointer ${
                      statusFilter === status
                        ? 'bg-[#2D4030] text-white shadow-sm'
                        : 'bg-white text-gray-600 border border-[#DFD6C7] hover:bg-gray-50'
                    }`}
                  >
                    {status === 'all' ? 'Toutes' : status === 'pending' ? 'En Attente' : status === 'confirmed' ? 'Confirmé' : status === 'delivered' ? 'Livré' : 'Annulé'}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="bg-[#FBF9F5] rounded-3xl p-12 text-center border border-[#DFD6C7]">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-serif font-bold text-lg text-gray-700">Aucune commande trouvée</h3>
                <p className="text-xs text-gray-500 mt-1">Les nouvelles commandes passées par vos clients apparaîtront ici.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const whatsappLink = getWhatsAppLink(order.phone, order.fullName, order.id, order.total);
                  const orderDate = new Date(order.createdAt).toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <div 
                      key={order.id}
                      className="bg-[#FBF9F5] rounded-2xl p-5 border border-[#DFD6C7] shadow-sm hover:shadow-md transition space-y-4"
                    >
                      {/* Top order info */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#EFEAE1] pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm text-[#2D4030] bg-[#EFEAE1] px-2.5 py-1 rounded-lg">
                            {order.id}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {orderDate}
                          </span>
                        </div>

                        {/* Status selector */}
                        <div className="flex items-center gap-2">
                          <select
                            value={order.status || 'pending'}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                              order.status === 'confirmed' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                              order.status === 'delivered' ? 'bg-green-50 text-green-800 border-green-200' :
                              order.status === 'cancelled' ? 'bg-red-50 text-red-800 border-red-200' :
                              'bg-amber-50 text-amber-800 border-amber-200'
                            }`}
                          >
                            <option value="pending">⏳ En Attente</option>
                            <option value="confirmed">📞 Confirmé</option>
                            <option value="delivered">✅ Livré</option>
                            <option value="cancelled">❌ Annulé</option>
                          </select>

                          <button
                            onClick={() => deleteOrder(order.id)}
                            title="Supprimer la commande"
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Client details & items */}
                      <div className="grid md:grid-cols-3 gap-4 text-xs">
                        
                        {/* Client details */}
                        <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-[#DFD6C7]">
                          <p className="font-bold text-sm text-[#2D4030]">{order.fullName}</p>
                          <p className="text-gray-600 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#2D4030]" />
                            <a href={`tel:${order.phone}`} className="hover:underline font-mono">{order.phone}</a>
                          </p>
                          <p className="text-gray-600 flex items-start gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#2D4030] flex-shrink-0 mt-0.5" />
                            <span><strong>{order.city}</strong> — {order.address}</span>
                          </p>
                          {order.notes && (
                            <p className="text-gray-500 italic bg-gray-50 p-2 rounded-lg mt-1">
                              Note: "{order.notes}"
                            </p>
                          )}
                        </div>

                        {/* Items ordered */}
                        <div className="space-y-2 bg-white p-3.5 rounded-xl border border-[#DFD6C7]">
                          <span className="font-semibold text-gray-500 uppercase text-[10px] tracking-wider block">Articles commandés :</span>
                          <ul className="space-y-1">
                            {order.items && order.items.map((item, idx) => (
                              <li key={idx} className="flex justify-between items-center text-gray-700">
                                <span>• {item.name}</span>
                                <span className="font-bold">{item.price} DH</span>
                              </li>
                            ))}
                          </ul>
                          <div className="border-t border-gray-100 pt-2 flex justify-between items-center font-bold text-sm text-[#2D4030]">
                            <span>Total COD :</span>
                            <span>{order.total} DH</span>
                          </div>
                        </div>

                        {/* Direct WhatsApp CTA */}
                        <div className="flex flex-col justify-between bg-white p-3.5 rounded-xl border border-[#DFD6C7]">
                          <div>
                            <span className="font-semibold text-gray-500 uppercase text-[10px] tracking-wider block mb-1">Action Rapide :</span>
                            <p className="text-[11px] text-gray-600">Contactez directement la cliente sur WhatsApp pour confirmer la commande.</p>
                          </div>
                          
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] hover:bg-[#1fba59] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition mt-3"
                          >
                            <MessageCircle className="w-4 h-4 fill-current" />
                            Confirmer sur WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ============================================
            TAB 3: TELEGRAM GROUP ALERTS
        ============================================ */}
        {activeTab === 'telegram' && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            <div className="bg-[#FBF9F5] p-6 rounded-3xl border border-[#DFD6C7] shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-[#EFEAE1] pb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#29b6f6]/10 flex items-center justify-center text-[#29b6f6]">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-xl text-[#2D4030]">Notifications Telegram en Temps Réel</h2>
                  <p className="text-xs text-gray-600">Recevez chaque nouvelle commande instantanément dans votre groupe Telegram avec sonnerie et lien WhatsApp direct.</p>
                </div>
              </div>

              {/* Step by step guide */}
              <div className="bg-white p-5 rounded-2xl border border-[#DFD6C7] space-y-3 text-xs">
                <p className="font-bold text-sm text-[#2D4030] flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#A26D62]" /> Comment créer votre Bot & Groupe Telegram (1 minute) :
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed">
                  <li>
                    Ouvrez Telegram et cherchez le bot officiel <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">@BotFather</a>.
                  </li>
                  <li>
                    Envoyez <code>/newbot</code>, donnez un nom à votre bot (ex: <i>Lyxene Notif Bot</i>), puis copiez le <strong>Token HTTP API</strong> généré.
                  </li>
                  <li>
                    Créez un <strong>Groupe Telegram</strong> (ex: <i>Commandes Lyxene</i>) et <strong>ajoutez votre nouveau bot comme Administrateur</strong> du groupe.
                  </li>
                  <li>
                    Pour obtenir le <strong>Chat ID</strong> du groupe : ajoutez temporairement le bot <a href="https://t.me/RawDataBot" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">@RawDataBot</a> dans votre groupe, il vous affichera l'ID (ex: <code>-1001234567890</code>).
                  </li>
                </ol>
              </div>

              {/* Form settings */}
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    1. Token du Bot Telegram (obtenu via @BotFather) *
                  </label>
                  <input
                    type="text"
                    value={telegramToken}
                    onChange={(e) => setTelegramToken(e.target.value)}
                    placeholder="Ex: 7123456789:AAHqXXXXXXXXXXXXX..."
                    className="w-full p-3 rounded-xl border border-[#DFD6C7] bg-white font-mono text-xs focus:outline-none focus:border-[#2D4030]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    2. Chat ID du Groupe ou Canal Telegram *
                  </label>
                  <input
                    type="text"
                    value={telegramChatId}
                    onChange={(e) => setTelegramChatId(e.target.value)}
                    placeholder="Ex: -1001234567890 ou votre ID perso"
                    className="w-full p-3 rounded-xl border border-[#DFD6C7] bg-white font-mono text-xs focus:outline-none focus:border-[#2D4030]"
                  />
                </div>

                {/* Test status banner */}
                {telegramTestSuccess && (
                  <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-600" />
                    <span>{telegramTestSuccess}</span>
                  </div>
                )}

                {telegramTestError && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                    <span>{telegramTestError}</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleSaveTelegram}
                    className="flex-1 bg-[#2D4030] hover:bg-[#202E23] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer transition"
                  >
                    <Save className="w-4 h-4" />
                    Enregistrer les Paramètres
                  </button>

                  <button
                    onClick={handleTestTelegram}
                    disabled={telegramTesting || !telegramToken || !telegramChatId}
                    className="bg-[#29b6f6] hover:bg-[#0288d1] disabled:bg-gray-300 text-white py-3 px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer transition"
                  >
                    <Send className={`w-4 h-4 ${telegramTesting ? 'animate-bounce' : ''}`} />
                    {telegramTesting ? 'Envoi...' : '🔔 Tester la Notification'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
