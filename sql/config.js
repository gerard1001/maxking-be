const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    url: process.env.DEV_DB_URL,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
  },
  test: {
    url: process.env.TEST_DB_URL,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  },
  production: {
    url: process.env.PROD_DB_URL,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
