import { inject, injectable } from 'tsyringe';
import path from 'path';

import { Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({
    cpf, email, name, password, phone,
  }: IRequest): Promise<Omit<Users, 'password'>> {
    const userAlreadyExists = await this.usersRepository.findByEmailPhoneOrCpf(email, phone, cpf);

    if (userAlreadyExists) throw new AppError('User with same name, phone or cpf already exists');

    if (cpf === '' || email === '' || name === '' || password === '' || phone === '') {
      throw new AppError('Alguma informação vazia');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const { password: _, ...userWithoutPassword } = await this.usersRepository.create({
      name,
      email: email.toLowerCase(),
      cpf,
      password: hashedPassword,
      phone,
    });

    const templateDataFile = path.resolve(__dirname, '..', 'views', 'create_account.hbs');

    await this.mailProvider.sendMail({
      to: {
        name,
        email,
      },
      subject: 'Criação de conta',
      templateData: {
        file: templateDataFile,
        variables: { name },
      },
    });

    return userWithoutPassword;
  }
}
