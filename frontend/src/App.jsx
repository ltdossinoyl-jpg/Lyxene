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
  Settings,
  Sun,
  Moon,
  Clock,
  Droplets,
  Heart,
  HelpCircle,
  Mail,
  Send,
  Check
} from 'lucide-react';
import AdminDashboard from './AdminDashboard.jsx';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://lyxene.onrender.com';
const WHATSAPP_NUMBER = '212600000000'; // Update with your real number

const translations = {
  fr: {
    brand: "LYXENESKIN PARIS",
    tagline: "Révélez l'éclat naturel de votre peau",
    heroTitle: "La Routine Anti-Acné Experte & Naturelle",
    heroSubtitle: "Formulée à base d'Aloe Vera pur et d'Acide Salicylique pour purifier, apaiser et transformer votre grain de peau durablement.",
    shopNow: "Commander Maintenant",
    discoverProducts: "Découvrir la Gamme",
    bundleOffer: "Pack Complet 3-en-1 (Best-Seller)",
    saveBadge: "Économisez 55%",
    pricePack: "289 DH",
    oldPricePack: "489 DH",
    featuresTitle: "Pourquoi Choisir LYXENESKIN ?",
    feat1Title: "Formule Clinique & Douce",
    feat1Desc: "Enrichie en Acide Salicylique pour déboucher les pores sans agresser la barrière cutanée.",
    feat2Title: "Aloe Vera Bio Purifiant",
    feat2Desc: "Hydrate intensément et calme instantanément les rougeurs et inflammations.",
    feat3Title: "Résultats Visibles dès 14 Jours",
    feat3Desc: "94% de nos utilisatrices constatent une réduction nette des boutons et points noirs.",
    catalogTitle: "Nos 3 Essentiels Éclat & Anti-Imperfections",
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
    brand: "LYXENESKIN PARIS",
    tagline: "أظهري الإشراقة الطبيعية لبشرتك",
    heroTitle: "المجموعة الطبية المتكاملة لعلاج حب الشباب",
    heroSubtitle: "تركيبة فريدة بخلاصة الألوفيرا النقية وحمض الساليسيليك لتنقية البشرة، تهدئة الاحمرار واستعادة نضارتها.",
    shopNow: "اطلبي الآن",
    discoverProducts: "اكتشفي المنتجات",
    bundleOffer: "المجموعة الكاملة 3 في 1 (الأكثر مبيعاً)",
    saveBadge: "خصم 55%",
    pricePack: "289 درهم",
    oldPricePack: "489 درهم",
    featuresTitle: "لماذا تختارين LYXENESKIN ؟",
    feat1Title: "تركيبة طبية لطيفة",
    feat1Desc: "بحمض الساليسيليك الفعّال في تنظيف المسام بعمق دون تجفيف البشرة.",
    feat2Title: "ألوفيرا طبيعية مهدئة",
    feat2Desc: "ترطيب فائق وتهدئة فورية للاحمرار والالتهابات الناتجة عن البثور.",
    feat3Title: "نتائج مثبتة في 14 يوماً",
    feat3Desc: "94% من الفتيات لاحظوا اختفاء الحبوب وتوحيد لون البشرة.",
    catalogTitle: "منتجاتنا الثلاثة المتخصصة",
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
    brand: "LYXENESKIN PARIS",
    tagline: "Reveal Your Skin's Natural Radiance",
    heroTitle: "Expert Anti-Acne Botanical Skincare",
    heroSubtitle: "Powered by pure Aloe Vera and Salicylic Acid to purify, soothe, and visibly clear acne-prone skin.",
    shopNow: "Order Now",
    discoverProducts: "Explore Products",
    bundleOffer: "Complete 3-Piece Routine (Best Seller)",
    saveBadge: "Save 55%",
    pricePack: "289 DH",
    oldPricePack: "489 DH",
    featuresTitle: "Why Choose LYXENESKIN ?",
    feat1Title: "Clinical Grade & Gentle",
    feat1Desc: "Salicylic acid unclogs deep pores without damaging your delicate skin moisture barrier.",
    feat2Title: "Soothing Aloe Vera",
    feat2Desc: "Delivers lightweight hydration while immediately calming redness and irritation.",
    feat3Title: "Visible Results in 14 Days",
    feat3Desc: "94% of users report clearer skin, fewer breakouts, and balanced oil production.",
    catalogTitle: "The 3 Skincare Essentials",
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
    name: "Gel Nettoyant Lyxene Pro (200 ml)",
    arName: "جل منظف للبشرة بالأرز والنياسيناميد (200 مل)",
    enName: "Lyxene Pro Cleansing Gel (200 ml)",
    subtitle: "Au riz, à la niacinamide et à l'acide salicylique. Nettoie en profondeur, élimine l'excès de sébum et affine le grain de peau.",
    arSubtitle: "بخلاصة الأرز، النياسيناميد وحمض الساليسيليك. تنظيف عميق للمسام، إزالة الزيوت الزائدة وتفتيح البشرة.",
    enSubtitle: "With rice extract, niacinamide and salicylic acid. Deep-cleanses pores, controls sebum and smooths skin texture.",
    price: 149,
    priceLabel: "149 DH",
    tag: "Étape 1 : Nettoyage",
    badge: "Indispensable",
    image: "/images/gel-nettoyant.jpg"
  },
  {
    id: 2,
    name: "Sérum Éclaircissant Anti-Taches (50 ml)",
    arName: "سيروم مفتح للبشرة بالنياسيناميد والألفا أربوتين (50 مل)",
    enName: "Brightening Face Serum (50 ml)",
    subtitle: "À la niacinamide et à l'alpha arbutine. Unifie le teint, estompe les taches d'acné et resserre visiblement les pores.",
    arSubtitle: "بتركيبة النياسيناميد والألفا أربوتين لتفتيح التصبغات، إزالة آثار الحبوب وتوحيد لون البشرة.",
    enSubtitle: "Formulated with niacinamide and alpha arbutin. Fades dark spots, corrects acne marks and refines pores.",
    price: 189,
    priceLabel: "189 DH",
    tag: "Étape 2 : Éclat & Anti-Taches",
    badge: "Best Seller",
    image: "/images/serum-eclaircissant.jpg"
  },
  {
    id: 3,
    name: "Crème Éclaircissante & Hydratante Lyxene Pro (50 ml)",
    arName: "كريم مبيض ومرطب بالكولاجين وحمض الهيالورونيك (50 مل)",
    enName: "Brightening & Moisturizing Cream (50 ml)",
    subtitle: "Au collagène et à l'acide hyaluronique. Hydrate intensément, illumine le teint et raffermit la peau sans effet gras.",
    arSubtitle: "بالكولاجين وحمض الهيالورونيك. ترطيب عميق، تفتيح نضارة البشرة وتغذيتها دون لمعان دهني.",
    enSubtitle: "Enriched with collagen and hyaluronic acid. Deep hydration, boosts radiance and firms the skin barrier.",
    price: 169,
    priceLabel: "169 DH",
    tag: "Étape 3 : Hydratation & Éclat",
    badge: "Formule Riche",
    image: "/images/creme-eclaircissante.jpg"
  }
];

const PACK_PRODUCT = {
  id: 99,
  name: "Pack Complet Éclat & Anti-Imperfections 3-en-1",
  arName: "المجموعة الكاملة للنضارة وتصفية البشرة 3 في 1",
  enName: "Complete Radiance & Anti-Acne 3-in-1 Pack",
  subtitle: "La routine complète : Gel Nettoyant (200ml) + Sérum Éclaircissant (50ml) + Crème Éclaircissante (50ml). Tout ce qu'il faut pour un teint unifié, net et éclatant.",
  arSubtitle: "الروتين الكامل: جل منظف (200 مل) + سيروم مفتح (50 مل) + كريم مبيض ومرطب (50 مل). كل ما تحتاجينه لبشرة صافية ومشرقة.",
  enSubtitle: "The complete routine: Cleansing Gel (200ml) + Brightening Serum (50ml) + Radiant Cream (50ml). Everything you need for clear, glowing skin.",
  price: 289,
  priceLabel: "289 DH",
  tag: "Pack Complet",
  badge: "Offre Spéciale",
  image: "/images/pack-complet.jpg",
  isPack: true
};

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

  // Helper: add the pack to cart and open order drawer
  const orderPack = () => {
    setCart([PACK_PRODUCT]);
    setOrderOpen(true);
  };

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
          ✨ LYXENESKIN PARIS — Botanical Skincare
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
            <span className="font-serif font-bold text-lg text-white block mb-1">LYXENESKIN PARIS</span>
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
              alt="LYXENESKIN PARIS Logo"
              className="w-11 h-11 object-contain rounded-full shadow-sm"
            />
            <div>
              <span className="text-xl font-bold tracking-widest text-[#2D4030] block font-serif">LYXENESKIN</span>
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
                if (cart.length === 0) orderPack();
                else setOrderOpen(true);
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
              onClick={orderPack}
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
              alt="Pack Complet LYXENESKIN Skincare"
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
              <span className="bg-[#2D4030]/90 backdrop-blur-sm text-white text-[11px] px-3 py-1 rounded-full font-semibold shadow">
                {isRTL ? "المجموعة المتكاملة" : "Gamme Complète 3-en-1"}
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter(p => !p.isPack).map((p) => (
              <div key={p.id} className="bg-[#FBF9F5] rounded-2xl p-6 border border-[#E5DEC8] flex flex-col hover:shadow-xl transition-all duration-300 group">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-[#A26D62] uppercase tracking-wider">{p.tag}</span>
                    <span className="text-[10px] bg-[#EFEAE1] text-[#2D4030] font-semibold px-2 py-0.5 rounded-full">{p.badge}</span>
                  </div>

                  {/* Real Product Image */}
                  <div className="overflow-hidden rounded-xl mb-4 bg-white border border-[#EFEAE1] aspect-square flex items-center justify-center p-3">
                    <img
                      src={p.image}
                      alt={isRTL ? p.arName : (lang === 'en' ? p.enName : p.name)}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="font-bold text-sm text-[#2D4030]">
                    {isRTL ? p.arName : (lang === 'en' ? p.enName : p.name)}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                    {isRTL ? p.arSubtitle : (lang === 'en' ? p.enSubtitle : p.subtitle)}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#EFEAE1] flex items-center justify-center">
                  <span className="text-[10px] text-[#2D4030] font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    {isRTL ? "متضمّن في المجموعة" : (lang === 'en' ? "Included in Pack" : "Inclus dans le Pack")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pack Order CTA below products */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-[#FBF9F5] rounded-3xl p-6 md:p-8 border-2 border-[#2D4030]/20 shadow-xl flex flex-col md:flex-row items-center gap-6">
              <img
                src="/images/pack-lifestyle.jpg"
                alt="Pack Complet LYXENESKIN"
                className="w-40 h-40 object-cover rounded-2xl border border-[#E5DEC8] shadow-md flex-shrink-0"
              />
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block text-[10px] font-bold text-white bg-[#A26D62] px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                  {isRTL ? "عرض خاص" : (lang === 'en' ? "Special Offer" : "Offre Spéciale")}
                </span>
                <h3 className="font-serif font-bold text-xl text-[#2D4030] mb-1">
                  {isRTL ? "المجموعة الكاملة 3 في 1" : (lang === 'en' ? "Complete 3-in-1 Pack" : "Pack Complet 3-en-1")}
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  {isRTL ? "جميع المنتجات الثلاثة في عرض واحد" : (lang === 'en' ? "All 3 products in one special bundle" : "Les 3 produits réunis dans une offre unique")}
                </p>
                <div className="flex items-baseline gap-2 justify-center md:justify-start mb-4">
                  <span className="text-2xl font-bold text-[#2D4030]">{t.pricePack}</span>
                  <span className="text-sm line-through text-gray-400">{t.oldPricePack}</span>
                  <span className="text-xs bg-[#2D4030] text-[#F7F4EE] px-2 py-0.5 rounded-md font-bold">{t.saveBadge}</span>
                </div>
                <button
                  onClick={orderPack}
                  className="w-full md:w-auto bg-[#2D4030] hover:bg-[#202E23] text-white px-8 py-3 rounded-xl font-bold text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  {t.shopNow} — {t.pricePack}
                </button>
                <p className="text-[10px] text-green-700 font-medium mt-2">{t.freeShipping}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION: VISUAL GALLERY (Rich product lifestyle images)
      ========================================================= */}
      <section className="py-16 bg-[#FBF9F5] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-serif font-bold text-[#2D4030]">
              {isRTL ? "المجموعة الكاملة بالصور" : (lang === 'en' ? "The Complete Collection" : "La Gamme en Images")}
            </h2>
            <div className="w-12 h-0.5 bg-[#A26D62] mx-auto mt-3"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#DFD6C7] group">
              <img src="/images/pack-complet.jpg" alt="Pack LYXENESKIN sur plateau en marbre" className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#DFD6C7] group">
              <img src="/images/pack-lifestyle.jpg" alt="Pack LYXENESKIN lifestyle" className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#DFD6C7] group">
              <img src="/images/gel-infographic.jpg" alt="Gel Nettoyant LYXENESKIN infographie" className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION: LA ROUTINE (Guide d'utilisation matin & soir)
      ========================================================= */}
      <section id="routine" className="py-20 bg-[#FBF9F5] border-b border-[#E8E1D5] px-6">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#A26D62] uppercase tracking-widest inline-block mb-2">
              {isRTL ? "طريقة الاستعمال الصحيحة" : (lang === 'en' ? "Expert Step-by-Step Guide" : "Protocole d'Application Quotidien")}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D4030]">
              {isRTL ? "الروتين الكامل للحصول على نتائج سريعة" : (lang === 'en' ? "The Complete Routine For Fast Results" : "La Routine Idéale pour des Résultats en 14 Jours")}
            </h2>
            <div className="w-16 h-0.5 bg-[#A26D62] mx-auto mt-4 mb-4"></div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {isRTL
                ? "اتبعي هذا الروتين البسيط صباحاً ومساءً المخصص لمجموعة LYXENESKIN (الجل المنظف + السيروم المفتح + كريم الكولاجين) لتنظيف المسام، توحيد لون البشرة، والتخلص النهائي من البقع والتصبغات."
                : (lang === 'en'
                  ? "Follow this simple morning & evening routine designed specifically for the LYXENESKIN 3-in-1 pack to brighten your skin, clear acne marks and achieve a glowing complexion."
                  : "Pour maximiser l'efficacité de vos 3 soins LYXENESKIN (Gel Nettoyant, Sérum Éclaircissant, Crème Hydratante), suivez ce protocole pensé par nos dermatologues. Respectez l'ordre d'application pour une absorption optimale.")}
            </p>
          </div>

          {/* Visual Routine Steps Image */}
          <div className="mb-14 rounded-3xl overflow-hidden shadow-xl border border-[#DFD6C7] max-w-3xl mx-auto">
            <img
              src="/images/routine-steps.jpg"
              alt={isRTL ? "خطوات الروتين الكامل" : "Les 3 étapes de la routine LYXENESKIN"}
              className="w-full object-cover"
            />
          </div>

          {/* Morning vs Evening Timeline */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">

            {/* Morning Routine Card */}
            <div className="bg-white rounded-3xl p-8 border border-[#DFD6C7] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10"></div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-700 flex items-center justify-center">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                    {isRTL ? "خطوات الصباح" : (lang === 'en' ? "Daytime Routine" : "Rituel du Matin")}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#2D4030]">
                    {isRTL ? "روتين الصباح — حماية ونقاء طوال اليوم" : (lang === 'en' ? "Morning Protocol — Protect & Purify" : "Matin : Purifier & Protéger")}
                  </h3>
                </div>
              </div>

              <div className="space-y-5">
                {/* Step 1 */}
                <div className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#2D4030] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#2D4030]">
                      {isRTL ? "الجل المنظف بالأرز والنياسيناميد (200 ml)" : "Nettoyage purifiant avec le Gel Nettoyant (200 ml)"}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {isRTL ? "اغسلي وجهك بالماء الفاتر مع تدليك لطيف بحركات دائرية لمدة 60 ثانية لتنقية المسام والتخلص من الزيوت الزائدة." : "Massez délicatement 1 pression sur peau humide pendant 60 secondes. L'alliance riz et niacinamide purifie le teint."}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#2D4030] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#2D4030]">
                      {isRTL ? "سيروم التفتيح بالنياسيناميد والأربوتين (50 ml)" : "Application du Sérum Éclaircissant Anti-Taches (50 ml)"}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {isRTL ? "ضعي من 3 إلى 4 قطرات على الوجه والرقبة لتفتيح البقع الداكنة وتوحيد لون البشرة." : "Déposez 3 à 4 gouttes directement sur le visage. L'alpha arbutine estompe les taches d'acné et illumine le teint."}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#2D4030] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#2D4030]">
                      {isRTL ? "كريم الكولاجين وحمض الهيالورونيك (50 ml)" : "Hydratation avec la Crème Éclaircissante au Collagène (50 ml)"}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {isRTL ? "ترطيب عميق يحافظ على نضارة ومرونة البشرة طوال اليوم بدون أي لمعان دهني." : "Hydrate en profondeur grâce au collagène et à l'acide hyaluronique pour un fini repulpé et lumineux."}
                    </p>
                  </div>
                </div>

                {/* Step 4 Tip */}
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 text-[11px] text-amber-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span>{isRTL ? "نصيحة إضافية: يُستحسن دائماً وضع واقي شمس مناسب بعد الكريم المرطب." : "Astuce du matin : Appliquez toujours un écran solaire non comédogène après votre crème hydratante."}</span>
                </div>
              </div>
            </div>

            {/* Evening Routine Card */}
            <div className="bg-white rounded-3xl p-8 border border-[#DFD6C7] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10"></div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100/80 text-indigo-700 flex items-center justify-center">
                  <Moon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">
                    {isRTL ? "خطوات المساء" : (lang === 'en' ? "Nighttime Routine" : "Rituel du Soir")}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#2D4030]">
                    {isRTL ? "روتين المساء — تجديد وتغذية ليلية مكثفة" : (lang === 'en' ? "Evening Protocol — Regenerate & Restore" : "Soir : Régénérer & Réparer")}
                  </h3>
                </div>
              </div>

              <div className="space-y-5">
                {/* Step 1 */}
                <div className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#A26D62] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#2D4030]">
                      {isRTL ? "تنظيف عميق بالجل المنظف" : "Nettoyage détox au Gel Nettoyant"}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {isRTL ? "إزالة آثار التلوث، الشوائب والدهون المتراكمة خلال اليوم لتتنفس البشرة بحرية." : "Élimine la pollution, les impuretés et l'excès de sébum accumulés pour laisser respirer la peau."}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#A26D62] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#2D4030]">
                      {isRTL ? "سيروم النياسيناميد للتجديد الليلي" : "Sérum Éclaircissant régénérant"}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {isRTL ? "فترة النوم هي الأفضل لامتصاص الألفا أربوتين وتسريع تفتيح آثار الحبوب والتصبغات." : "La nuit, le renouvellement cellulaire s'accélère. Les actifs pénètrent en profondeur pour estomper les taches."}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#A26D62] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#2D4030]">
                      {isRTL ? "كريم الكولاجين للترميم الليلي" : "Crème au Collagène Réparatrice"}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {isRTL ? "تغذية مكثفة وترميم حاجز البشرة الواقي لتستيقظي ببشرة رطبة، ناعمة ومشرقة." : "Nourrit intensément et renforce le film protecteur pour un réveil avec une peau souple et radieuse."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 3 Steps To Quick Results Banner */}
          <div className="bg-[#2D4030] text-[#F7F4EE] rounded-3xl p-8 md:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold text-[#A26D62] uppercase tracking-wider block">
                {isRTL ? "الالتزام هو سر النتيجة" : "Conseil des Experts LYXENESKIN"}
              </span>
              <h3 className="font-serif font-bold text-2xl text-white">
                {isRTL ? "كيفاش تلاحظي الفرق فـ 14 يوم فقط؟" : "Comment voir les premiers résultats en 14 jours ?"}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {isRTL
                  ? "الاستمرارية مرتين فاليوم (صباحاً ومساءً)، عدم لمس الحبوب باليدين، وشرب 2 لتر من الماء يومياً كيضمن ليك تصفية كاملة للبشرة."
                  : "Une application régulière matin et soir sans sauter d'étape, combinée à une bonne hydratation, permet d'éliminer 94% des imperfections dès 2 semaines."}
              </p>
            </div>
            <button
              onClick={orderPack}
              className="bg-[#F7F4EE] hover:bg-white text-[#2D4030] px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition shadow-lg flex-shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <Package className="w-4 h-4" />
              {isRTL ? "اطلبي المجموعة كاملة — 289 درهم" : "Commander la Routine — 289 DH"}
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION: CONSEILS (10 Conseils Essentiels Skincare)
      ========================================================= */}
      <section id="blog" className="py-20 bg-[#F4EFE6] border-b border-[#E8E1D5] px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#A26D62] uppercase tracking-widest inline-block mb-2">
              {isRTL ? "دليل العناية اليومية" : (lang === 'en' ? "Skincare Guide & Tips" : "Guide Skincare & Conseils")}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D4030]">
              {isRTL ? "10 نصائح ذهبية للعناية بالبشرة والتخلص من الحبوب" : (lang === 'en' ? "10 Golden Rules for Clear & Healthy Skin" : "Les 10 Conseils d'Or pour une Peau Zéro Défaut")}
            </h2>
            <div className="w-16 h-0.5 bg-[#A26D62] mx-auto mt-4 mb-4"></div>
            <p className="text-sm text-gray-600">
              {isRTL
                ? "عادات يومية بسيطة معتمدة من أطباء الجلد لتسريع علاج حب الشباب والحفاظ على نضارة وإشراقة بشرتك."
                : (lang === 'en'
                  ? "Essential daily habits approved by dermatologists to treat breakouts, clear acne marks and maintain healthy glowing skin."
                  : "Les réflexes indispensables validés par les dermatologues pour dire adieu aux boutons, réguler le sébum et retrouver confiance.")}
            </p>
          </div>

          {/* 10 Tips Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

            {/* Tip 1 */}
            <div className="bg-[#FBF9F5] rounded-2xl p-6 border border-[#E5DEC8] shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D4030] text-white flex items-center justify-center font-bold text-sm font-mono">
                01
              </div>
              <h3 className="font-bold text-sm text-[#2D4030]">
                {isRTL ? "ماتقيصيش الحبوب بيديك نهائياً" : "Ne touchez jamais à vos boutons"}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isRTL
                  ? "عصر الحبوب كينقل البكتيريا للأماكن السليمة، كيزيد من الالتهاب وكيخلي علامات وبقع داكنة صعيبة فالإزالة. استعملي سيروم النياسيناميد لتهدئة المنطقة وتوحيد اللون."
                  : "Percer un bouton propage les bactéries sous la peau, augmente l'inflammation et garantit des cicatrices pigmentaires durables. Laissez agir vos soins ciblés."}
              </p>
            </div>

            {/* Tip 2 */}
            <div className="bg-[#FBF9F5] rounded-2xl p-6 border border-[#E5DEC8] shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D4030] text-white flex items-center justify-center font-bold text-sm font-mono">
                02
              </div>
              <h3 className="font-bold text-sm text-[#2D4030]">
                {isRTL ? "بدلي غشاء الوسادة (Taie d'oreiller) بانتظام" : "Changez votre taie d'oreiller tous les 3 jours"}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isRTL
                  ? "الوسادة كتجمع العرق، الزيوت وخلايا الجلد الميتة كل ليلة. بدلي الغشاء مرتين فالسيمانة على الأقل، ويفضل وسادة من الحرير أو القطن النقي."
                  : "Le tissu absorbe le sébum, les résidus capillaires et les bactéries chaque nuit. Utilisez une taie en soie ou en coton lavée très régulièrement."}
              </p>
            </div>

            {/* Tip 3 */}
            <div className="bg-[#FBF9F5] rounded-2xl p-6 border border-[#E5DEC8] shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D4030] text-white flex items-center justify-center font-bold text-sm font-mono">
                03
              </div>
              <h3 className="font-bold text-sm text-[#2D4030]">
                {isRTL ? "ماتستغنايش على الترطيب وخا تكون بشرتك دهنية" : "N'ayez pas peur d'hydrater une peau grasse"}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isRTL
                  ? "إذا حرمتي البشرة الدهنية من الترطيب، كتدير رد فعل وكتفرز دهون كتر باش تحمي راسها. استعملي Crème Visage LYXENESKIN ذات التركيبة الخفيفة."
                  : "Déshydratée, une peau acnéique surproduit du sébum pour se protéger. Une crème légère à l'Aloe Vera équilibre et apaise immédiatement."}
              </p>
            </div>

            {/* Tip 4 */}
            <div className="bg-[#FBF9F5] rounded-2xl p-6 border border-[#E5DEC8] shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D4030] text-white flex items-center justify-center font-bold text-sm font-mono">
                04
              </div>
              <h3 className="font-bold text-sm text-[#2D4030]">
                {isRTL ? "مسحي شاشة الهاتف ديالك يومياً" : "Désinfectez l'écran de votre téléphone"}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isRTL
                  ? "شاشة الهاتف كتجمع بكتيريا كتر من مقعد المرحاض! فاش كتحطيها على وجهك فالمكالمات كتسبب حبوب على الخدين والفك."
                  : "Véritable nid à bactéries, coller son smartphone contre sa joue lors d'appels provoque souvent des poussées d'acné sur les mâchoires."}
              </p>
            </div>

            {/* Tip 5 */}
            <div className="bg-[#FBF9F5] rounded-2xl p-6 border border-[#E5DEC8] shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D4030] text-white flex items-center justify-center font-bold text-sm font-mono">
                05
              </div>
              <h3 className="font-bold text-sm text-[#2D4030]">
                {isRTL ? "غسلي وجهك بالماء الفاتر ماشي الساخن" : "Lavez votre visage à l'eau tiède, jamais chaude"}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isRTL
                  ? "الماء الساخن كيدمر الحاجز الواقي للبشرة وكيسبب الجفاف وتهيج الحبوب. الماء الفاتر هو الأفضل لفتح المسام بلطف."
                  : "L'eau trop chaude agresse le film hydrolipidique naturel et stimule les glandes sébacées. L'eau tiède est idéale pour purifier en douceur."}
              </p>
            </div>

            {/* Tip 6 */}
            <div className="bg-[#FBF9F5] rounded-2xl p-6 border border-[#E5DEC8] shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D4030] text-white flex items-center justify-center font-bold text-sm font-mono">
                06
              </div>
              <h3 className="font-bold text-sm text-[#2D4030]">
                {isRTL ? "شربي ما لا يقل عن 1.5 إلى 2 لتر من الماء" : "Buvez 1,5L à 2L d'eau par jour"}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isRTL
                  ? "الترطيب الداخلي كيساعد الجسم يتخلص من السموم، كيحسن مرونة البشرة وكيخلي إشراقتها طبيعية بدون شوائب."
                  : "L'hydratation commence de l'intérieur. Boire suffisamment aide les reins à filtrer les toxines et favorise la cicatrisation cutanée."}
              </p>
            </div>

            {/* Tip 7 */}
            <div className="bg-[#FBF9F5] rounded-2xl p-6 border border-[#E5DEC8] shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D4030] text-white flex items-center justify-center font-bold text-sm font-mono">
                07
              </div>
              <h3 className="font-bold text-sm text-[#2D4030]">
                {isRTL ? "استعملي فوطة خاصة بالوجه بوحدو" : "Utilisez une serviette dédiée uniquement au visage"}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isRTL
                  ? "ماتستعمليش نفس الفوطة ديال الجسم أو اليدين. خصصي فوطة صغيرة ناعمة ونشفي وجهك بالطبطبة الخفيفة ماشي الحك."
                  : "Ne séchez jamais votre visage avec la serviette de bain ou des mains. Tapotez avec une petite serviette propre sans frotter."}
              </p>
            </div>

            {/* Tip 8 */}
            <div className="bg-[#FBF9F5] rounded-2xl p-6 border border-[#E5DEC8] shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D4030] text-white flex items-center justify-center font-bold text-sm font-mono">
                08
              </div>
              <h3 className="font-bold text-sm text-[#2D4030]">
                {isRTL ? "نقصي من السكر والمقليات فالتغذية ديالك" : "Réduisez le sucre raffiné et les produits laitiers"}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isRTL
                  ? "الأطعمة الغنية بالسكر كترفع الأنسولين وكتنشط الهرمونات المسببة للإفرازات الدهنية وظهور الحبوب المفاجئة."
                  : "Les pics d'insuline provoqués par les sodas, pâtisseries et excès de laitages augmentent l'inflammation cutanée et l'acné kystique."}
              </p>
            </div>

            {/* Tip 9 */}
            <div className="bg-[#FBF9F5] rounded-2xl p-6 border border-[#E5DEC8] shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D4030] text-white flex items-center justify-center font-bold text-sm font-mono">
                09
              </div>
              <h3 className="font-bold text-sm text-[#2D4030]">
                {isRTL ? "نعسي من 7 لـ 8 سوايع كل ليلة" : "Offrez-vous un sommeil réparateur (7h à 8h)"}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isRTL
                  ? "أثناء النوم، الجسم كيفرز الكولاجين وكيصلح الخلايا المتضررة. قلة النعاس كترفع الكورتيزول وكتهيج الحبوب."
                  : "C'est entre 23h et 4h du matin que la peau se répare et synthétise le collagène. Le manque de sommeil accélère le vieillissement et l'acné."}
              </p>
            </div>

            {/* Tip 10 */}
            <div className="bg-[#FBF9F5] rounded-2xl p-6 border border-[#E5DEC8] shadow-sm hover:shadow-md transition space-y-3 sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-[#A26D62] text-white flex items-center justify-center font-bold text-sm font-mono">
                10
              </div>
              <h3 className="font-bold text-sm text-[#2D4030]">
                {isRTL ? "الاستمرارية والصبر هما المفتاح" : "La régularité : laissez le temps aux actifs d'agir"}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isRTL
                  ? "دورة تجدد البشرة كتاخد من 21 حتى 28 يوم. متقطعيش الروتين حتى تكملي المجموعة وغادي تشوفي الفرق المبهر بنفسك."
                  : "Le cycle de renouvellement cellulaire dure 28 jours. La patience et la fidélité à la routine 4-en-1 sont le secret d'une peau définitivement nette."}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION: CONTACT & SUPPORT
      ========================================================= */}
      <section id="contact" className="py-20 bg-[#FBF9F5] px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#A26D62] uppercase tracking-widest inline-block mb-2">
              {isRTL ? "خدمة الزبناء" : (lang === 'en' ? "Customer Care" : "Support & Assistance")}
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2D4030]">
              {isRTL ? "تواصلوا معنا — نحن هنا لمساعدتكم" : (lang === 'en' ? "Get in Touch With Our Skincare Team" : "Une Question ? Contactez Notre Équipe")}
            </h2>
            <div className="w-12 h-0.5 bg-[#A26D62] mx-auto mt-3 mb-3"></div>
            <p className="text-xs text-gray-600">
              {isRTL
                ? "فريق LYXENESKIN في خدمتكم للإجابة على جميع استفساراتكم حول المنتجات وطرق الاستعمال ومتابعة الطلبيات."
                : (lang === 'en'
                  ? "Our skincare advisors are available 7 days a week to help with your routine, order tracking, and delivery questions."
                  : "Notre équipe beauté vous répond 7j/7 pour vous conseiller sur votre routine ou suivre votre livraison COD.")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">

            {/* WhatsApp Direct */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Salam,%20bghit%20nswel%203la%20gamme%20Lyxeneskin`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-3xl p-6 border border-[#DFD6C7] shadow-sm hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-[#25D366] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 fill-current" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#2D4030] mb-1">
                {isRTL ? "واتساب مباشر" : "WhatsApp Direct"}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {isRTL ? "إجابة فورية من خبيرات العناية" : "Réponse rapide en moins de 15 minutes"}
              </p>
              <span className="text-xs font-bold text-[#25D366] underline">
                {isRTL ? "بدء المحادثة الآن ←" : "Discuter sur WhatsApp →"}
              </span>
            </a>

            {/* Phone support */}
            <div className="bg-white rounded-3xl p-6 border border-[#DFD6C7] shadow-sm text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#EFEAE1] text-[#2D4030] flex items-center justify-center mb-4">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#2D4030] mb-1">
                {isRTL ? "الاتصال الهاتفي" : "Support Téléphonique"}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {isRTL ? "من الإثنين إلى السبت (9h - 19h)" : "Du Lundi au Samedi, 9h à 19h"}
              </p>
              <span className="text-xs font-bold text-[#2D4030] font-mono">
                +212 6 00 00 00 00
              </span>
            </div>

            {/* Delivery Guarantee */}
            <div className="bg-white rounded-3xl p-6 border border-[#DFD6C7] shadow-sm text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#EFE4DE] text-[#A26D62] flex items-center justify-center mb-4">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#2D4030] mb-1">
                {isRTL ? "التوصيل والدفع عند الاستلام" : "Livraison & Suivi COD"}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {isRTL ? "توصيل خلال 24h إلى 48h بجميع مدن المغرب" : "Partout au Maroc en 24h à 48h"}
              </p>
              <span className="text-xs font-bold text-[#A26D62]">
                {isRTL ? "الدفع بعد المعاينة" : "Paiement à la réception"}
              </span>
            </div>

          </div>

          {/* Quick FAQ accordion-like help box */}
          <div className="mt-12 max-w-3xl mx-auto bg-white rounded-3xl p-8 border border-[#DFD6C7] shadow-sm">
            <h4 className="font-serif font-bold text-lg text-[#2D4030] mb-4 text-center">
              {isRTL ? "الأسئلة الأكثر تداولاً" : "Questions Fréquentes"}
            </h4>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#FBF9F5] rounded-2xl border border-[#EFEAE1]">
                <p className="font-bold text-[#2D4030] mb-1">
                  {isRTL ? "واش المنتجات مناسبة للبشرة الحساسة؟" : "Est-ce adapté aux peaux très sensibles ?"}
                </p>
                <p className="text-gray-500 leading-relaxed">
                  {isRTL ? "نعم، التركيبة طبيعية بدون بارابين أو كحول قاسي، وغنية بالألوفيرا المهدئة." : "Oui, formulé sans parabènes ni sulfates agressifs, enrichi en Aloe Vera pour apaiser."}
                </p>
              </div>
              <div className="p-4 bg-[#FBF9F5] rounded-2xl border border-[#EFEAE1]">
                <p className="font-bold text-[#2D4030] mb-1">
                  {isRTL ? "وقتاش كتبان النتيجة الأولى؟" : "Quand voit-on les premiers résultats ?"}
                </p>
                <p className="text-gray-500 leading-relaxed">
                  {isRTL ? "الاحمرار كينقص من اليومين الأولين، والبثور كتبدا تختفي فـ 10 إلى 14 يوم." : "Apaisement immédiat dès 48h. Diminution nette des boutons dès 10 à 14 jours."}
                </p>
              </div>
            </div>
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
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Salam,%20bghit%20nswel%203la%20gamme%20Lyxeneskin%20anti-acné`}
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
              alt="LYXENESKIN PARIS Logo"
              className="w-10 h-10 object-contain rounded-full bg-white/10 p-0.5 border border-[#405844]"
            />
            <div>
              <span className="font-serif font-bold text-lg text-white block">LYXENESKIN PARIS</span>
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

