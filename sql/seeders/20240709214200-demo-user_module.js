'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'UserModules',
      [
        {
          id: 'bd40ab6b-238b-4cf9-8fac-4aa0857eaac9',
          userId: '8df1d5e0-45c7-4462-97e7-06ee5ab20eaf',
          moduleId: 'ce820807-86b5-4485-bef1-097a5525201f',
          currentChapter: 1,
          rank: null,
          createdAt: '2024-07-09T20:10:24.069Z',
          updatedAt: '2024-07-09T20:10:24.069Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserModules', null, {});
  },
};
