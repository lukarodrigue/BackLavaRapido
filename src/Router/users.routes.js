const { Router } = require('express');
const UsersController = require('../controllers/usersController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated')
const checkAdminPermission = require('../middleware/checkAdminPermission');

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/', usersController.create);
usersRoutes.put('/:id', ensureAuthenticated, checkAdminPermission, usersController.update);

module.exports = usersRoutes;