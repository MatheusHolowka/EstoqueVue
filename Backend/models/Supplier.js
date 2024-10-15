import { DataTypes } from 'sequelize';
import sequelize from '../conf/db.js';

const Supplier = sequelize.define('Supplier', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  contato: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  endereco: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
});

export default Supplier;
