'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Certificates',
      [
        {
          id: '94adc002-a193-415b-8a2a-8fa9deb17578',
          issuers:
            '[{"name":"Bimenyimana Moses","signature":"https://res.cloudinary.com/rutagerard/image/upload/v1720548906/vpgo19vkk6u4qzjjvbci.png","position":"Coordinator @ Maxking"},{"name":"Kagabage Jerome","signature":"https://res.cloudinary.com/rutagerard/image/upload/v1720548907/k9ph3so5haohkihf0tvv.png","position":"Manager @ Maxking"}]',
          courseId: '04cf924f-d987-4ca2-836d-61b34bf357c5',
          createdAt: '2024-07-09T18:15:08.547Z',
          updatedAt: '2024-07-09T18:15:08.547Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Certificates', null, {});
  },
};
