export default {
  routes: [
    {
      method: 'POST',
      path: '/order-items/:id/increment',
      handler: 'order-item.increment',
      config: {
        auth: false
      }
    },
    {
      method: 'POST',
      path: '/order-items/:id/decrement',
      handler: 'order-item.decrement',
      config: {
        auth: false
      }
    }
  ]
}
