import { pino, type Logger } from "pino";
import { Ok, Err, Result } from 'ts-results';

export default defineNuxtPlugin((nuxtApp) => {
  const backend = new ApiClient(nuxtApp.$config.public.api.base_url);
  return {
    provide: {
      backend
    },
  };
});

const logger = pino({
  level: 'debug',
});
const SHOP_ID = "1" // hack because for the time being there will be just one shop

class ApiClient {
  baseUrl: string
  products: ProductsClient

  constructor(
    baseUrl: string,
  ) {
    this.baseUrl = `${baseUrl}/api`
    this.products = new ProductsClient(this.baseUrl)
  }

  getBaseUrl(): string {
    return this.baseUrl
  }
}

class ProductsClient {
  baseUrl: string

  constructor(
    baseUrl: string,
  ) {
    this.baseUrl = baseUrl
  }

  async getAll(): Promise<Result<ProductDto[], ApiErrorVariant>> {
    const url = `${this.baseUrl}/shops/${SHOP_ID}/products`;
    try {
      let response = await fetch(url);
      if (response.status == 404) {
        return Err(ApiErrorVariant.NotFound)
      }
      let result: ProductDto[] = await response.json();
      logger.debug("[ApiClient][Products] response", result);
      return Ok(result)
    } catch (error) {
      return Err(ApiErrorVariant.Generic)
    }
  }
}