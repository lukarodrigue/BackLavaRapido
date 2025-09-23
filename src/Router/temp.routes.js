const { Router } = require('express');
const AppointmentsController = require('../controllers/appointmentsController');

const apptRoutes = Router();
apptRoutes.post('/', AppointmentsController.create);
apptRoutes.get('/:id', AppointmentsController.show);
module.exports = apptRoutes;