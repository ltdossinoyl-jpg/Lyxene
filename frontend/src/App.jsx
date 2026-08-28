import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  Leaf, 
  CreditCard, 
  Lock, 
  Star,
  Menu,
  X,
  Truck,
  CheckCircle,
  User,
  Phone,
  MapPin,
  FileText,
  Package,
  ArrowLeft,
  Settings
} from 'lucide-react';
import AdminDashboard from './AdminDashboard.jsx';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://lyxene.onrender.com';
const WHATSAPP_NUMBER = '212600000000'; // Update with your real number

const translations = {
  fr: {
    brand: "LYXENE PARIS",
    tagline: "Révélez l'éclat naturel de votre peau",
    heroTitle: "La Routine Anti-Acné Experte & Naturelle",
    heroSubtitle: "Formulée à base d'Aloe Vera pur et d'Acide Salicylique pour purifier, apaiser et transformer votre grain de peau durablement.",
    shopNow: "Commander Maintenant",
    discoverProducts: "Découvrir la Gamme",
    bundleOffer: "Pack Complet 4-en-1 (Best-Seller)",
    saveBadge: "Économisez 25%",
    pricePack: "490 DH",
    oldPricePack: "650 DH",
    featuresTitle: "Pourquoi Choisir LYXENE ?",
    feat1Title: "Formule Clinique & Douce",
    feat1Desc: "Enrichie en Acide Salicylique pour déboucher les pores sans agresser la barrière cutanée.",
    feat2Title: "Aloe Vera Bio Purifiant",
    feat2Desc: "Hydrate intensément et calme instantanément les rougeurs et inflammations.",
    feat3Title: "Résultats Visibles dès 14 Jours",
    feat3Desc: "94% de nos utilisatrices constatent une réduction nette des boutons et points noirs.",
    catalogTitle: "Nos 4 Essentiels Anti-Imperfections",
    addToCart: "Ajouter au Panier",
    buyNow: "Commander",
    blogTitle: "Conseils & Rituels Skincare",
    orderTitle: "Passer la Commande",
    orderSummary: "Récapitulatif de Commande",
    codLabel: "Paiement à la Livraison (COD)",
    codDesc: "Payez en espèces à la réception de votre colis",
    fullName: "Nom Complet",
    phoneNumber: "Numéro de Téléphone",
    city: "Ville",
    address: "Adresse Complète",
    notes: "Notes (Optionnel)",
    notesPlaceholder: "Ex: Près de la mosquée, 2ème étage...",
    confirmOrder: "Confirmer la Commande",
    freeShipping: "Livraison Gratuite 🚚",
    thankYouTitle: "Merci pour votre commande ! 🎉",
    thankYouSubtitle: "Votre commande a été enregistrée avec succès.",
    thankYouOrderId: "Numéro de commande",
    thankYouMessage: "Notre équipe va vous contacter sous 24h pour confirmer la livraison.",
    whatsappContact: "Contactez-nous sur WhatsApp",
    whatsappQuestion: "Une question ? Écrivez-nous",
    continueShopping: "Retour à la Boutique",
    navHome: "Accueil",
    navShop: "Boutique",
    navRoutine: "La Routine",
    navBlog: "Conseils",
    navContact: "Contact",
    remove: "Supprimer",
    total: "Total",
    sending: "Envoi en cours..."
  },
  ar: {
    brand: "LYXENE PARIS",
    tagline: "أظهري الإشراقة الطبيعية لبشرتك",
    heroTitle: "المجموعة الطبية المتكاملة لعلاج حب الشباب",
    heroSubtitle: "تركيبة فريدة بخلاصة الألوفيرا النقية وحمض الساليسيليك لتنقية البشرة، تهدئة الاحمرار واستعادة نضارتها.",
    shopNow: "اطلبي الآن",
    discoverProducts: "اكتشفي المنتجات",
    bundleOffer: "المجموعة الكاملة 4 في 1 (الأكثر مبيعاً)",
    saveBadge: "خصم 25%",
    pricePack: "490 درهم",
    oldPricePack: "650 درهم",
    featuresTitle: "لماذا تختارين LYXENE ؟",
    feat1Title: "تركيبة طبية لطيفة",
    feat1Desc: "بحمض الساليسيليك الفعّال في تنظيف المسام بعمق دون تجفيف البشرة.",
    feat2Title: "ألوفيرا طبيعية مهدئة",
    feat2Desc: "ترطيب فائق وتهدئة فورية للاحمرار والالتهابات الناتجة عن البثور.",
    feat3Title: "نتائج مثبتة في 14 يوماً",
    feat3Desc: "94% من الفتيات لاحظوا اختفاء الحبوب وتوحيد لون البشرة.",
    catalogTitle: "منتجاتنا الأربعة المتخصصة",
    addToCart: "أضف إلى السلة",
    buyNow: "اطلب الآن",
    blogTitle: "نصائح وروتين العناية بالبشرة",
    orderTitle: "إتمام الطلب",
    orderSummary: "ملخص الطلب",
    codLabel: "الدفع عند الاستلام",
    codDesc: "ادفعي نقداً عند استلام الطرد",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    city: "المدينة",
    address: "العنوان الكامل",
    notes: "ملاحظات (اختياري)",
    notesPlaceholder: "مثال: قرب المسجد، الطابق الثاني...",
    confirmOrder: "تأكيد الطلب",
    freeShipping: "توصيل مجاني 🚚",
    thankYouTitle: "شكراً على طلبك! 🎉",
    thankYouSubtitle: "تم تسجيل طلبك بنجاح.",
    thankYouOrderId: "رقم الطلب",
    thankYouMessage: "فريقنا سيتواصل معك خلال 24 ساعة لتأكيد التوصيل.",
    whatsappContact: "تواصلي معنا عبر واتساب",
    whatsappQuestion: "عندك سؤال؟ راسلينا",
    continueShopping: "العودة للمتجر",
    navHome: "الرئيسية",
    navShop: "المتجر",
    navRoutine: "الروتين",
    navBlog: "نصائح",
    navContact: "اتصل بنا",
    remove: "حذف",
    total: "المجموع",
    sending: "جاري الإرسال..."
  },
  en: {
    brand: "LYXENE PARIS",
    tagline: "Reveal Your Skin's Natural Radiance",
    heroTitle: "Expert Anti-Acne Botanical Skincare",
    heroSubtitle: "Powered by pure Aloe Vera and Salicylic Acid to purify, soothe, and visibly clear acne-prone skin.",
    shopNow: "Order Now",
    discoverProducts: "Explore Products",
    bundleOffer: "Complete 4-Piece Routine (Best Seller)",
    saveBadge: "Save 25%",
    pricePack: "$49 / 490 DH",
    oldPricePack: "$65 / 650 DH",
    featuresTitle: "Why Choose LYXENE ?",
    feat1Title: "Clinical Grade & Gentle",
    feat1Desc: "Salicylic acid unclogs deep pores without damaging your delicate skin moisture barrier.",
    feat2Title: "Soothing Aloe Vera",
    feat2Desc: "Delivers lightweight hydration while immediately calming redness and irritation.",
    feat3Title: "Visible Results in 14 Days",
    feat3Desc: "94% of users report clearer skin, fewer breakouts, and balanced oil production.",
    catalogTitle: "The 4 Skincare Essentials",
    addToCart: "Add to Cart",
    buyNow: "Order Now",
    blogTitle: "Skincare Journal & Tips",
    orderTitle: "Place Your Order",
    orderSummary: "Order Summary",
    codLabel: "Cash on Delivery (COD)",
    codDesc: "Pay cash when you receive your package",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    city: "City",
    address: "Full Address",
    notes: "Notes (Optional)",
    notesPlaceholder: "E.g.: Near the mosque, 2nd floor...",
    confirmOrder: "Confirm Order",
    freeShipping: "Free Shipping 🚚",
    thankYouTitle: "Thank You for Your Order! 🎉",
    thankYouSubtitle: "Your order has been successfully placed.",
    thankYouOrderId: "Order Number",
    thankYouMessage: "Our team will contact you within 24h to confirm delivery.",
    whatsappContact: "Contact Us on WhatsApp",
    whatsappQuestion: "Have a question? Message us",
    continueShopping: "Back to Shop",
    navHome: "Home",
    navShop: "Shop",
    navRoutine: "Routine",
    navBlog: "Journal",
    navContact: "Contact",
    remove: "Remove",
    total: "Total",
    sending: "Sending..."
  }
};

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Savon Liquide Anti-Acné (250 ml)",
    arName: "الصابون السائل المنظف والمطهر (250 مل)",
    enName: "Anti-Acne Liquid Cleanser (250 ml)",
    subtitle: "Nettoie en profondeur, élimine l'excès de sébum et prévient l'apparition de nouvelles imperfections. Enrichi en Aloe Vera & Acide Salicylique.",
    arSubtitle: "تنظيف عميق للمسام، إزالة الزيوت الزائدة ومنع ظهور الحبوب. بخلاصة الألوفيرا وحمض الساليسيليك.",
    enSubtitle: "Deep-cleanses pores, removes excess sebum and prevents new breakouts. Enriched with Aloe Vera & Salicylic Acid.",
    price: 149,
    priceLabel: "149 DH",
    tag: "Étape 1 : Nettoyage",
    badge: "Indispensable",
    image: "/images/savon-liquide.jpg"
  },
  {
    id: 2,
    name: "Sérum Visage Concentré Anti-Acné (50 ml)",
    arName: "سيروم الوجه المركز المضاد للحبوب (50 ml)",
    enName: "Concentrated Anti-Acne Face Serum (50 ml)",
    subtitle: "Formule concentrée à l'Acide Salicylique qui pénètre en profondeur pour resserrer les pores, réduire les rougeurs et accélérer la cicatrisation.",
    arSubtitle: "تركيبة مركزة بحمض الساليسيليك تتغلغل بعمق لتضييق المسام وتقليل الاحمرار وتسريع التئام البشرة.",
    enSubtitle: "Concentrated Salicylic Acid formula that penetrates deep to tighten pores, reduce redness and accelerate skin healing.",
    price: 189,
    priceLabel: "189 DH",
    tag: "Étape 2 : Traitement Ciblé",
    badge: "Best Seller",
    image: "/images/serum-visage.jpg"
  },
  {
    id: 3,
    name: "Crème Visage Anti-Acné (50 ml)",
    arName: "كريم الوجه المهدئ والمرطب (50 ml)",
    enName: "Anti-Acne Face Cream (50 ml)",
    subtitle: "Hydrate sans effet gras, apaise les irritations et rééquilibre la production de sébum. Texture légère qui fond instantanément dans la peau.",
    arSubtitle: "ترطيب بدون لمعان، تهدئة الالتهابات وإعادة توازن إفراز الدهون. ملمس خفيف يمتص فوراً.",
    enSubtitle: "Oil-free moisture, soothes irritation and rebalances sebum production. Lightweight texture that melts instantly into skin.",
    price: 169,
    priceLabel: "169 DH",
    tag: "Étape 3 : Hydratation",
    badge: "Texture Légère",
    image: "/images/creme-visage.jpg"
  },
  {
    id: 4,
    name: "Soin Localisé Anti-Boutons",
    arName: "كريم موضعي سريع المفعول لعلاج البثور",
    enName: "Targeted Spot Treatment Cream",
    subtitle: "Soin SOS express : appliquez directement sur le bouton pour le réduire en quelques heures. Action ciblée anti-inflammatoire et antibactérienne.",
    arSubtitle: "علاج طوارئ سريع: ضعيه مباشرة على الحبة لتقليصها في ساعات. مضاد للالتهاب والبكتيريا.",
    enSubtitle: "SOS express care: apply directly on the spot to reduce it in hours. Targeted anti-inflammatory and antibacterial action.",
    price: 129,
    priceLabel: "129 DH",
    tag: "Étape 4 : Urgence Boutons",
    badge: "Action Rapide",
    image: "/images/creme-tube.jpg"
  }
];

export default function App() {
  const [lang, setLang] = useState('fr');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [orderOpen, setOrderOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [page, setPage] = useState('shop'); // 'shop' | 'thankyou' | 'admin'
  const [orderId, setOrderId] = useState('');
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Form fields
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    notes: ''
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      }
    } catch (e) {
      console.log('Using default products fallback');
    }
  };

  useEffect(() => {
    fetchProducts();
    
    // Check URL hash for admin route
    if (window.location.hash === '#admin') {
      setPage('admin');
    }

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setPage('admin');
      } else if (page === 'admin') {
        setPage('shop');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const t = translations[lang];
  const isRTL = lang === 'ar';
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setFormError('');
  };

  const handleSubmitOrder = async () => {
    // Validation
    if (!form.fullName.trim() || !form.phone.trim() || !form.city.trim() || !form.address.trim()) {
      setFormError(isRTL ? 'المرجو ملء جميع الحقول المطلوبة' : 'Merci de remplir tous les champs obligatoires.');
      return;
    }

    if (cart.length === 0) {
      setFormError(isRTL ? 'السلة فارغة' : 'Votre panier est vide.');
      return;
    }

    setSending(true);
    setFormError('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          city: form.city,
          address: form.address,
          notes: form.notes,
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price
          })),
          total: totalPrice
        })
      });

      const data = await response.json();

      if (data.success) {
        setOrderId(data.orderId);
        setPage('thankyou');
        setOrderOpen(false);
        setCart([]);
        setForm({ fullName: '', phone: '', city: '', address: '', notes: '' });
        window.scrollTo(0, 0);
      } else {
        setFormError(data.error || 'Erreur. Réessayez.');
      }
    } catch (err) {
      setFormError(isRTL ? 'خطأ في الاتصال. حاولي مرة أخرى.' : 'Erreur de connexion. Réessayez.');
    } finally {
      setSending(false);
    }
  };

  const whatsappOrderUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Salam, ana ${form.fullName || '...'}, commande ${orderId}. Bghit nta9ed la livraison.`
  )}`;

  // ============================================
  //  ADMIN DASHBOARD VIEW
  // ============================================
  if (page === 'admin') {
    return (
      <AdminDashboard 
        backendUrl={BACKEND_URL}
        onBackToShop={() => {
          window.location.hash = '';
          setPage('shop');
        }}
        onProductsUpdated={fetchProducts}
      />
    );
  }

  // ============================================
  //  THANK YOU PAGE
  // ============================================
  if (page === 'thankyou') {
    return (
      <div className={`min-h-screen bg-[#FBF9F5] text-[#1E2922] font-sans antialiased ${isRTL ? 'rtl text-right' : 'ltr text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        
        {/* Top Bar */}
        <div className="bg-[#2D4030] text-[#F7F4EE] text-xs py-2 px-4 text-center font-medium tracking-wide">
          ✨ LYXENE PARIS — Botanical Skincare
        </div>

        {/* Thank You Content */}
        <div className="max-w-lg mx-auto px-6 py-20 text-center">
          
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-[#2D4030] to-[#405844] rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2D4030] mb-4">
            {t.thankYouTitle}
          </h1>
          
          <p className="text-gray-600 text-base mb-6">
            {t.thankYouSubtitle}
          </p>

          {/* Order ID */}
          <div className="bg-[#F2EDE4] rounded-2xl p-5 mb-6 border border-[#E5DEC8]">
            <p className="text-xs text-[#A26D62] font-semibold uppercase tracking-wider mb-1">
              {t.thankYouOrderId}
            </p>
            <p className="text-2xl font-bold text-[#2D4030] font-mono tracking-wider">
              {orderId}
            </p>
          </div>

          {/* Message */}
          <div className="bg-white rounded-2xl p-5 mb-8 border border-[#E8E1D5]">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Truck className="w-5 h-5 text-[#2D4030]" />
              <span className="text-sm font-semibold text-[#2D4030]">{t.codLabel}</span>
            </div>
            <p className="text-sm text-gray-600">
              {t.thankYouMessage}
            </p>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={whatsappOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1fba59] text-white py-4 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            {t.whatsappContact}
          </a>

          <p className="text-xs text-gray-500 mb-8">{t.whatsappQuestion}</p>

          {/* Back to shop */}
          <button
            onClick={() => { setPage('shop'); setOrderId(''); }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D4030] hover:text-[#A26D62] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.continueShopping}
          </button>
        </div>

        {/* Footer */}
        <footer className="bg-[#2D4030] text-[#F7F4EE] py-8 px-6">
          <div className="max-w-6xl mx-auto text-center text-xs text-gray-300">
            <span className="font-serif font-bold text-lg text-white block mb-1">LYXENE PARIS</span>
            <p>© 2026 — Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    );
  }

  // ============================================
  //  MAIN SHOP PAGE
  // ============================================
  return (
    <div className={`min-h-screen bg-[#FBF9F5] text-[#1E2922] font-sans antialiased ${isRTL ? 'rtl text-right' : 'ltr text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#2D4030] text-[#F7F4EE] text-xs py-2 px-4 text-center font-medium tracking-wide flex justify-center items-center gap-4">
        <span>✨ {isRTL ? "توصيل سريع مجاني لجميع مدن المغرب ابتداءً من 300 درهم" : "Livraison Gratuite partout au Maroc dès 300 DH"}</span>
        <div className="flex gap-2 items-center border-l border-[#405844] pl-3">
          <button onClick={() => setLang('fr')} className={`hover:underline ${lang === 'fr' ? 'font-bold underline' : ''}`}>FR</button>
          <span>•</span>
          <button onClick={() => setLang('ar')} className={`hover:underline ${lang === 'ar' ? 'font-bold underline' : ''}`}>عربي</button>
          <span>•</span>
          <button onClick={() => setLang('en')} className={`hover:underline ${lang === 'en' ? 'font-bold underline' : ''}`}>EN</button>
        </div>
      </div>

      {/* 2. Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8E1D5]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/images/logo.png" 
              alt="LYXENE PARIS Logo" 
              className="w-11 h-11 object-contain rounded-full shadow-sm"
            />
            <div>
              <span className="text-xl font-bold tracking-widest text-[#2D4030] block font-serif">LYXENE</span>
              <span className="text-[10px] tracking-wider text-[#A26D62] uppercase block font-semibold">Botanical Skincare</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2D4030]">
            <a href="#hero" className="hover:text-[#A26D62] transition">{t.navHome}</a>
            <a href="#products" className="hover:text-[#A26D62] transition">{t.navShop}</a>
            <a href="#routine" className="hover:text-[#A26D62] transition">{t.navRoutine}</a>
            <a href="#blog" className="hover:text-[#A26D62] transition">{t.navBlog}</a>
            <a href="#contact" className="hover:text-[#A26D62] transition">{t.navContact}</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setOrderOpen(true)}
              className="relative p-2.5 rounded-full bg-[#EFEAE1] hover:bg-[#E3DCD0] text-[#2D4030] transition"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2D4030] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => {
                if (cart.length === 0) setCart([...products]);
                setOrderOpen(true);
              }}
              className="hidden sm:inline-flex items-center gap-2 bg-[#2D4030] text-[#F7F4EE] px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#202E23] transition shadow-sm"
            >
              <Package className="w-4 h-4" />
              {t.shopNow}
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section id="hero" className="relative pt-12 pb-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE4DE] text-[#A26D62] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRTL ? "تركيبة طبيعية 100% بدون بارابين" : "Formule Naturelle • Aloe Vera & Acide Salicylique"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D4030] leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-lg">
            {t.heroSubtitle}
          </p>

          <div className="p-4 bg-[#F2EDE4] rounded-2xl border border-[#E5DEC8] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#A26D62] font-semibold block">{t.bundleOffer}</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold text-[#2D4030]">{t.pricePack}</span>
                <span className="text-sm line-through text-gray-400">{t.oldPricePack}</span>
                <span className="text-xs bg-[#2D4030] text-[#F7F4EE] px-2 py-0.5 rounded-md font-bold">{t.saveBadge}</span>
              </div>
            </div>
            <button 
              onClick={() => {
                setCart([...products]);
                setOrderOpen(true);
              }}
              className="bg-[#2D4030] hover:bg-[#202E23] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow"
            >
              {t.buyNow}
            </button>
          </div>

          <div className="flex items-center gap-6 pt-2 text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#2D4030]" />
              <span>{t.freeShipping}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-[#2D4030]" />
              <span>{isRTL ? "مكونات طبيعية" : "Cruelty Free & Bio"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2D4030]" />
              <span>{isRTL ? "مختبر طبياً" : "Testé Dermatologiquement"}</span>
            </div>
          </div>
        </div>

        {/* Hero Product Visual Card with Real Image */}
        <div className="relative group">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#DFD6C7] bg-[#EFEAE1]">
            <img 
              src="/images/hero-products.jpg" 
              alt="Gamme Complète LYXENE Skincare" 
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
              <span className="bg-[#2D4030]/90 backdrop-blur-sm text-white text-[11px] px-3 py-1 rounded-full font-semibold shadow">
                {isRTL ? "المجموعة المتكاملة" : "Gamme Complète 4-en-1"}
              </span>
              <div className="flex text-amber-400 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#E3DCD0] flex items-center justify-between shadow-lg">
              <div>
                <p className="text-[11px] text-gray-500">{isRTL ? "نتيجة مثبتة بعد 14 يوم" : "Avis client vérifié"}</p>
                <p className="text-xs font-bold text-[#2D4030]">"Bouti diali safat w l'rougeur mcha f 10 iyam!"</p>
              </div>
              <span className="text-xs font-bold text-[#A26D62]">- Salma M.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Product Catalog (4 Products with Real Photos) */}
      <section id="products" className="py-20 bg-[#F4EFE6] border-y border-[#E8E1D5] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-3xl font-serif font-bold text-[#2D4030]">{t.catalogTitle}</h2>
            <div className="w-12 h-0.5 bg-[#A26D62] mx-auto mt-3 mb-3"></div>
            <p className="text-xs text-gray-600">
              {isRTL ? "تركيبة طبية مهدئة للبشرة الدهنية والمعرضة لحب الشباب" : "Formule douce pour peaux grasses, mixtes et à tendance acnéique."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-[#FBF9F5] rounded-2xl p-5 border border-[#E5DEC8] flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-[#A26D62] uppercase tracking-wider">{p.tag}</span>
                    <span className="text-[10px] bg-[#EFEAE1] text-[#2D4030] font-semibold px-2 py-0.5 rounded-full">{p.badge}</span>
                  </div>
                  
                  {/* Real Product Image */}
                  <div className="overflow-hidden rounded-xl mb-4 bg-white border border-[#EFEAE1] aspect-square flex items-center justify-center">
                    <img 
                      src={p.image} 
                      alt={isRTL ? p.arName : (lang === 'en' ? p.enName : p.name)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="font-bold text-sm text-[#2D4030]">
                    {isRTL ? p.arName : (lang === 'en' ? p.enName : p.name)}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                    {isRTL ? p.arSubtitle : (lang === 'en' ? p.enSubtitle : p.subtitle)}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#EFEAE1] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-base text-[#2D4030]">{p.priceLabel}</span>
                    <span className="block text-[10px] text-green-700 font-medium">{t.freeShipping}</span>
                  </div>
                  <button 
                    onClick={() => {
                      if (!cart.find(item => item.id === p.id)) {
                        setCart([...cart, p]);
                      }
                      setOrderOpen(true);
                    }}
                    className="bg-[#2D4030] hover:bg-[#202E23] text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition shadow-sm"
                  >
                    {t.addToCart}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COD Order Drawer */}
      {orderOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#FBF9F5] h-full shadow-2xl p-6 flex flex-col overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5] mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#2D4030]" />
                <h3 className="font-serif font-bold text-lg text-[#2D4030]">{t.orderTitle}</h3>
              </div>
              <button onClick={() => setOrderOpen(false)} className="p-1 text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="mb-4">
              <p className="text-xs font-bold text-[#A26D62] uppercase tracking-wider mb-3">{t.orderSummary}</p>
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  {isRTL ? "السلة فارغة" : "Votre panier est vide"}
                </div>
              ) : (
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs bg-[#F2EDE4] p-3 rounded-xl gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-10 h-10 rounded-lg object-cover bg-white border border-[#E5DEC8]"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-[#2D4030]">{isRTL ? item.arName : item.name}</p>
                        <p className="text-gray-500 text-[11px]">{item.priceLabel}</p>
                      </div>
                      <button 
                        onClick={() => setCart(cart.filter(i => i.id !== item.id))}
                        className="text-red-500 text-[11px] hover:underline"
                      >
                        {t.remove}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* COD Badge */}
            <div className="flex items-center gap-3 p-3 bg-[#E8F5E9] rounded-xl border border-[#C8E6C9] mb-4">
              <Truck className="w-5 h-5 text-[#2D4030] flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#2D4030]">{t.codLabel}</p>
                <p className="text-[11px] text-gray-600">{t.codDesc}</p>
              </div>
            </div>

            {/* Order Form */}
            {cart.length > 0 && (
              <div className="space-y-3 flex-1">
                
                {/* Full Name */}
                <div>
                  <label className="text-[11px] text-gray-500 flex items-center gap-1 mb-1">
                    <User className="w-3 h-3" /> {t.fullName} *
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateForm('fullName', e.target.value)}
                    placeholder={isRTL ? "الاسم الكامل" : "Ex: Fatima Zahra"}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#E8E1D5] bg-white focus:outline-none focus:border-[#2D4030] focus:ring-1 focus:ring-[#2D4030]/20 transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-[11px] text-gray-500 flex items-center gap-1 mb-1">
                    <Phone className="w-3 h-3" /> {t.phoneNumber} *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateForm('phone', e.target.value)}
                    placeholder="06XXXXXXXX"
                    className="w-full text-xs p-2.5 rounded-lg border border-[#E8E1D5] bg-white focus:outline-none focus:border-[#2D4030] focus:ring-1 focus:ring-[#2D4030]/20 transition"
                    dir="ltr"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="text-[11px] text-gray-500 flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3" /> {t.city} *
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => updateForm('city', e.target.value)}
                    placeholder={isRTL ? "المدينة" : "Ex: Casablanca"}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#E8E1D5] bg-white focus:outline-none focus:border-[#2D4030] focus:ring-1 focus:ring-[#2D4030]/20 transition"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="text-[11px] text-gray-500 flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3" /> {t.address} *
                  </label>
                  <textarea
                    value={form.address}
                    onChange={(e) => updateForm('address', e.target.value)}
                    placeholder={isRTL ? "العنوان الكامل" : "Ex: Hay Mohammadi, Rue 12, N°5"}
                    rows={2}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#E8E1D5] bg-white focus:outline-none focus:border-[#2D4030] focus:ring-1 focus:ring-[#2D4030]/20 transition resize-none"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="text-[11px] text-gray-500 flex items-center gap-1 mb-1">
                    <FileText className="w-3 h-3" /> {t.notes}
                  </label>
                  <input
                    type="text"
                    value={form.notes}
                    onChange={(e) => updateForm('notes', e.target.value)}
                    placeholder={t.notesPlaceholder}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#E8E1D5] bg-white focus:outline-none focus:border-[#2D4030] focus:ring-1 focus:ring-[#2D4030]/20 transition"
                  />
                </div>

                {/* Error Message */}
                {formError && (
                  <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                    {formError}
                  </div>
                )}
              </div>
            )}

            {/* Footer / Submit */}
            {cart.length > 0 && (
              <div className="pt-4 mt-4 border-t border-[#E8E1D5]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-gray-600">{t.total}:</span>
                  <span className="text-xl font-bold text-[#2D4030]">{totalPrice} DH</span>
                </div>
                <button 
                  onClick={handleSubmitOrder}
                  disabled={sending}
                  className="w-full bg-[#2D4030] hover:bg-[#202E23] disabled:bg-[#2D4030]/60 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t.sending}
                    </>
                  ) : (
                    <>
                      <Truck className="w-4 h-4" />
                      {t.confirmOrder} — {totalPrice} DH
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-gray-400 mt-2">{t.freeShipping}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Salam,%20bghit%20nswel%203la%20gamme%20Lyxene%20anti-acné`}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition flex items-center gap-2 group"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold">
          WhatsApp Support
        </span>
      </a>

      {/* 7. Footer */}
      <footer className="bg-[#2D4030] text-[#F7F4EE] py-12 px-6 border-t border-[#405844]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-300">
          <div className="flex items-center gap-3">
            <img 
              src="/images/logo.png" 
              alt="LYXENE PARIS Logo" 
              className="w-10 h-10 object-contain rounded-full bg-white/10 p-0.5 border border-[#405844]"
            />
            <div>
              <span className="font-serif font-bold text-lg text-white block">LYXENE PARIS</span>
              <p className="mt-0.5 text-gray-400">© 2026 — Tous droits réservés.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="hover:underline">Conditions Générales</a>
            <a href="#" className="hover:underline">Politique de Confidentialité</a>
            <a href="#" className="hover:underline">Contactez-nous</a>
            <button 
              onClick={() => {
                window.location.hash = '#admin';
                setPage('admin');
              }} 
              className="text-[11px] bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg transition font-semibold flex items-center gap-1.5 cursor-pointer border border-[#405844]"
            >
              <Settings className="w-3.5 h-3.5" />
              Admin Dashboard
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

