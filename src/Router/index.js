const { Router } = require('express');
const routes = Router();

//importa rotas de agendamentos
const apptRoutes = require("./appointments.routes");

//caminho para rotas
routes.use('/appointments', apptRoutes);

module.exports = routes;
