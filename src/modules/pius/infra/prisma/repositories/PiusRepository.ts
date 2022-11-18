import ICreatePiuDTO from '@modules/pius/dtos/ICreatePiuDTO';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import { Pius } from '@prisma/client';
import client from '@shared/infra/prisma/client';

export default class PiusRepository implements IPiusRepository {
  private ormRepository;

  private likes;

  constructor() {
    this.ormRepository = client.pius;
    this.likes = client.piuUsers;
  }

  public async create({ user_id, text }: ICreatePiuDTO): Promise<Pius> {
    const piu = await this.ormRepository.create({
      data: {
        user_id,
        text,
      },
    });

    return piu;
  }

  public async findAll(): Promise<Pius[]> {
    const pius = await this.ormRepository.findMany({
      include: {
        likes: true,
      },
    });

    return pius;
  }

  public async findById(id: string): Promise<Pius | null> {
    const piu = await this.ormRepository.findFirst({
      where: { id },
    });

    return piu;
  }

  public async delete(id: string): Promise<Pius | null> {
    const piu = await this.ormRepository.delete({
      where: { id },
    });

    return piu;
  }

  public async like(id: string, userId: string): Promise<Pius | null> {
    const check = await this.likes.findFirst({
      where: { idsUsers: userId },
    });

    if (check) {
      await this.likes.delete({
        where: { id: check.id },
      });
    } else {
      await this.likes.create({
        data: {
          idPiu: id,
          idsUsers: userId,
        },
      });
    }

    const piu = await this.ormRepository.findFirst({
      where: { id },
      include: {
        likes: true,
      },
    });

    return piu;
  }
}
