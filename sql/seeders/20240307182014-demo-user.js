'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          firstName: 'RUTAYISIRE',
          lastName: 'Gerard',
          email: 'gerard@gmail.com',
          password: await bcrypt.hash('Maxking1001', 10),
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          firstName: 'MANZI',
          lastName: 'Valentin',
          email: 'valentin@gmail.com',
          password: await bcrypt.hash('Maxking1001', 10),
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          firstName: 'UWASE',
          lastName: 'Anastasie',
          email: 'anastasie@gmail.com',
          password: await bcrypt.hash('Maxking1001', 10),
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          firstName: 'NIYIKIZA',
          lastName: 'Baptiste',
          email: 'baptiste@gmail.com',
          password: await bcrypt.hash('Maxking1001', 10),
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          firstName: 'ISHEJA',
          lastName: 'Irene',
          email: 'irene@gmail.com',
          password: await bcrypt.hash('Maxking1001', 10),
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
