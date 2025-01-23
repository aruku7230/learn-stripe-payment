import path from 'path';
import express from 'express';
import Stripe from 'stripe';
import env from './env.js'
import webhook from './webhook.js';

const STRIPE_SK = env.STRIPE_SK;
const STRIPE_PK = env.STRIPE_PK;

const stripe = new Stripe(STRIPE_SK);
const app = express();

app.get('/secret', async (req, res) => {
  // random number between 1000 to 10000.
  const amount = Math.floor(1000 + Math.random() * 9001);
  console.log(`amount: ${amount}`);
  const intent = await stripe.paymentIntents.create({
    amount,
    currency: 'jpy'
  });
  res.json({client_secret: intent.client_secret});
});

app.get('/stripe_pk', async (req, res) => {
  res.type('text/plain');
  res.send(STRIPE_PK);
});

app.use('/webhook', webhook);

app.use(express.static(path.join(import.meta.dirname, 'client')));

export default app;
