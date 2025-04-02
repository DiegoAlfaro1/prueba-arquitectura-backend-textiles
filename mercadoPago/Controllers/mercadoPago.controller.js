const createPreference = require('../../util/createPreference');

const createPreferenceHandler = async (req, res) => {
  try {
    const products = req.body.products;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Productos inválidos' });
    }

    const preference = await createPreference(products);
    res.status(200).json({
      id: preference.id,
      init_point: preference.init_point
    });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({ error: 'Error interno al generar la preferencia' });
  }
};

module.exports = { createPreferenceHandler };
