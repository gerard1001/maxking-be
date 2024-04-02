'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const superAdmin = await queryInterface.sequelize.query(
      `SELECT * FROM "Roles" WHERE type = 'SUPER_ADMIN';`,
    );
    const admin = await queryInterface.sequelize.query(
      `SELECT * FROM "Roles" WHERE type = 'ADMIN';`,
    );
    const manager = await queryInterface.sequelize.query(
      `SELECT * FROM "Roles" WHERE type = 'MANAGER';`,
    );
    const mentor = await queryInterface.sequelize.query(
      `SELECT * FROM "Roles" WHERE type = 'MENTOR';`,
    );
    const client = await queryInterface.sequelize.query(
      `SELECT * FROM "Roles" WHERE type = 'CLIENT';`,
    );

    const user1 = await queryInterface.sequelize.query(
      `SELECT * FROM "Users" WHERE email = 'gerard@gmail.com';`,
    );
    const user2 = await queryInterface.sequelize.query(
      `SELECT * FROM "Users" WHERE email = 'valentin@gmail.com';`,
    );
    const user3 = await queryInterface.sequelize.query(
      `SELECT * FROM "Users" WHERE email = 'anastasie@gmail.com';`,
    );
    const user4 = await queryInterface.sequelize.query(
      `SELECT * FROM "Users" WHERE email = 'baptiste@gmail.com';`,
    );
    const user5 = await queryInterface.sequelize.query(
      `SELECT * FROM "Users" WHERE email = 'irene@gmail.com';`,
    );

    await queryInterface.bulkInsert(
      'UserRoles',
      [
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          roleId: superAdmin[0][0].id,
          userId: user1[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          roleId: admin[0][0].id,
          userId: user2[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          roleId: manager[0][0].id,
          userId: user3[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          roleId: mentor[0][0].id,
          userId: user4[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          roleId: client[0][0].id,
          userId: user5[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserRoles', null, {});
  },
};
