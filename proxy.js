import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/integrately-webhook', async (req, res) => {
  try {
    // Forward the POST data to your internal webhook
    const response = await axios.post(
      'https://crmapi.spiderx.ai/dineo-form-webhook', // this runs `updateMondayItemWithTicketId`
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

export default router;
