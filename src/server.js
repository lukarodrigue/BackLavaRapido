require('dotenv').config();

const express = require('express');
const app = express();
const database = require('./database/sqlite3');

app.use(express.json());

const routes = require('./router/index');
app.use(routes);

database();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


