'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'UserArticles',
      [
        {
          id: '1c20913a-efdb-4867-a4e5-71958312241b',
          userId: '42c0fbcd-8d32-4526-a5ef-02df2bab5e41',
          articleId: '741c102c-f194-4f18-922f-8f045046a103',
          createdAt: '2024-07-08T18:10:10.845Z',
          updatedAt: '2024-07-08T18:10:10.845Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserArticles', null, {});
  },
};
