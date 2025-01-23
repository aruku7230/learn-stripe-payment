async function getStripePk() {
  const res = await fetch('/stripe_pk');
  return await res.text();
}

async function mountPaymentElement() {
  const STRIPE_PK = await getStripePk();
  const stripe = Stripe(STRIPE_PK);

  const res = await fetch('/secret');
  const {client_secret: clientSecret} = await res.json();

  const options = {
    clientSecret,
    appearance: {

    }
  }

  const elements = stripe.elements(options);

  const paymentElementOptions = { layout: 'accordion'};
  const paymentElement = elements.create('payment', paymentElementOptions);
  paymentElement.mount('#payment-element');

  const form = document.getElementById('payment-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/checkout_succeeded.html',
      },
    });

    if (error) {
      const messageContainer = document.querySelector('#error-message');
      messageContainer.textContent = error.message;
    } else {

    }
  });
}

document.addEventListener('DOMContentLoaded', mountPaymentElement);
