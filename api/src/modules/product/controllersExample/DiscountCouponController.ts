import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateCouponService from '@modules/products/services/CreateCouponService'
import DeleteCategoryService from '@modules/products/services/DeleteCategoryService'
import IndexCouponService from '@modules/products/services/IndexCouponService'
import UpdateStatusCouponService from '@modules/products/services/UpdateStatusCouponService'
import ShowCouponService from '@modules/products/services/ShowCouponService'

export default class DiscountCouponController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCoupon = container.resolve(CreateCouponService)

    const coupon = await createCoupon.execute(request.body)

    return response.json(coupon)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCategory = container.resolve(UpdateStatusCouponService)

    const coupon = await updateCategory.execute(request.body)

    return response.json(coupon)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { code } = request.params

    const showCoupon = container.resolve(ShowCouponService)

    const coupon = await showCoupon.execute({ code })

    return response.json(coupon)
  }

  public async delete(request: Request, response: Response): Promise<any> {
    const { id } = request.params

    const deleteCategory = container.resolve(DeleteCategoryService)

    await deleteCategory.execute(id)

    return response.status(204).send()
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexCoupons = container.resolve(IndexCouponService)

    const coupons = await indexCoupons.execute()

    return response.json(coupons)
  }
}
