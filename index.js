
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use( '/api/auth', require('./routes/auth.routes'));
app.use(cors());

app.listen(4000, () => {
  console.log("request to slash")
});