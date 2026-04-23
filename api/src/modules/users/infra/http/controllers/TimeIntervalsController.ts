import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateTimeIntervalsService from '@modules/users/services/CreateTimeIntervalsService'
import IndexTimeIntervalsService from '@modules/users/services/IndexTimeIntervalsService'
import UpdateTimeIntervalService from '@modules/users/services/UpdateTimeIntervalService'
import ShowTimeIntervalService from '@modules/users/services/ShowTimeIntervalService'
import DeleteTimeIntervalsService from '@modules/users/services/DeleteTimeIntervalsService'
import { classToClass } from 'class-transformer'
import ShowBlockedDatesService from '@modules/users/services/ShowBlockedDatesService'
import ShowAvailableTimeProfessionalsService from '@modules/users/services/ShowAvailableTimeProfessionalsService'

export default class TimeIntervalsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createService = container.resolve(CreateTimeIntervalsService)

    const timeIntervals = await createService.execute(req.body)

    return res.json(classToClass(timeIntervals))
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { timeIntervalId } = req.params

    const showService = container.resolve(ShowTimeIntervalService)

    const timeInterval = await showService.execute(timeIntervalId)

    return res.json(classToClass(timeInterval))
  }

  public async showBlockedDates(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { professionalId } = req.params
    const { year, month } = req.query

    const showService = container.resolve(ShowBlockedDatesService)

    const timeInterval = await showService.execute(
      professionalId,
      String(year),
      String(month),
    )

    return res.json(classToClass(timeInterval))
  }

  public async showAvailablesProfessionalsDates(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { professionalId } = req.params
    const { date } = req.query

    const showService = container.resolve(ShowAvailableTimeProfessionalsService)

    const timeInterval = await showService.execute(professionalId, String(date))

    return res.json(classToClass(timeInterval))
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 999999 } = request.query

    const indexService = container.resolve(IndexTimeIntervalsService)

    const timeIntervals = await indexService.execute({
      page: Number(page),
      limit: Number(limit),
    })

    return response.json(classToClass(timeIntervals))
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { professionalId } = req.params
    const data = req.body

    const updateService = container.resolve(UpdateTimeIntervalService)

    const update = await updateService.execute(data, professionalId)

    return res.json(classToClass(update))
  }

  public async delete(request: Request, response: Response): Promise<any> {
    const { timeIntervalId } = request.params

    const deleteService = container.resolve(DeleteTimeIntervalsService)

    await deleteService.execute(timeIntervalId)

    return response.status(204).send()
  }
}
