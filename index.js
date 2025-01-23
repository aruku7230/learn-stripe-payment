import env from './src/env.js';
import app from './src/app.js'

const PORT = env.PORT || 3000;
const HOST = "localhost";
const BASE_URL = `http://${HOST}:${PORT}`;
app.listen(PORT, () => {
  console.log(`Server is running: ${BASE_URL}`);
  console.log(`Checkout Page: ${BASE_URL}/checkout.html`);
  console.log(`Webhook endpoint: ${BASE_URL}/webhook`);
});
