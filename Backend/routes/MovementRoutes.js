import express from 'express';
import movementController from '../controllers/MovementController.js';
import verifyToken from '../middlewares/verifyToken.js'; // Middleware JWT

const router = express.Router();

// Rota para registrar entrada de produto (protegida)
router.post('/entrada', verifyToken, movementController.addEntry);

// Rota para registrar saída de produto (protegida)
router.post('/saida', verifyToken, movementController.addExit);

// Rota para listar todas as movimentações (protegida)
router.get('/', verifyToken, movementController.getMovements);

export default router;
