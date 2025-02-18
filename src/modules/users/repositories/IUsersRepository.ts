import { Users } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

interface IUsersRepository {
  findByEmailWithRelations(email: string): Promise<Users | null>;
  findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<Users | null>;
  create(data: ICreateUserDTO): Promise<Users>;
  listen(): Promise<Users[]>;
  findById(id: string): Promise<Users | null>;
  delete(id: string): Promise<Users | null>;
  update(data: IUpdateUserDTO): Promise<Users | null>;
}

export default IUsersRepository;
