import { DataTypes } from 'sequelize';
import sequelize from '../conf/db.js';
import Product from './Product.js'; // Modelo de produto

const Movement = sequelize.define('Movement', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo: {
    type: DataTypes.ENUM('entrada', 'saida'),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  motivo: {
    type: DataTypes.STRING,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Movement.belongsTo(Product, { foreignKey: 'produto_id' });

export default Movement;
