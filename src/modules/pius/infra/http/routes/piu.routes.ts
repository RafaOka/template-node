import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import validateRequestSchema from '@shared/infra/http/middlewares/validateRequestSchema';
import { Router } from 'express';
import { body } from 'express-validator';
import PiuController from '../controllers/PiuController';

const piuRouter = Router();
const piuController = new PiuController();

piuRouter.use(ensureAuthenticated);

piuRouter.post('/',
  body('text').isString().isLength({ min: 1 }).withMessage('Texto vazio')
    .isLength({ max: 140 })
    .withMessage('Não é permitido enviar textos com mais de 140 caracteres'),
  validateRequestSchema,
  piuController.create);

piuRouter.get('/', piuController.findAll);

piuRouter.get('/:id', piuController.findById);

piuRouter.delete('/:id', piuController.delete);

piuRouter.post('/like', piuController.like);

export default piuRouter;
