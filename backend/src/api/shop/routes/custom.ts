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
  ],
};

