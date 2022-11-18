import { Pius } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPiusRepository from '../repositories/IPiusRepository';

@injectable()
export default class DeletePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute(id: string, user_id: string): Promise<Pius | null> {
    const check = await this.piusRepository.findById(id);
    if (await check == null) throw new AppError('Usuario não encontrado');

    const piu = await this.piusRepository.delete(id);

    if (!piu) {
      throw new AppError('Texto não encontrado');
    }

    if (piu.user_id !== user_id) {
      throw new AppError('Apenas é possivel deletar o seu Piu');
    }

    return piu;
  }
}
