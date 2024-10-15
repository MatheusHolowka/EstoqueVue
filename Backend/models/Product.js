import { DataTypes } from 'sequelize';
import sequelize from '../conf/db.js';
import Category from './Categoria.js'; // Modelo da categoria

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  preco_custo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  preco_venda: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantidade_estoque: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  estoque_minimo: {
    type: DataTypes.INTEGER,
  },
  estoque_maximo: {
    type: DataTypes.INTEGER,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Product.belongsTo(Category, { foreignKey: 'categoria_id' });

export default Product;
