'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles',
      // [
      //   {
      //     id: Sequelize.literal('uuid_generate_v4()'),
      //     type: 'SUPER_ADMIN',
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     id: Sequelize.literal('uuid_generate_v4()'),
      //     type: 'ADMIN',
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     id: Sequelize.literal('uuid_generate_v4()'),
      //     type: 'MANAGER',
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     id: Sequelize.literal('uuid_generate_v4()'),
      //     type: 'MENTOR',
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     id: Sequelize.literal('uuid_generate_v4()'),
      //     type: 'CLIENT',
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      // ],
      [
        {
          id: '1f08778b-adec-4dc4-9461-0b5c1b07e8a5',
          type: 'SUPER_ADMIN',
          createdAt: '2024-07-03T18:43:24.706Z',
          updatedAt: '2024-07-03T18:43:24.706Z',
        },
        {
          id: 'f9035bd5-e584-4364-ae41-ab2d2f1754d5',
          type: 'ADMIN',
          createdAt: '2024-07-03T18:43:24.706Z',
          updatedAt: '2024-07-03T18:43:24.706Z',
        },
        {
          id: 'f58c4bae-2b2f-4415-8b81-29c96166d276',
          type: 'MANAGER',
          createdAt: '2024-07-03T18:43:24.706Z',
          updatedAt: '2024-07-03T18:43:24.706Z',
        },
        {
          id: 'b01ed291-e6fa-4b5b-be6b-65bc1ed70870',
          type: 'MENTOR',
          createdAt: '2024-07-03T18:43:24.706Z',
          updatedAt: '2024-07-03T18:43:24.706Z',
        },
        {
          id: 'bcd591a7-80f4-48ec-8034-42a102c666f2',
          type: 'CLIENT',
          createdAt: '2024-07-03T18:43:24.706Z',
          updatedAt: '2024-07-03T18:43:24.706Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
