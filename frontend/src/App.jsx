import { useState } from 'react';
import { 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  Leaf, 
  Globe, 
  CreditCard, 
  Lock, 
  CheckCircle, 
  Star,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const translations = {
  fr: {
    brand: "LYXENE PARIS",
    tagline: "Révélez l'éclat naturel de votre peau",
    heroTitle: "La Routine Anti-Acné Experte & Naturelle",
    heroSubtitle: "Formulée à base d'Aloe Vera pur et d'Acide Salicylique pour purifier, apaiser et transformer votre grain de peau durablement.",
    shopNow: "Commander la Routine Complète",
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
    buyNow: "Acheter Maintenant",
    blogTitle: "Conseils & Rituels Skincare",
    checkoutTitle: "Paiement Sécurisé",
    orderSummary: "Récapitulatif de Commande",
    cardNumber: "Numéro de Carte",
    expiry: "MM/AA",
    cvc: "CVC",
    payBtn: "Payer avec Stripe",
    whatsappHelp: "Besoin d'un conseil ? Discutez avec notre experte beauté",
    navHome: "Accueil",
    navShop: "Boutique",
    navRoutine: "La Routine",
    navBlog: "Conseils",
    navContact: "Contact"
  },
  ar: {
    brand: "LYXENE PARIS",
    tagline: "أظهري الإشراقة الطبيعية لبشرتك",
    heroTitle: "المجموعة الطبية المتكاملة لعلاج حب الشباب",
    heroSubtitle: "تركيبة فريدة بخلاصة الألوفيرا النقية وحمض الساليسيليك لتنقية البشرة، تهدئة الاحمرار واستعادة نضارتها.",
    shopNow: "طلب المجموعة الكاملة",
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
    buyNow: "شراء فوري",
    blogTitle: "نصائح وروتين العناية بالبشرة",
    checkoutTitle: "إتمام الدفع بأمان",
    orderSummary: "ملخص الطلب",
    cardNumber: "رقم البطاقة البنكية",
    expiry: "شهر / سنة",
    cvc: "رمز الأمان",
    payBtn: "دفع آمن عبر Stripe",
    whatsappHelp: "استشارة مجانية؟ تواصلي معنا عبر واتساب",
    navHome: "الرئيسية",
    navShop: "المتجر",
    navRoutine: "الروتين",
    navBlog: "نصائح",
    navContact: "اتصل بنا"
  },
  en: {
    brand: "LYXENE PARIS",
    tagline: "Reveal Your Skin's Natural Radiance",
    heroTitle: "Expert Anti-Acne Botanical Skincare",
    heroSubtitle: "Powered by pure Aloe Vera and Salicylic Acid to purify, soothe, and visibly clear acne-prone skin.",
    shopNow: "Shop The Complete Set",
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
    buyNow: "Buy Now",
    blogTitle: "Skincare Journal & Tips",
    checkoutTitle: "Secure Stripe Checkout",
    orderSummary: "Order Summary",
    cardNumber: "Card Number",
    expiry: "MM/YY",
    cvc: "CVC",
    payBtn: "Pay Securely via Stripe",
    whatsappHelp: "Need skin advice? Chat with our specialist on WhatsApp",
    navHome: "Home",
    navShop: "Shop",
    navRoutine: "Routine",
    navBlog: "Journal",
    navContact: "Contact"
  }
};

const products = [
  {
    id: 1,
    name: "Savon Liquide Anti-Acné (250 ml)",
    arName: "الصابون السائل المنظف والمطهر (250 مل)",
    subtitle: "Nettoie • Purifie • Protège",
    arSubtitle: "تنظيف عميق • حماية • توازن الدهون",
    price: "150 DH",
    tag: "Étape 1 : Nettoyage",
    badge: "Indispensable"
  },
  {
    id: 2,
    name: "Sérum Visage Anti-Acné Concentré (30 ml)",
    arName: "سيروم الوجه المركز المضاد للحبوب (30 مل)",
    subtitle: "Acide Salicylique + Aloe Vera haute concentration",
    arSubtitle: "تركيز مضاعف لتجفيف الحبوب وتضييق المسام",
    price: "180 DH",
    tag: "Étape 2 : Traitement Ciblé",
    badge: "Top Éclat"
  },
  {
    id: 3,
    name: "Crème Visage Apaisante & Rééquilibrante (50 ml)",
    arName: "كريم الوجه المهدئ والمرطب (50 مل)",
    subtitle: "Purifie • Apaise • Rééquilibre",
    arSubtitle: "ترطيب بدون لمعان • تهدئة فورية",
    price: "160 DH",
    tag: "Étape 3 : Hydratation",
    badge: "Texture Légère"
  },
  {
    id: 4,
    name: "Crème Tube Soin Localisé Anti-Acné",
    arName: "كريم موضعي لعلاج البثور السريعة",
    subtitle: "Action ciblée express sur les boutons",
    arSubtitle: "تطبيق موضعي سريع المفعول",
    price: "130 DH",
    tag: "Étape 4 : Urgence Boutons",
    badge: "Action Rapide"
  }
];

export default function App() {
  const [lang, setLang] = useState('fr');
  const [cart, setCart] = useState([products[0], products[1]]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const t = translations[lang];
  const isRTL = lang === 'ar';

  const totalPrice = cart.reduce((acc, item) => acc + parseInt(item.price), 0);

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
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#2D4030] flex items-center justify-center text-[#F7F4EE] font-serif font-bold text-xl">
              L
            </div>
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
              onClick={() => setCheckoutOpen(true)}
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
              onClick={() => setCheckoutOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 bg-[#2D4030] text-[#F7F4EE] px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#202E23] transition shadow-sm"
            >
              <CreditCard className="w-4 h-4" />
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
              onClick={() => setCheckoutOpen(true)}
              className="bg-[#2D4030] hover:bg-[#202E23] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow"
            >
              {t.buyNow}
            </button>
          </div>

          <div className="flex items-center gap-6 pt-2 text-xs text-gray-500 font-medium">
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

        {/* Product Visual Card */}
        <div className="relative">
          <div className="aspect-[4/5] bg-gradient-to-tr from-[#EFEAE1] via-[#F4EFE6] to-[#E8E1D5] rounded-3xl p-8 border border-[#DFD6C7] flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#2D4030]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex justify-between items-start z-10">
              <span className="bg-[#2D4030] text-white text-[11px] px-3 py-1 rounded-full font-semibold">Gamme Complète</span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            <div className="text-center py-10 z-10">
              <div className="font-serif text-5xl font-extrabold tracking-widest text-[#2D4030]/20 mb-2">LYXENE</div>
              <p className="text-sm font-semibold text-[#2D4030]">Savon • Sérum • Crème • Soin Ciblé</p>
              <p className="text-xs text-[#A26D62] mt-1 font-medium">Aloe Vera & Acide Salicylique</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#E3DCD0] flex items-center justify-between z-10">
              <div>
                <p className="text-xs text-gray-500">{isRTL ? "النتيجة بعد أسبوعين" : "Avis vérifié"}</p>
                <p className="text-xs font-bold text-[#2D4030]">"Bouti diali safat w l'rougeur mcha f 10 iyam!"</p>
              </div>
              <span className="text-xs font-bold text-[#A26D62]">- Salma M.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Product Catalog (4 Products) */}
      <section id="products" className="py-20 bg-[#F4EFE6] border-y border-[#E8E1D5] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-3xl font-serif font-bold text-[#2D4030]">{t.catalogTitle}</h2>
            <div className="w-12 h-0.5 bg-[#A26D62] mx-auto mt-3 mb-3"></div>
            <p className="text-xs text-gray-600">Formule douce pour peaux grasses, mixtes et à tendance acnéique.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-[#FBF9F5] rounded-2xl p-5 border border-[#E5DEC8] flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-[#A26D62] uppercase tracking-wider">{p.tag}</span>
                    <span className="text-[10px] bg-[#EFEAE1] text-[#2D4030] font-semibold px-2 py-0.5 rounded-full">{p.badge}</span>
                  </div>
                  <div className="h-40 bg-[#EFEAE1] rounded-xl mb-4 flex items-center justify-center text-center p-4">
                    <div>
                      <span className="font-serif text-lg font-bold text-[#2D4030] block">LYXENE</span>
                      <span className="text-xs text-gray-500">{isRTL ? p.arName : p.name}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-[#2D4030]">{isRTL ? p.arName : p.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{isRTL ? p.arSubtitle : p.subtitle}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#EFEAE1] flex items-center justify-between">
                  <span className="font-bold text-base text-[#2D4030]">{p.price}</span>
                  <button 
                    onClick={() => {
                      if (!cart.find(item => item.id === p.id)) {
                        setCart([...cart, p]);
                      }
                      setCheckoutOpen(true);
                    }}
                    className="bg-[#2D4030] hover:bg-[#202E23] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                  >
                    {t.addToCart}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Checkout Drawer / Modal (Stripe Style) */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#FBF9F5] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5]">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#2D4030]" />
                  <h3 className="font-serif font-bold text-lg text-[#2D4030]">{t.checkoutTitle}</h3>
                </div>
                <button onClick={() => setCheckoutOpen(false)} className="p-1 text-gray-400 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items in cart */}
              <div className="py-4 space-y-3">
                <p className="text-xs font-bold text-[#A26D62] uppercase tracking-wider">{t.orderSummary}</p>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs bg-[#F2EDE4] p-3 rounded-xl">
                    <div>
                      <p className="font-bold text-[#2D4030]">{isRTL ? item.arName : item.name}</p>
                      <p className="text-gray-500 text-[11px]">{item.price}</p>
                    </div>
                    <button 
                      onClick={() => setCart(cart.filter(i => i.id !== item.id))}
                      className="text-red-500 text-[11px] hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>

              {/* Stripe Payment Form Mockup */}
              <div className="mt-4 space-y-4 bg-white p-4 rounded-2xl border border-[#E8E1D5]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#2D4030]" /> Paiement par Carte
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Stripe Secure</span>
                </div>

                <div>
                  <label className="text-[11px] text-gray-500 block mb-1">{t.cardNumber}</label>
                  <input 
                    type="text" 
                    placeholder="4242 •••• •••• 4242" 
                    className="w-full text-xs p-2.5 rounded-lg border border-[#E8E1D5] bg-[#FBF9F5] focus:outline-none focus:border-[#2D4030]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">{t.expiry}</label>
                    <input 
                      type="text" 
                      placeholder="MM / YY" 
                      className="w-full text-xs p-2.5 rounded-lg border border-[#E8E1D5] bg-[#FBF9F5] focus:outline-none focus:border-[#2D4030]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">{t.cvc}</label>
                    <input 
                      type="text" 
                      placeholder="123" 
                      className="w-full text-xs p-2.5 rounded-lg border border-[#E8E1D5] bg-[#FBF9F5] focus:outline-none focus:border-[#2D4030]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E1D5]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-gray-600">Total:</span>
                <span className="text-xl font-bold text-[#2D4030]">{totalPrice} DH</span>
              </div>
              <button 
                onClick={() => alert('Redirection vers Stripe Checkout API...')}
                className="w-full bg-[#2D4030] hover:bg-[#202E23] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
              >
                <Lock className="w-3.5 h-3.5" />
                {t.payBtn} ({totalPrice} DH)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Floating WhatsApp Button */}
      <a 
        href="https://wa.me/212600000000?text=Salam,%20bghit%20nswel%203la%20gamme%20Lyxene%20anti-acné" 
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
          <div>
            <span className="font-serif font-bold text-lg text-white block">LYXENE PARIS</span>
            <p className="mt-1">© 2026 yassirshop.com - Tous droits réservés.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Conditions Générales</a>
            <a href="#" className="hover:underline">Politique de Confidentialité</a>
            <a href="#" className="hover:underline">Contactez-nous</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
