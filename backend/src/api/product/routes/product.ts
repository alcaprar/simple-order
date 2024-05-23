/**
 * product router
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreRouter('api::product.product', {
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
