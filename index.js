import express from 'express';
import proxyRouter from './proxy.js'; // adjust the path if needed

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Webhook proxy server is running');
});

app.use('/webhook-proxy', proxyRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Webhook proxy server running on port ${PORT}`);
});
