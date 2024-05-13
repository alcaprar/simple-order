export default {
  routes: [
    {
      method: "GET",
      path: "/shops/:shop/:client",
      handler: "check-client.checkClient",
    },
  ],
};
