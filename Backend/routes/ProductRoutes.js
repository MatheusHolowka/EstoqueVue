import express from 'express';
import productController from '../controllers/ProductController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, productController.addProduct);
router.get('/', verifyToken, productController.getActiveProducts);
router.get('/:id', verifyToken, productController.getProductById);
router.put('/:id', verifyToken, productController.updateProduct);
router.patch('/:id/inativar', verifyToken, productController.inactivateProduct);
router.patch('/:id/ativar', verifyToken, productController.activateProduct);
router.delete('/:id', verifyToken, productController.deleteProduct);

export default router;
