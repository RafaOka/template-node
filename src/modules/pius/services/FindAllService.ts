import { Pius } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import IPiusRepository from '../repositories/IPiusRepository';

@injectable()
export default class FindAllService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute(): Promise<Pius[]> {
    const pius = await this.piusRepository.findAll();

    return pius;
  }
}
