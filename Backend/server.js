import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Middleware CORS
import sequelize from './conf/db.js'; // Importando a instância do Sequelize

// Importação das rotas
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/ProductRoutes.js';
import movementRoutes from './routes/MovementRoutes.js';
import supplierRoutes from './routes/SupplierRoutes.js';
import categoryRoutes from './routes/CategoryRoutes.js'; // Rotas de categorias

dotenv.config();

const app = express();
app.use(express.json());

// Configuração do CORS
app.use(
  cors({
    origin: 'http://localhost:8080', // Permitir requisições apenas do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Incluindo PATCH
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
  })
);

// Rotas de autenticação (registro e login)
app.use('/auth', authRoutes);

// Rotas de produtos (CRUD)
app.use('/produtos', productRoutes);

// Rotas de movimentações de estoque (entradas e saídas)
app.use('/movimentacoes', movementRoutes);

// Rotas de fornecedores (CRUD)
app.use('/fornecedores', supplierRoutes);

// Rotas de categorias (CRUD)
app.use('/categorias', categoryRoutes);

// Rota raiz para verificar se o servidor está rodando
app.get('/', (req, res) => {
  res.json({ message: 'Servidor rodando com sucesso!' });
});

// Sincronizando o banco de dados e iniciando o servidor
const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: true }) // Alteração automática das tabelas, se necessário
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar banco de dados:', error);
  });
