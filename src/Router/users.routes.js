const { Router } = require('express');
const UsersController = require('../controllers/usersController');

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/', usersController.create);
//usersRoutes.get('/:id', appointmentsController.show);
//usersRoutes.delete('/:id', appointmentsController.delete);
//usersRoutes.put('/:id', appointmentsController.update);

module.exports = usersRoutes;