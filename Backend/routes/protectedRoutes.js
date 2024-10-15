import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// Rota protegida de exemplo
router.get('/test', verifyToken, (req, res) => {
  res.json({
    message: 'Acesso à rota protegida foi bem-sucedido!',
    user: req.user // Dados do usuário decodificados do token
  });
});

export default router;
