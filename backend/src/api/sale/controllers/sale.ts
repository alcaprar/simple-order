/**
 * sale controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::sale.sale', {
    async create(ctx) {
        const { data } = ctx.request.body
        const shopId = data.shop;
        const now = new Date();

        const salesOpenNow = await strapi.db.query('api::sale.sale').findMany({
            where: { shop: shopId, startDate: { $lt: now }, endDate: { $gt: now } },
            limit: 1,
            orderBy: { endDate: 'desc' }
        });
        console.log('[controllers][sales] salesOpenNow', salesOpenNow)
        if (salesOpenNow.length > 0) {
            return ctx.badRequest('There is already another sale open')
        }

        const sale = await strapi.entityService.create('api::sale.sale', {
            data: data
        })

        const clients = await strapi.db.query('api::client.client').findMany({
            where: { shop: shopId },
        });
        console.log('[controllers][sales] clients', clients)

        for (let client of clients) {
            await strapi.entityService.create('api::order.order', {
                data: {
                    sale: sale.id,
                    client: client.id
                }
            })
        }

        return { data: sale }
    }
})
