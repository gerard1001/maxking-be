'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Tweets',
      [
        {
          id: 'b0c4077f-f5e7-4173-ab97-b5c9a2d5f34c',
          tweetId: '1809904576612430139',
          isPinned: true,
          createdAt: '2024-07-09T21:55:51.193Z',
          updatedAt: '2024-07-09T21:55:51.193Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tweets', null, {});
  },
};
