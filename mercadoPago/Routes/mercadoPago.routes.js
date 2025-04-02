const express = require('express');
const router = express.Router();
const { createPreferenceHandler } = require('../Controllers/mercadoPago.controller');

router.post('/create_preference', createPreferenceHandler);

module.exports = router;
