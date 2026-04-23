import { injectable, inject } from 'tsyringe'

import ICommentRepository from '../repositories/ICommentRepository'
import AppError from '@shared/errors/AppError'
import ITeamRepository from '../repositories/ITeamRepository'

@injectable()
class DeleteTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
  ) {}

  public async execute(teamId: string): Promise<void> {
    const result = await this.teamRepository.findById(teamId)

    if (!result) throw new AppError('Team not found', 404)

    await this.teamRepository.delete(result.id)
  }
}

export default DeleteTeamService
