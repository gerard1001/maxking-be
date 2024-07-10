'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Subjects',
      [
        {
          id: 'a406cec5-c6d6-488d-a333-a14f3019dcba',
          name: 'Phyisiology',
          categoryId: 'b09608a3-1385-40ab-89e6-9741c1ff9058',
          createdAt: '2024-07-08T18:00:14.662Z',
          updatedAt: '2024-07-08T18:00:14.662Z',
        },
        {
          id: 'f753acb0-db46-4e4b-8f5d-0238138f04da',
          name: 'cardiology',
          categoryId: 'b09608a3-1385-40ab-89e6-9741c1ff9058',
          createdAt: '2024-07-08T18:00:25.460Z',
          updatedAt: '2024-07-08T18:00:25.460Z',
        },
        {
          id: 'de244cdb-2c62-4787-9d69-8742a5c2cddf',
          name: 'Psychology',
          categoryId: 'b09608a3-1385-40ab-89e6-9741c1ff9058',
          createdAt: '2024-07-08T18:00:37.701Z',
          updatedAt: '2024-07-08T18:00:37.701Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subjects', null, {});
  },
};
