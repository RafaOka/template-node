import { Pius } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPiusRepository from '../repositories/IPiusRepository';

@injectable()
export default class FindPiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute(id: string): Promise<Pius> {
    const piu = await this.piusRepository.findById(id);

    if (!piu) {
      throw new AppError('Usuario não encontrado');
    }

    return piu;
  }
}
