import Movement from '../models/Movement.js';
import Product from '../models/Product.js';

// Registrar entrada de produto
const addEntry = async (req, res) => {
  const { produto_id, quantidade, usuario_id, motivo } = req.body;

  if (!produto_id || !quantidade || !usuario_id) {
    return res.status(400).json({ message: 'Campos obrigatórios não foram preenchidos.' });
  }

  try {
    await Movement.create({
      produto_id,
      tipo: 'entrada',
      quantidade,
      usuario_id,
      motivo,
    });

    const product = await Product.findByPk(produto_id);
    product.quantidade_estoque += quantidade;
    await product.save();

    res.json({ message: 'Entrada registrada e estoque atualizado.' });
  } catch (error) {
    console.error('Erro ao registrar entrada:', error);
    res.status(500).json({ message: 'Erro ao registrar entrada.' });
  }
};

// Registrar saída de produto
const addExit = async (req, res) => {
  const { produto_id, quantidade, usuario_id, motivo } = req.body;

  if (!produto_id || !quantidade || !usuario_id) {
    return res.status(400).json({ message: 'Campos obrigatórios não foram preenchidos.' });
  }

  try {
    await Movement.create({
      produto_id,
      tipo: 'saida',
      quantidade,
      usuario_id,
      motivo,
    });

    const product = await Product.findByPk(produto_id);
    if (product.quantidade_estoque < quantidade) {
      return res.status(400).json({ message: 'Estoque insuficiente.' });
    }

    product.quantidade_estoque -= quantidade;
    await product.save();

    res.json({ message: 'Saída registrada e estoque atualizado.' });
  } catch (error) {
    console.error('Erro ao registrar saída:', error);
    res.status(500).json({ message: 'Erro ao registrar saída.' });
  }
};

// Listar todas as movimentações
const getMovements = async (req, res) => {
  try {
    const movements = await Movement.findAll({
      include: [{ model: Product, attributes: ['nome'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(movements);
  } catch (error) {
    console.error('Erro ao buscar movimentações:', error);
    res.status(500).json({ message: 'Erro ao buscar movimentações.' });
  }
};

export default { addEntry, addExit, getMovements };
