const PORT = 8080;
const express = require('express');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

const app = express();

app.use(cors());

app.get('/*', (req, res) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2ZDM5NGE5N2VhYTM0ZmJiYWY0MDFiYTMzZjRhZjFiYyIsImlhdCI6MTcwNTA5NDM2MywiZXhwIjoyMDIwNDU0MzYzfQ.91RstDHi9OG1U0_OFWudSjaNGzTo5RWX2laKbhIFZMU';
  const options = {
    method: 'GET',
    url: 'http://192.168.1.167:8123/api' + req.url,
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
