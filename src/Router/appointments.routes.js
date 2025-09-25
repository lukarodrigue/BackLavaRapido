const { Router } = require('express');
const AppointmentsController = require('../controllers/appointmentsController');

const apptRoutes = Router();

const appointmentsController = new AppointmentsController();

apptRoutes.post('/', appointmentsController.create);
apptRoutes.get('/:id', appointmentsController.show);
apptRoutes.delete('/:id', appointmentsController.delete);
apptRoutes.put('/:id', appointmentsController.update);

module.exports = apptRoutes;