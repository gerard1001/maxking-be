'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // const superAdmin = await queryInterface.sequelize.query(
    //   `SELECT * FROM "Roles" WHERE type = 'SUPER_ADMIN';`,
    // );
    // const admin = await queryInterface.sequelize.query(
    //   `SELECT * FROM "Roles" WHERE type = 'ADMIN';`,
    // );
    // const manager = await queryInterface.sequelize.query(
    //   `SELECT * FROM "Roles" WHERE type = 'MANAGER';`,
    // );
    // const mentor = await queryInterface.sequelize.query(
    //   `SELECT * FROM "Roles" WHERE type = 'MENTOR';`,
    // );
    // const client = await queryInterface.sequelize.query(
    //   `SELECT * FROM "Roles" WHERE type = 'CLIENT';`,
    // );

    // const user1 = await queryInterface.sequelize.query(
    //   `SELECT * FROM "Users" WHERE email = 'gerard@gmail.com';`,
    // );
    // const user2 = await queryInterface.sequelize.query(
    //   `SELECT * FROM "Users" WHERE email = 'valentin@gmail.com';`,
    // );
    // const user3 = await queryInterface.sequelize.query(
    //   `SELECT * FROM "Users" WHERE email = 'anastasie@gmail.com';`,
    // );
    // const user4 = await queryInterface.sequelize.query(
    //   `SELECT * FROM "Users" WHERE email = 'baptiste@gmail.com';`,
    // );
    // const user5 = await queryInterface.sequelize.query(
    //   `SELECT * FROM "Users" WHERE email = 'irene@gmail.com';`,
    // );

    await queryInterface.bulkInsert(
      'UserRoles',
      [
        // {
        //   id: Sequelize.literal('uuid_generate_v4()'),
        //   roleId: superAdmin[0][0].id,
        //   userId: user1[0][0].id,
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   id: Sequelize.literal('uuid_generate_v4()'),
        //   roleId: admin[0][0].id,
        //   userId: user2[0][0].id,
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   id: Sequelize.literal('uuid_generate_v4()'),
        //   roleId: manager[0][0].id,
        //   userId: user3[0][0].id,
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   id: Sequelize.literal('uuid_generate_v4()'),
        //   roleId: mentor[0][0].id,
        //   userId: user4[0][0].id,
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   id: Sequelize.literal('uuid_generate_v4()'),
        //   roleId: client[0][0].id,
        //   userId: user5[0][0].id,
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        {
          id: '543f1eb6-22e4-4e38-9224-a6e1fe8deebe',
          roleId: '1f08778b-adec-4dc4-9461-0b5c1b07e8a5',
          userId: '42c0fbcd-8d32-4526-a5ef-02df2bab5e41',
          createdAt: '2024-07-03T18:43:25.312Z',
          updatedAt: '2024-07-03T18:43:25.312Z',
        },
        {
          id: '4251d21d-85df-4b30-a9af-0c7ac6f3093b',
          roleId: 'f9035bd5-e584-4364-ae41-ab2d2f1754d5',
          userId: '056e8cc0-0f7f-44a3-8de0-adcb920cf873',
          createdAt: '2024-07-03T18:43:25.312Z',
          updatedAt: '2024-07-03T18:43:25.312Z',
        },
        {
          id: '8cf353dc-e856-4dfe-bd7a-c8b4101a1676',
          roleId: 'f58c4bae-2b2f-4415-8b81-29c96166d276',
          userId: '2b0bbfea-4283-4b22-8e34-8353f8b2bc1f',
          createdAt: '2024-07-03T18:43:25.312Z',
          updatedAt: '2024-07-03T18:43:25.312Z',
        },
        {
          id: '18161f09-67ee-44df-8ebe-6c15b09a6ae1',
          roleId: 'b01ed291-e6fa-4b5b-be6b-65bc1ed70870',
          userId: '356b23fd-3b54-48d8-971c-cc87a2f0bc2f',
          createdAt: '2024-07-03T18:43:25.312Z',
          updatedAt: '2024-07-03T18:43:25.312Z',
        },
        {
          id: '10723b67-7289-42a7-8e32-1edc7631fa16',
          roleId: 'bcd591a7-80f4-48ec-8034-42a102c666f2',
          userId: 'facb4ecf-9105-472e-a869-b2370713a1b9',
          createdAt: '2024-07-03T18:43:25.312Z',
          updatedAt: '2024-07-03T18:43:25.312Z',
        },
        {
          id: 'a98fce74-92b1-4c77-a0d0-9a117a4fd934',
          roleId: 'bcd591a7-80f4-48ec-8034-42a102c666f2',
          userId: '8df1d5e0-45c7-4462-97e7-06ee5ab20eaf',
          createdAt: '2024-07-09T19:10:38.855Z',
          updatedAt: '2024-07-09T19:10:38.855Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserRoles', null, {});
  },
};
