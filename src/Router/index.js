const { Router } = require('express');
const routes = Router();

//importa rotas de agendamentos
const appointmentsRouter = require('./temp.routes.js');

//caminho para rotas
routes.use('/appointments', appointmentsRouter);

module.exports = routes;
