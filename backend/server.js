// server.js — COD Lead Collection & Admin Backend with Telegram Alerts
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// CORS — Allow requests from all origins
app.use(cors());
app.options('*', cors());

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'yassir2027';

// Health check endpoint (for Render)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'lyxene-backend' });
});

// Admin Authentication Check
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: 'lyxene-admin-session-ok' });
  } else {
    res.status(401).json({ success: false, error: 'Mot de passe incorrect' });
  }
});

// ============================================
//  SETTINGS & NOTIFICATIONS CONFIG
// ============================================
const settingsFile = path.join(__dirname, 'settings.json');

const DEFAULT_TELEGRAM_TOKEN = '8048073592:AAEeziHsJx_Hc9MbI9GOcUTzVQ-Q-L6Wg_I';

function getSettings() {
  try {
    if (fs.existsSync(settingsFile)) {
      const s = JSON.parse(fs.readFileSync(settingsFile, 'utf8'));
      return {
        telegramToken: s.telegramToken || DEFAULT_TELEGRAM_TOKEN,
        telegramChatId: s.telegramChatId || ''
      };
    }
  } catch (e) {
    console.error('Error reading settings:', e);
  }
  return {
    telegramToken: process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TELEGRAM_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID || ''
  };
}

function saveSettings(settings) {
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
}

// GET — Settings (Admin)
app.get('/api/settings', (req, res) => {
  const s = getSettings();
  res.json(s);
});

// POST — Update Settings (Admin)
app.post('/api/settings', (req, res) => {
  try {
    const { telegramToken, telegramChatId } = req.body;
    const s = {
      telegramToken: (telegramToken || '').trim(),
      telegramChatId: (telegramChatId || '').trim()
    };
    saveSettings(s);
    res.json({ success: true, settings: s });
  } catch (e) {
    res.status(500).json({ error: 'Erreur lors de la sauvegarde des paramètres' });
  }
});

// POST — Send Test Telegram Message
app.post('/api/test-telegram', async (req, res) => {
  try {
    const s = getSettings();
    const token = req.body.telegramToken || s.telegramToken;
    const chatId = req.body.telegramChatId || s.telegramChatId;

    if (!token || !chatId) {
      return res.status(400).json({ error: 'Token ou Chat ID manquant' });
    }

    const testMsg = `
🌿 <b>LYXENE PARIS — Test de Notification Réussi !</b> ✅

🤖 Le bot Telegram est maintenant connecté à votre site.
📦 Toutes les nouvelles commandes de vos clients arriveront automatiquement dans ce groupe avec les coordonnées complètes et le lien WhatsApp direct !
`.trim();

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: testMsg,
        parse_mode: 'HTML'
      })
    });

    const data = await tgRes.json();
    if (data.ok) {
      res.json({ success: true, message: 'Message de test envoyé avec succès dans votre groupe Telegram !' });
    } else {
      res.status(400).json({ error: data.description || 'Erreur Telegram' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || 'Erreur lors de l\'envoi' });
  }
});

// Send Telegram notification for orders
async function sendTelegramNotification(order) {
  const s = getSettings();
  const token = s.telegramToken || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = s.telegramChatId || process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log('ℹ️ Telegram notifications not configured yet');
    return;
  }

  let cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '212' + cleanPhone.substring(1);
  }
  const waLink = `https://wa.me/${cleanPhone}`;

  const itemsList = order.items.map(i => `  ▫️ <b>${i.name}</b> (${i.price} DH)`).join('\n');

  const text = `
🌿 <b>🛍️ NOUVELLE COMMANDE LYXENE !</b> 🛍️

🆔 <b>N° Commande :</b> <code>${order.id}</code>
👤 <b>Nom :</b> <b>${order.fullName}</b>
📞 <b>Téléphone :</b> <code>${order.phone}</code>
🏙️ <b>Ville :</b> <b>${order.city}</b>
📍 <b>Adresse :</b> ${order.address}
${order.notes ? `📝 <b>Note :</b> <i>${order.notes}</i>\n` : ''}
📦 <b>Articles :</b>
${itemsList}

💰 <b>TOTAL COD :</b> <b>${order.total} DH</b>
🚚 <b>Mode :</b> Paiement à la Livraison (COD)

📲 <a href="${waLink}"><b>👉 Cliquer ici pour contacter sur WhatsApp</b></a>
`.trim();

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: false
      })
    });
    const result = await res.json();
    if (!result.ok) {
      console.error('Telegram notification error:', result.description);
    } else {
      console.log(`📱 Telegram alert sent for order ${order.id}`);
    }
  } catch (err) {
    console.error('Failed to send Telegram notification:', err);
  }
}

// ============================================
//  PRODUCTS STORAGE & MANAGEMENT
// ============================================
const productsFile = path.join(__dirname, 'products.json');

const DEFAULT_PRODUCTS = [
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

function getProducts() {
  try {
    if (fs.existsSync(productsFile)) {
      return JSON.parse(fs.readFileSync(productsFile, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading products:', e);
  }
  return DEFAULT_PRODUCTS;
}

function saveProducts(products) {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}

// GET — List products
app.get('/api/products', (req, res) => {
  const products = getProducts();
  res.json(products);
});

// PUT — Update a single product (Admin)
app.put('/api/products/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;
    let products = getProducts();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    products[index] = { 
      ...products[index], 
      ...updates,
      price: Number(updates.price) || products[index].price,
      priceLabel: `${Number(updates.price) || products[index].price} DH`
    };

    saveProducts(products);
    res.json({ success: true, product: products[index] });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

// POST — Reset products to defaults
app.post('/api/products/reset', (req, res) => {
  saveProducts(DEFAULT_PRODUCTS);
  res.json({ success: true, products: DEFAULT_PRODUCTS });
});

// ============================================
//  ORDERS STORAGE & MANAGEMENT
// ============================================
const ordersFile = path.join(__dirname, 'orders.json');

function getOrders() {
  try {
    if (fs.existsSync(ordersFile)) {
      return JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading orders:', e);
  }
  return [];
}

function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order); // add to beginning so newest comes first
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
}

function saveAllOrders(orders) {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
}

// POST — New COD Order / Lead
app.post('/api/orders', async (req, res) => {
  try {
    const { fullName, phone, city, address, items, total, notes } = req.body;

    if (!fullName || !phone || !city || !address || !items || items.length === 0) {
      return res.status(400).json({ 
        error: 'Merci de remplir tous les champs obligatoires.' 
      });
    }

    const order = {
      id: `LYX-${Date.now().toString().slice(-6)}`,
      fullName,
      phone,
      city,
      address,
      notes: notes || '',
      items,
      total,
      paymentMethod: 'COD',
      status: 'pending', // 'pending' | 'confirmed' | 'delivered' | 'cancelled'
      createdAt: new Date().toISOString()
    };

    saveOrder(order);
    console.log(`✅ New order: ${order.id} — ${fullName} — ${phone} — ${total} DH`);

    // Send Telegram alert asynchronously
    sendTelegramNotification(order).catch(err => console.error('TG notification failed:', err));

    res.json({ 
      success: true, 
      orderId: order.id,
      message: 'Commande reçue avec succès!'
    });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ error: 'Erreur serveur. Réessayez.' });
  }
});

// GET — List all orders
app.get('/api/orders', (req, res) => {
  const orders = getOrders();
  res.json({ total: orders.length, orders });
});

// PATCH — Update Order Status (Admin)
app.patch('/api/orders/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const orders = getOrders();
    const order = orders.find(o => o.id === id);

    if (!order) {
      return res.status(404).json({ error: 'Commande introuvable' });
    }

    order.status = status;
    saveAllOrders(orders);
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: 'Erreur mise à jour commande' });
  }
});

// DELETE — Delete Order (Admin)
app.delete('/api/orders/:id', (req, res) => {
  try {
    const { id } = req.params;
    let orders = getOrders();
    orders = orders.filter(o => o.id !== id);
    saveAllOrders(orders);
    res.json({ success: true, message: 'Commande supprimée' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur suppression commande' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Lyxene Backend running on port ${PORT}`));
