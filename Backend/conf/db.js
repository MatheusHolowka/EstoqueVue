import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('estoque', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00', // Fuso horário de Brasília (GMT-3)
  dialectOptions: {
    timezone: 'local', // Garante que o MySQL use o horário local
  },
});

export default sequelize;