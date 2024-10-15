import Categoria from '../models/Categoria.js';

// Adicionar uma nova categoria
const addCategory = async (req, res) => {
  const { nome } = req.body;

  if (!nome || nome.trim() === '') {
    return res.status(400).json({ message: 'O nome da categoria é obrigatório.' });
  }

  try {
    const categoria = await Categoria.create({ nome });
    res.status(201).json({ 
      message: 'Categoria adicionada com sucesso.', 
      categoriaId: categoria.id 
    });
  } catch (error) {
    console.error('Erro ao adicionar categoria:', error);
    res.status(500).json({ message: 'Erro ao adicionar categoria.' });
  }
};

// Listar todas as categorias
const getCategories = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });

    if (categorias.length === 0) {
      return res.status(404).json({ message: 'Nenhuma categoria encontrada.' });
    }

    res.json(categorias);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ message: 'Erro ao buscar categorias.' });
  }
};

export default { addCategory, getCategories };
