import { Pius } from '@prisma/client';
import ICreatePiuDTO from '../dtos/ICreatePiuDTO';

interface IPiusRepository {
  create(data: ICreatePiuDTO): Promise<Pius>;
  findAll(): Promise<Pius[]>;
  findById(id: string): Promise<Pius | null>;
  delete(id: string): Promise<Pius | null>;
  like(id: string, userId: string): Promise<Pius | null>;
}

export default IPiusRepository;
