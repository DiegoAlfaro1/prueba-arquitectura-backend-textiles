const { MercadoPagoConfig } = require('mercadopago');

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

module.exports = mercadopago;
