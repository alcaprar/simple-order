/**
 * order controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::order.order', {
  async findOne(ctx) {
    const orderId = ctx.params.id;
    console.log('[controllers][orders][findOne] saleId', orderId)
    const orderEntity = await strapi.db.query('api::order.order').findOne({
      where: { id: orderId },
      populate: [
        'sale',
        'order_items',
        'order_items.product_sale',
        'order_items.product_sale.product',
        'client'
      ]
    })
    console.log('[controllers][orders][findOne] orderEntity', orderEntity)
    return orderEntity;
  },
  async updateNotes(ctx, next) {
    console.log('updateNotes', ctx.params, ctx.request.body)
    let order_id = ctx.params.id
    if (!order_id) {
      return ctx.badRequest('Missing or invalid id', { order_id })
    }
    let notes = JSON.parse(ctx.request.body).notes || ''

    let order = await strapi.entityService.update('api::order.order', order_id, {
      data: {
        notes
      }
    })

    return order
  }
})
