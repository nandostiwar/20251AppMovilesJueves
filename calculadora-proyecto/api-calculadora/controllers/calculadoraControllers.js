const { add, subtract, multiply, divide } = require('../operaciones/operaciones.js');
const Operacion = require('../operaciones/OperacionModel');

async function guardarOperacion({ number1, number2, operacion, resultado }) {
  try {
    const nuevaOperacion = new Operacion({ number1, number2, operacion, resultado });
    await nuevaOperacion.save();
  } catch (error) {
    console.error('❌ Error al guardar la operación:', error);
  }
}

function sumar(req, res) {
  const { number1, number2 } = req.body;
  const result = add(number1, number2);
  guardarOperacion({ number1, number2, operacion: 'sumar', resultado: result });
  res.json({ resultado: result });
}

function restar(req, res) {
  const { number1, number2 } = req.body;
  const result = subtract(number1, number2);
  guardarOperacion({ number1, number2, operacion: 'restar', resultado: result });
  res.json({ resultado: result });
}

function multiplicar(req, res) {
  const { number1, number2 } = req.body;
  const result = multiply(number1, number2);
  guardarOperacion({ number1, number2, operacion: 'multiplicar', resultado: result });
  res.json({ resultado: result });
}

function dividir(req, res) {
  const { number1, number2 } = req.body;
  const result = divide(number1, number2);
  guardarOperacion({ number1, number2, operacion: 'dividir', resultado: result });
  res.json({ resultado: result });
}

module.exports = { sumar, restar, multiplicar, dividir };