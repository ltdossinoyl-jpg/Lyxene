// server.js — COD Lead Collection Backend
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// CORS — Allow requests from all origins (Vercel deployments, custom domains, localhost)
app.use(cors());
app.options('*', cors());


// Health check endpoint (for Render)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'lyxene-backend' });
});

// Store orders in a JSON file (simple storage for leads)
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
  orders.push(order);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
}

// POST — New COD Order / Lead
app.post('/api/orders', (req, res) => {
  try {
    const { fullName, phone, city, address, items, total, notes } = req.body;

    // Validation
    if (!fullName || !phone || !city || !address || !items || items.length === 0) {
      return res.status(400).json({ 
        error: 'Merci de remplir tous les champs obligatoires.' 
      });
    }

    const order = {
      id: `LYX-${Date.now()}`,
      fullName,
      phone,
      city,
      address,
      notes: notes || '',
      items,
      total,
      paymentMethod: 'COD',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    saveOrder(order);

    console.log(`✅ New order: ${order.id} — ${fullName} — ${phone} — ${total} DH`);

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

// GET — List all orders (admin)
app.get('/api/orders', (req, res) => {
  const orders = getOrders();
  res.json({ total: orders.length, orders });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Lyxene Backend running on port ${PORT}`));
