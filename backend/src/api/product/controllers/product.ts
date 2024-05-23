/**
 * product controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product.product', {
  async create(ctx) {
    const { data } = ctx.request.body

    const response = await strapi.entityService.create('api::product.product', {
      data: data
    })

    return { response }
  }
})
