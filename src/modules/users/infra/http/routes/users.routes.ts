import { Router } from 'express';

import UsersController from '../controller/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register', usersController.create);

usersRoutes.use(ensureAuthenticated);

usersRoutes.get('/', usersController.listen);

usersRoutes.get('/:id', usersController.search);

usersRoutes.delete('/', usersController.delete);

usersRoutes.put('/', usersController.update);

export default usersRoutes;
