import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.send('✅ Webhook proxy server is running');
});

// Webhook proxy endpoint
app.post('/webhook-proxy', async (req, res) => {
  try {
    console.log('Received POST data:', req.body);
    // Forward the POST data to your internal webhook
    const response = await axios.post(
      'https://crmapi.spiderx.ai/dineo-form-webhook',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res.status(200).json({
      message: 'Forwarded to internal webhook successfully',
      status: response.status,
    });
  } catch (err) {
    console.error('❌ Proxy failed:', err.message);
    return res.status(500).json({
      message: 'Failed to forward to internal webhook',
      error: err.message,
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Webhook proxy server running on port 3000`);
});