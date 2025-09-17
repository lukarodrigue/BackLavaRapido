const { Router } = require('express');
const routes = Router();

const appointmentsRouter = require('./temp.routes.js');

routes.use('/appointments', appointmentsRouter);
console.log();
module.exports = routes;
