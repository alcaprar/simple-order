export default {
    routes: [
      {
        method: 'POST',
        path: '/sales/:id/products',
        handler: 'sale.addProduct',
        config: {
          auth: false
        }
      },
    ]
}