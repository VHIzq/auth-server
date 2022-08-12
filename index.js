
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

const app = express();

dbConnection();

app.use(express.static('public'));

app.use(express.json());
app.use(cors());
app.use( '/api/auth', require('./routes/auth.routes'));

app.listen(process.env.PORT, () => {
  console.log(`running on PORT: ${process.env.PORT} `)
});