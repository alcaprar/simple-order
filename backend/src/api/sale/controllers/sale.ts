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
    },
    async upsertProduct(ctx) {
        let saleId = ctx.params.id;
        const { data } = ctx.request.body;
        const productId = data.productId;
        const newAvailable_quantity = data.available_quantity;
        const amount_in_minor = data.amount_in_minor;

        let productSaleEntity = await strapi.db.query('api::product_sale.product_sale').findOne({
            where: { sale: saleId, product: productId }
        });
        console.log('[controllers][sale][upsertProduct] productSaleEntity', productSaleEntity);

        if (productSaleEntity != null) {
            // If the product was already added to the order we need to check what changes are being done.
            // If only the price is changed it's ok, we just change it and all orders will be updated.
            // If the available_quantity is changed, we need to check:
            // 1. If the available_quantity is more than what was already stored there are no problems, we are adding more stocks.
            // 2. If the  available_quantity is less than what was already stored we need to check that we can fullfill all orders already ordered.
            const delta = productSaleEntity.total_available - newAvailable_quantity;
            if (newAvailable_quantity < productSaleEntity.total_available && (delta) < productSaleEntity.current_available) {
                return ctx.badRequest('The product will get to a negative available_quantity')
            }

            await strapi.entityService.update('api::product-sale.product-sale', productSaleEntity.id, {
                data: {
                    total_available: newAvailable_quantity,
                    current_available: productSaleEntity.current_available - delta,
                    amount_in_minor
                }
            })
        } else {
            // If the product is being added for the first time to the sale:
            // 1. Create the ProductSale item
            // 2. Add it to all the orders of this sale, defaulting to 0 quantity
            const productSaleEntity = await strapi.entityService.create('api::product-sale.product-sale', {
                data: {
                    product: productId,
                    sale: saleId,
                    total_available: newAvailable_quantity,
                    current_available: newAvailable_quantity,
                    amount_in_minor
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
        }
    }
})
