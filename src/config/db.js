import { Sequelize } from 'sequelize'

export const connection = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '123456789',
  port: '3306',
  database: 'mysqldb'
})
