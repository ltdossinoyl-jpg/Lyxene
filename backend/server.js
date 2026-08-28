// server.js
require('dotenv').config();

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(express.json());

// CORS — Allow requests from the Vercel frontend URL
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({ 
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));

// Health check endpoint (for Render)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'lyxene-backend' });
});

// Stripe Payment Intent
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'mad' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // En centimes
      currency: currency,
      automatic_payment_methods: { enabled: true },
      metadata: { brand: 'Lyxene Skincare' }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Lyxene Backend running on port ${PORT}`));
