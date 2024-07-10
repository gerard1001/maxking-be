'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Tags',
      [
        {
          id: '0448d647-52e1-491c-aeb0-14ac8144c547',
          name: 'Devops',
          createdAt: '2024-07-08T11:19:04.244Z',
          updatedAt: '2024-07-08T11:19:04.244Z',
        },
        {
          id: '0374c814-9631-47dd-9b7f-a843a0bfc935',
          name: 'Climate',
          createdAt: '2024-07-08T11:19:16.175Z',
          updatedAt: '2024-07-08T11:19:16.175Z',
        },
        {
          id: '1a403fd4-b85a-48f5-bda5-1b6b55c21b19',
          name: 'Weather',
          createdAt: '2024-07-08T11:19:21.794Z',
          updatedAt: '2024-07-08T11:19:21.794Z',
        },
        {
          id: '9a2d0d46-d6a7-47ac-8b8b-655cf2b19ba4',
          name: 'Medecine',
          createdAt: '2024-07-08T11:21:01.300Z',
          updatedAt: '2024-07-08T11:21:01.300Z',
        },
        {
          id: '889b860d-9cf0-462e-837b-56b58061942a',
          name: 'Business',
          createdAt: '2024-07-08T11:21:07.232Z',
          updatedAt: '2024-07-08T11:21:07.232Z',
        },
        {
          id: 'a2e352c8-b810-41cb-92a4-77658a3cbd84',
          name: 'Wealth',
          createdAt: '2024-07-08T11:21:13.953Z',
          updatedAt: '2024-07-08T11:21:13.953Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  },
};
