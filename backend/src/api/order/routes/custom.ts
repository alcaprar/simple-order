export default {
  routes: [
    {
      method: "POST",
      path: "/orders/:id/notes",
      handler: "order.updateNotes",
      config: {
        auth: false,
      },
    }
  ],
};
