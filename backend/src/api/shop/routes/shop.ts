/**
 * shop router
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreRouter('api::shop.shop', {
  config: {
    find: {
      auth: false
    },
    findOne: {
      auth: false
    }
  }
})
