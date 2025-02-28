let pedidos = [];

const getPedidos = (req, res) => {
  res.json(pedidos);
};

const addPedido = (req, res) => {
  const { descripcion } = req.body;
  if (!descripcion) {
    return res.status(400).json({ error: 'La descripción es requerida' });
  }
  pedidos.push(descripcion);
  res.status(201).json({ message: 'Pedido agregado', pedidos });
};

module.exports = { getPedidos, addPedido };