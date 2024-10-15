import { DataTypes } from 'sequelize';
import sequelize from '../conf/db.js';

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  timestamps: false, // Desativa as colunas createdAt e updatedAt
});

export default Categoria;
