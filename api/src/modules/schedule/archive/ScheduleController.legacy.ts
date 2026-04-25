import { Request, Response } from 'express'

import { classToClass } from 'class-transformer'

import { container } from 'tsyringe'
import CreateSheduleService from '@modules/schedule/services/CreateScheduleService'
import IndexSheduleService from '@modules/schedule/services/IndexScheduleService'
import ShowScheduleService from '@modules/schedule/services/ShowScheduleService'
import DeleteScheduleService from '@modules/schedule/services/DeleteScheduleService'

export default class ScheduleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const createService = container.resolve(CreateSheduleService)

    const schedule = await createService.execute(data)

    return response.json(classToClass(schedule))
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 999999 } = request.query

    const index = container.resolve(IndexSheduleService)

    const schedules = await index.execute({
      page: Number(page),
      limit: Number(limit),
    })

    return response.json(classToClass(schedules))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { scheduleId } = request.params

    const show = container.resolve(ShowScheduleService)

    const schedule = await show.execute(scheduleId)

    return response.json(classToClass(schedule))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { scheduleId } = request.params

    const deleteProvider = container.resolve(DeleteScheduleService)

    await deleteProvider.execute(scheduleId)

    return response.status(204).send()
  }
}
