export default {
  routes: [
    {
      method: "POST",
      path: "/order-items/:id/increment",
      handler: "order-item.increment",
      config: {
        auth: false,
      },
    },
  ],
};
