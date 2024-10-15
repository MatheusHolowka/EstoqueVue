import Supplier from '../models/Supplier.js';

// Criar fornecedor
const addSupplier = async (req, res) => {
  const { nome, contato, endereco } = req.body;

  if (!nome) {
    return res.status(400).json({ message: 'Nome do fornecedor é obrigatório' });
  }

  try {
    const supplier = await Supplier.create({ nome, contato, endereco });
    res.status(201).json({ message: 'Fornecedor cadastrado com sucesso', supplier });
  } catch (error) {
    console.error('Erro ao cadastrar fornecedor:', error);
    res.status(500).json({ message: 'Erro ao cadastrar fornecedor' });
  }
};

// Listar fornecedores
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (error) {
    console.error('Erro ao buscar fornecedores:', error);
    res.status(500).json({ message: 'Erro ao buscar fornecedores' });
  }
};

// Atualizar fornecedor
const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { nome, contato, endereco } = req.body;

  try {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
    await supplier.update({ nome, contato, endereco });
    res.json({ message: 'Fornecedor atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar fornecedor:', error);
    res.status(500).json({ message: 'Erro ao atualizar fornecedor' });
  }
};

// Remover fornecedor
const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
    await supplier.destroy();
    res.json({ message: 'Fornecedor removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover fornecedor:', error);
    res.status(500).json({ message: 'Erro ao remover fornecedor' });
  }
};

export default { addSupplier, getSuppliers, updateSupplier, deleteSupplier };
