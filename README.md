# Get Started

1. `npm install`.
2. Create `.env` file copied from `.env.example`, and change environment variable as needed.
3. [Enable local webhook test](https://docs.stripe.com/webhooks/quickstart#download)
   1. Download Stripe CLI
   2. Login to stripe, and copy webhook secret key to environment file.
   3. Forward events to local webhook: `stripe listen --forward-to localhost:3000/webhook`.
4. `npm start`.
5. Go to checkout page and pay.
