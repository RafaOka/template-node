import { inject, injectable } from 'tsyringe';
// import path from 'path';

import { Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({
    id, cpf, email, name, phone,
  }: IRequest): Promise<Users | null> {
    const check = this.usersRepository.findById(id);

    if (await check == null) throw new AppError('Usuario não encontrado');

    if (cpf === '' || email === '' || name === '' || phone === '') {
      throw new AppError('Alguma informação vazia');
    }

    const user = this.usersRepository.update({
      id,
      name,
      email: email.toLowerCase(),
      cpf,
      phone,
    });

    return user;
  }
}
