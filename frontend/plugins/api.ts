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
const SHOP_ID = 1 // hack because for the time being there will be just one shop

class ApiClient {
  baseUrl: string
  products: ProductsClient
  sales: SalesClient

  constructor(
    baseUrl: string,
  ) {
    this.baseUrl = `${baseUrl}/api`
    this.products = new ProductsClient(this.baseUrl)
    this.sales = new SalesClient(this.baseUrl)
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
      logger.debug("[ApiClient][Products] result", result);
      return Ok(result)
    } catch (error) {
      return Err(ApiErrorVariant.Generic)
    }
  }
}


class SalesClient {
  baseUrl: string

  constructor(
    baseUrl: string,
  ) {
    this.baseUrl = baseUrl
  }

  async create(sale: SaleDto): Promise<Result<number, ApiErrorVariant>> {
    logger.debug("[ApiClient][Sales][create] sale", sale)
    const url = `${this.baseUrl}/sales`;
    try {
      let body = JSON.stringify({
        data: {
          startDate: sale.startDate,
          endDate: sale.endDate,
          shop: SHOP_ID,
        },
      });
      logger.debug("[ApiClient][Sales][create] body", body)
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body
      });
      if (response.status == 404) {
        return Err(ApiErrorVariant.NotFound)
      }
      logger.debug("[ApiClient][Sales][create] response", response)
      let result: SaleDto = (await response.json()).data;
      logger.debug("[ApiClient][Sales][create] result", result);
      return Ok(result.id)
    } catch (error) {
      logger.error("[ApiClient][Sales][create] Error", error)
      return Err(ApiErrorVariant.Generic)
    }
  }
}

