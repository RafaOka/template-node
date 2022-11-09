import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListenUserService from '@modules/users/services/ListenUserService';
// import { FindOperator } from 'typeorm';
import FindUserService from '@modules/users/services/FindUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      cpf,
      phone,
      password,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      cpf,
      phone,
      password,
    });

    user.password = '###';

    return res.status(201).json(user);
  }

  public async listen(req: Request, res: Response): Promise<Response> {
    const listenUsers = container.resolve(ListenUserService);

    const users = await listenUsers.execute();

    return res.status(200).json(users);
  }

  public async search(req: Request, res: Response): Promise<Response> {
    const searchUser = container.resolve(FindUserService);
    const { id } = req.params;

    const user = await searchUser.execute(id);

    return res.status(200).json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUser = container.resolve(DeleteUserService);
    const user = await deleteUser.execute(id);

    return res.status(200).json(user);
  }
}
