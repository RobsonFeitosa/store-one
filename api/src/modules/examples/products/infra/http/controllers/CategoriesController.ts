import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateCategoryService from '@modules/products/services/CreateCategoryService'
import UpdateCategoryService from '@modules/products/services/UpdateCategoryService'
import DeleteCategoryService from '@modules/products/services/DeleteCategoryService'
import IndexCategoryService from '@modules/products/services/IndexCategoryService'

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const createCategory = container.resolve(CreateCategoryService)

    const category = await createCategory.execute(data)

    return response.json(category)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body
    const { id } = request.params

    const updateCategory = container.resolve(UpdateCategoryService)

    const categoryCreated = await updateCategory.execute({
      category_id: id,
      ...data,
    })

    return response.json(categoryCreated)
  }

  public async delete(request: Request, response: Response): Promise<any> {
    const { id } = request.params

    const deleteCategory = container.resolve(DeleteCategoryService)

    await deleteCategory.execute(id)

    return response.status(204).send()
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 99999 } = request.query
    const { type } = request.query

    const indexCategory = container.resolve(IndexCategoryService)

    const category = await indexCategory.execute(
      {
        page: Number(page),
        limit: Number(limit),
      },
      type ? String(type) : '',
    )

    return response.json(category)
  }
}
