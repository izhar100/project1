const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 5004;

app.use(bodyParser.json());

const baseUrl = 'https://cross-friend.vercel.app';

const headers = {
  'Content-Type': 'application/json',
};

const sendOtpEndpoint = '/api/v1/sendotp';
const loginEndpoint = '/api/v1/login/otp';

app.post('/send-otp', async (req, res) => {
  try {
    const response = await axios.post(`${baseUrl}${sendOtpEndpoint}`, req.body, {
      headers,
    });

    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.status(response.status).json(response.data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error sending OTP' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const response = await axios.post(`${baseUrl}${loginEndpoint}`, req.body, {
      headers,
    });

    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.status(response.status).json(response.data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error during login' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
