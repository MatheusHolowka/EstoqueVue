import Product from '../models/Product.js';
import Category from '../models/Categoria.js';

// Criar um novo produto
const addProduct = async (req, res) => {
  const { nome, descricao, preco_custo, preco_venda, quantidade_estoque, categoria_id } = req.body;

  try {
    const product = await Product.create({
      nome,
      descricao,
      preco_custo,
      preco_venda,
      quantidade_estoque,
      categoria_id,
    });
    res.status(201).json({ message: 'Produto adicionado com sucesso', product });
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    res.status(500).json({ message: 'Erro ao adicionar produto' });
  }
};

// Listar todos os produtos (ativos e inativos) com categorias
const getActiveProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, attributes: ['nome'] }],
    });
    res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
};

// Obter um produto específico por ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [{ model: Category, attributes: ['nome'] }],
    });
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ message: 'Erro ao buscar produto' });
  }
};

// Atualizar um produto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco_custo, preco_venda, categoria_id } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    await product.update({ nome, descricao, preco_custo, preco_venda, categoria_id });
    res.json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro ao atualizar produto' });
  }
};

// Inativar um produto
const inactivateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    await product.update({ ativo: false });
    res.json({ message: 'Produto inativado com sucesso' });
  } catch (error) {
    console.error('Erro ao inativar produto:', error);
    res.status(500).json({ message: 'Erro ao inativar produto' });
  }
};

// Ativar um produto
const activateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    await product.update({ ativo: true });
    res.json({ message: 'Produto ativado com sucesso' });
  } catch (error) {
    console.error('Erro ao ativar produto:', error);
    res.status(500).json({ message: 'Erro ao ativar produto' });
  }
};

// Remover um produto
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    await product.destroy();
    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover produto:', error);
    res.status(500).json({ message: 'Erro ao remover produto' });
  }
};

export default {
  addProduct,
  getActiveProducts,
  getProductById,
  updateProduct,
  inactivateProduct,
  activateProduct,
  deleteProduct,
};
