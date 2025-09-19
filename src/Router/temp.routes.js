const { Router } = require('express');
const appointmentsController = require('../controllers/appointmentsController');

const router = Router();

router.post('/', appointmentsController.createAppointment);
router.get('/', appointmentsController.getAllAppointments);
router.get('/:id', appointmentsController.getAllAppointmentsById);
router.delete('/:id', appointmentsController.deleteAppointment);

module.exports = router;
