'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          type: 'SUPER_ADMIN',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          type: 'ADMIN',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          type: 'MANAGER',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          type: 'MENTOR',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          type: 'CLIENT',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
