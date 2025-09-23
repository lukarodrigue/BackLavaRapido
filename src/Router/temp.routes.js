const { Router } = require('express');
const AppointmentsController = require('../controllers/appointmentsController');

const userRoutes = Router();
userRoutes.post('/', AppointmentsController.create);

module.exports = userRoutes;