/**
 * sale controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::sale.sale', {
    async create(ctx) {
        const { data } = ctx.request.body

        const response = await strapi.entityService.create('api::sale.sale', {
            data: data
        })

        return { data: response }
    }
})
