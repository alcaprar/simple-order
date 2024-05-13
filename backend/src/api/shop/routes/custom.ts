export default {
  routes: [
    {
      method: "GET",
      path: "/shops/:shop/:client",
      handler: "shop.checkClient",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/shops/:shop/:client/last-order",
      handler: "shop.lastOrder",
      config: {
        auth: false,
      },
    },
  ],
};
