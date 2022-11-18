import { inject, injectable } from 'tsyringe';

import { Users } from '@prisma/client';

// import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ListenUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute(): Promise<Omit<Users, 'password'>[]> {
    const usersWithoutPassword = (await this.usersRepository.listen()).map(({ password: _, ...userWithoutPassword }) => userWithoutPassword);

    return usersWithoutPassword;
  }
}
