'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'ArticleTags',
      [
        {
          id: '1a76d542-85a1-464e-a765-3ae34a400c39',
          articleId: '6e53540a-fd68-4bb0-b2b5-2eb8586cdb58',
          tagId: '0374c814-9631-47dd-9b7f-a843a0bfc935',
          createdAt: '2024-07-08T11:33:43.496Z',
          updatedAt: '2024-07-08T11:33:43.496Z',
        },
        {
          id: '46fa91c7-0c3e-46b7-8af6-f8b5ce634484',
          articleId: '6e53540a-fd68-4bb0-b2b5-2eb8586cdb58',
          tagId: '1a403fd4-b85a-48f5-bda5-1b6b55c21b19',
          createdAt: '2024-07-08T11:33:43.502Z',
          updatedAt: '2024-07-08T11:33:43.502Z',
        },
        {
          id: 'bd9af96f-b083-4fa2-8d91-7366861341b7',
          articleId: '1e732bb9-ac8e-47a2-adc2-893fc750a467',
          tagId: '0448d647-52e1-491c-aeb0-14ac8144c547',
          createdAt: '2024-07-08T14:08:17.093Z',
          updatedAt: '2024-07-08T14:08:17.093Z',
        },
        {
          id: '907cee61-3e74-4aaf-8654-1e502ae8b689',
          articleId: '1e732bb9-ac8e-47a2-adc2-893fc750a467',
          tagId: '0374c814-9631-47dd-9b7f-a843a0bfc935',
          createdAt: '2024-07-08T14:08:17.104Z',
          updatedAt: '2024-07-08T14:08:17.104Z',
        },
        {
          id: '74187366-acb5-427e-b0f9-16cc8fae42e1',
          articleId: '1e732bb9-ac8e-47a2-adc2-893fc750a467',
          tagId: '9a2d0d46-d6a7-47ac-8b8b-655cf2b19ba4',
          createdAt: '2024-07-08T14:08:17.115Z',
          updatedAt: '2024-07-08T14:08:17.115Z',
        },
        {
          id: '0db820a5-56cb-4a1d-82ff-37784a511e15',
          articleId: '741c102c-f194-4f18-922f-8f045046a103',
          tagId: '0374c814-9631-47dd-9b7f-a843a0bfc935',
          createdAt: '2024-07-08T14:13:09.857Z',
          updatedAt: '2024-07-08T14:13:09.857Z',
        },
        {
          id: '947a6b00-08c6-4fa1-9d1b-2f4043f063a7',
          articleId: '741c102c-f194-4f18-922f-8f045046a103',
          tagId: '9a2d0d46-d6a7-47ac-8b8b-655cf2b19ba4',
          createdAt: '2024-07-08T14:13:09.863Z',
          updatedAt: '2024-07-08T14:13:09.863Z',
        },
        {
          id: '0da25c8e-7f57-4bfb-963c-19636ba77b8a',
          articleId: '741c102c-f194-4f18-922f-8f045046a103',
          tagId: '889b860d-9cf0-462e-837b-56b58061942a',
          createdAt: '2024-07-08T14:13:09.869Z',
          updatedAt: '2024-07-08T14:13:09.869Z',
        },
        {
          id: 'd7a4a58d-2556-4f40-bb0b-99e6c6cf5929',
          articleId: 'bbfaa340-6838-4aa8-855e-5c9f90bf93a3',
          tagId: '0448d647-52e1-491c-aeb0-14ac8144c547',
          createdAt: '2024-07-08T14:15:46.706Z',
          updatedAt: '2024-07-08T14:15:46.706Z',
        },
        {
          id: '65643123-3a24-49d4-bf7e-62fe58fcacf4',
          articleId: 'bbfaa340-6838-4aa8-855e-5c9f90bf93a3',
          tagId: 'a2e352c8-b810-41cb-92a4-77658a3cbd84',
          createdAt: '2024-07-08T14:15:46.710Z',
          updatedAt: '2024-07-08T14:15:46.710Z',
        },
        {
          id: 'f04d24b1-af6b-4b09-b7ee-54ee6c897751',
          articleId: 'bbfaa340-6838-4aa8-855e-5c9f90bf93a3',
          tagId: '889b860d-9cf0-462e-837b-56b58061942a',
          createdAt: '2024-07-08T14:15:46.714Z',
          updatedAt: '2024-07-08T14:15:46.714Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ArticleTags', null, {});
  },
};
