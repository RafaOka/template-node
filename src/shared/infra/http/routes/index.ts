import { Router } from 'express';

// Users
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import piuRouter from '@modules/pius/infra/http/routes/piu.routes';

const routes = Router();

// Users
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/pius', piuRouter);

export default routes;
