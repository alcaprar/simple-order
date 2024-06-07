/**
 * sale router
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreRouter('api::sale.sale', {
  config: {
    create: {
      auth: false
    },
    findOne: {
      auth: false
    },
    update: {
      auth: false
    }
  }
})
