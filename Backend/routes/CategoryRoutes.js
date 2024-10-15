import express from 'express';
import categoryController from '../controllers/CategoryController.js';
import verifyToken from '../middlewares/verifyToken.js'; // Middleware de autenticação JWT, se necessário

const router = express.Router();

// Rota para adicionar uma nova categoria (protegida)
router.post('/', verifyToken, categoryController.addCategory);

// Rota para listar todas as categorias (protegida)
router.get('/', verifyToken, categoryController.getCategories);

export default router;
