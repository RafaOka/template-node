import CreatePiuService from '@modules/pius/services/CreatePiuService';
import DeletePiuService from '@modules/pius/services/DeletePiuService';
import FindAllService from '@modules/pius/services/FindAllService';
import FindPiuService from '@modules/pius/services/FindPiuService';
import LikeUnlikePiuService from '@modules/pius/services/LikeUnlikePiuService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PiuController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { text } = req.body;
    const { id: user_id } = req.user;

    const createPiu = container.resolve(CreatePiuService);

    const piu = await createPiu.execute({
      user_id,
      text,
    });

    return res.json(piu);
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const findAllPiu = container.resolve(FindAllService);

    const pius = await findAllPiu.execute();

    return res.json(pius);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findAllPiu = container.resolve(FindPiuService);

    const pius = await findAllPiu.execute(id);

    return res.json(pius);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { id: user_id } = req.user;
    const deletePiu = container.resolve(DeletePiuService);

    const pius = await deletePiu.execute(id, user_id);

    return res.json(pius);
  }

  public async like(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const { id: userId } = req.user;

    const likePiu = container.resolve(LikeUnlikePiuService);

    const piu = await likePiu.execute(
      id,
      userId,
    );

    return res.json(piu);
  }
}
