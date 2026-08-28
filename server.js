// server.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

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

app.listen(5000, () => console.log('Backend running on port 5000'));