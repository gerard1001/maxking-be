'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'CourseTags',
      [
        {
          id: '6116c671-fe94-431d-bf82-c6acb6fd679d',
          courseId: '04cf924f-d987-4ca2-836d-61b34bf357c5',
          tagId: '0448d647-52e1-491c-aeb0-14ac8144c547',
          createdAt: '2024-07-08T18:06:12.678Z',
          updatedAt: '2024-07-08T18:06:12.678Z',
        },
        {
          id: '24e39345-58bc-4b79-bb71-2a1eae64e988',
          courseId: '04cf924f-d987-4ca2-836d-61b34bf357c5',
          tagId: '9a2d0d46-d6a7-47ac-8b8b-655cf2b19ba4',
          createdAt: '2024-07-08T18:06:12.683Z',
          updatedAt: '2024-07-08T18:06:12.683Z',
        },
        {
          id: '3f8d99cd-26d6-4b10-843d-1ab721471383',
          courseId: '04cf924f-d987-4ca2-836d-61b34bf357c5',
          tagId: '889b860d-9cf0-462e-837b-56b58061942a',
          createdAt: '2024-07-08T18:06:12.686Z',
          updatedAt: '2024-07-08T18:06:12.686Z',
        },
        {
          id: 'd8cd90ae-4cf5-4709-8256-5395debd9e35',
          courseId: 'e821d0bc-023c-4370-8353-76c60bad079e',
          tagId: '0448d647-52e1-491c-aeb0-14ac8144c547',
          createdAt: '2024-07-09T17:50:14.631Z',
          updatedAt: '2024-07-09T17:50:14.631Z',
        },
        {
          id: '042cc2dc-2e40-421e-a13d-9c172c838f89',
          courseId: 'e821d0bc-023c-4370-8353-76c60bad079e',
          tagId: '9a2d0d46-d6a7-47ac-8b8b-655cf2b19ba4',
          createdAt: '2024-07-09T17:50:14.634Z',
          updatedAt: '2024-07-09T17:50:14.634Z',
        },
        {
          id: '9ae3e511-12d6-4f21-988f-d0e0930102fd',
          courseId: 'e821d0bc-023c-4370-8353-76c60bad079e',
          tagId: 'a2e352c8-b810-41cb-92a4-77658a3cbd84',
          createdAt: '2024-07-09T17:50:14.635Z',
          updatedAt: '2024-07-09T17:50:14.635Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CourseTags', null, {});
  },
};
