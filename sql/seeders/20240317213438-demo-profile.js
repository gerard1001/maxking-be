'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT * FROM "Users";`,
    );
    const profiles = users[0]?.map((user) => {
      return {
        id: Sequelize.literal('uuid_generate_v4()'),
        userId: user.id,
        phoneNumber: '',
        gender: null,
        birthDate: new Date('1990-01-01'),
        picture:
          'https://res.cloudinary.com/rutagerard/image/upload/v1710712498/brand/elh13kdsiqvo8dvjyh0a.jpg',
        country: '',
        city: '',
        address1: '',
        address2: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Profiles', [...profiles], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  },
};
