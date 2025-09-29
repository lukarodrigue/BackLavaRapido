require('dotenv').config();

const AppError = require('./utils/AppError');
const express = require('express');
const app = express();
const database = require('./database/sqlite3');

app.use(express.json());

const routes = require('./router/index');
app.use(routes);

database();

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  } 
  console.error(error);
  return response.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


