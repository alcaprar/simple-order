/**
 * sale controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::sale.sale', {
    async findOne(ctx) {
        const saleId = ctx.params.id;
        console.log('[controllers][sales][findOne] saleId', saleId)
        const saleEntity = await strapi.db.query('api::sale.sale').findOne({
            where: { id: saleId },
            populate: [
                'product_sales',
                'product_sales.product'
            ]
        })
        console.log('[controllers][sales][findOne] saleEntity', saleEntity)
        return saleEntity;
    },
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
    },
    async addProduct(ctx) {
        let saleId = ctx.params.id;
        const { data } = ctx.request.body;
        const productId = data.productId;

        const productSaleEntity = await strapi.entityService.create('api::product-sale.product-sale', {
            data: {
                product: productId,
                sale: saleId,
                total_available: 0,
                current_available: 0,
                amount_in_minor: 0
            }
        })

        const orders = await strapi.db.query('api::order.order').findMany({
            where: { sale: saleId },
        });

        for (let order of orders) {
            await strapi.entityService.create('api::order-item.order-item', {
                data: {
                    product_sale: productSaleEntity.id,
                    order: order.id,
                    quantity: 0
                }
            })
        }

        return productSaleEntity
    },
})
