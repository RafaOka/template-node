import { Pius } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import IPiusRepository from '../repositories/IPiusRepository';

@injectable()
export default class LikeUnlikePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute(id: string, userId: string): Promise<Pius | null> {
    const piu = await this.piusRepository.like(id, userId);

    return piu;
  }
}
