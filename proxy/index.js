const PORT = 8080;
const express = require('express');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

const app = express();

app.use(cors());

app.get('/*', (req, res) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzYTg1YjIxNGU3NjE0YjlmOGYxMTNhMTU0YWRkZGU0ZCIsImlhdCI6MTczNTg0NzQwMiwiZXhwIjoyMDUxMjA3NDAyfQ.L92_K-gAIvgYPNN_8qQfpsVoMEw_2HVSXFh_K0ravyQ';
  const options = {
    method: 'GET',
    url: 'http://homeassistant.local:8123/api' + req.url,
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: 'application/json',
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
