import { Router } from 'express';

import UsersController from '../controller/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register', usersController.create);

usersRoutes.get('/', usersController.listen);

usersRoutes.get('/:id', usersController.search);

usersRoutes.delete('/:id', usersController.delete);

usersRoutes.post('/update/:id', usersController.update);

export default usersRoutes;
