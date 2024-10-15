import express from 'express';
import supplierController from '../controllers/SupplierController.js';
import verifyToken from '../middlewares/verifyToken.js'; // Middleware para autenticação JWT

const router = express.Router();

// Rota para criar um fornecedor (protegida)
router.post('/', verifyToken, supplierController.addSupplier);

// Rota para listar todos os fornecedores (protegida)
router.get('/', verifyToken, supplierController.getSuppliers);

// Rota para atualizar um fornecedor (protegida)
router.put('/:id', verifyToken, supplierController.updateSupplier);

// Rota para remover um fornecedor (protegida)
router.delete('/:id', verifyToken, supplierController.deleteSupplier);

export default router;
