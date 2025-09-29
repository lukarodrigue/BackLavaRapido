const { Router } = require('express');
const routes = Router();

//importa rotas de agendamentos
const apptRoutes = require("./appointments.routes");
const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");




//caminho para rotas
routes.use('/appointments', apptRoutes);
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)




module.exports = routes;
