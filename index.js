
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use( '/api/auth', require('./routes/auth.routes'));
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`running on PORT: ${process.env.PORT} `)
});