import { Pius } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  user_id: string;
  text: string;
}

@injectable()
export default class CreatePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ text, user_id }: IRequest): Promise<Pius> {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuario invalido', 404);
    }

    const piu = await this.piusRepository.create({
      user_id,
      text,
    });

    return piu;
  }
}
