const express = require('express');
const router = express.Router();
const { createPreferenceHandler } = require('../Controllers/mercadoPago.controller');

/**
 * @swagger
 * /mercadopago/create_preference:
 *   post:
 *     summary: Crea una preferencia de pago con Mercado Pago
 *     tags:
 *       - MercadoPago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 description: Lista de productos a pagar
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Camiseta"
 *                     quantity:
 *                       type: integer
 *                       example: 1
 *                     unit_price:
 *                       type: number
 *                       example: 199.99
 *     responses:
 *       200:
 *         description: Preferencia creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123456789"
 *                 init_point:
 *                   type: string
 *                   example: "https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=..."
 *       400:
 *         description: Productos inválidos
 *       500:
 *         description: Error interno al generar la preferencia
 */
router.post('/create_preference', createPreferenceHandler);

module.exports = router;
