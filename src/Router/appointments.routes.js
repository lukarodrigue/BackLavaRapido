const { Router } = require('express');
const AppointmentsController = require('../controllers/appointmentsController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const apptRoutes = Router();

const appointmentsController = new AppointmentsController();

apptRoutes.post('/', appointmentsController.create);
apptRoutes.get('/:id', ensureAuthenticated, appointmentsController.show);
apptRoutes.delete('/:id', ensureAuthenticated, appointmentsController.delete);
apptRoutes.put('/:id', ensureAuthenticated, appointmentsController.update);

module.exports = apptRoutes;