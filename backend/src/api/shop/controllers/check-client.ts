export default {
  async checkClient(ctx, next) {
    console.log("checkClient", ctx.params);
    const shopEntity = await strapi.db
      .query("api::shop.shop")
      .findOne({ where: { slug: ctx.params.shop } });
    console.log("shopEntity", shopEntity);

    if (!shopEntity) {
      return ctx.badRequest("Shop not found", { shop: ctx.params.shop });
    }

    const clientEntity = await strapi.db
      .query("api::client.client")
      .findOne({ where: { shop: shopEntity.id, username: ctx.params.client } });
    console.log("clientEntity", clientEntity);

    if (!clientEntity) {
      return ctx.badRequest("Client not found", { client: ctx.params.client });
    }

    return {
      
    }
  },
};
