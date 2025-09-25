const { Router } = require('express');
const routes = Router();

//importa rotas de agendamentos
const apptRoutes = require("./appointments.routes");
const usersRoutes = require("./users.routes");
//caminho para rotas
routes.use('/appointments', apptRoutes);
routes.use('/users', usersRoutes)


module.exports = routes;
