/**
 * sale controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::sale.sale', {
  async findOne(ctx, next) {
    const saleId = ctx.params.id

    const saleEntity = await strapi.db.query('api::sale.sale').findOne({
      where: { id: saleId },
      populate: ['product_sales', 'product_sales.product']
    })
    console.log('saleEntity', saleEntity)

    return saleEntity
  }
})
