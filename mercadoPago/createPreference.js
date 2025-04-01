const mercadopago = require('../util/configMercadoPago');
const { Preference } = require('mercadopago');

const createPreference = async (products) => {
  const items = products.map(product => ({
    title: product.title,
    quantity: product.quantity,
    unit_price: product.unit_price,
    currency_id: 'MXN',
  }));

  const preference = {
    items,
    back_urls: {
      success: 'http://localhost:4000/exito',
      failure: 'http://localhost:4000/fallo',
      pending: 'http://localhost:4000/pendiente',
    },
    auto_return: 'approved',
  };

  const preferenceClient = new Preference(mercadopago);
  const response = await preferenceClient.create({ body: preference });

  return response;
};

module.exports = createPreference;
