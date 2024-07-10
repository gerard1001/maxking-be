'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'UserCourses',
      [
        {
          id: '8e7e9bd1-854a-4385-abd6-078ed4b3a891',
          userId: '356b23fd-3b54-48d8-971c-cc87a2f0bc2f',
          courseId: '04cf924f-d987-4ca2-836d-61b34bf357c5',
          userType: 'TUTOR',
          currentModule: 1,
          rank: null,
          completed: false,
          createdAt: '2024-07-08T18:06:12.689Z',
          updatedAt: '2024-07-08T18:06:12.689Z',
        },
        {
          id: '58109d2f-5bf6-4dbf-9751-697ee2284b1a',
          userId: '2b0bbfea-4283-4b22-8e34-8353f8b2bc1f',
          courseId: 'e821d0bc-023c-4370-8353-76c60bad079e',
          userType: 'TUTOR',
          currentModule: 1,
          rank: null,
          completed: false,
          createdAt: '2024-07-09T17:50:14.638Z',
          updatedAt: '2024-07-09T17:50:14.638Z',
        },
        {
          id: '70c53842-4a83-486c-85e4-4aae03eeabb2',
          userId: '8df1d5e0-45c7-4462-97e7-06ee5ab20eaf',
          courseId: 'e821d0bc-023c-4370-8353-76c60bad079e',
          userType: 'STUDENT',
          currentModule: 2,
          rank: null,
          completed: false,
          createdAt: '2024-07-09T19:13:56.352Z',
          updatedAt: '2024-07-09T20:10:23.899Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserCourses', null, {});
  },
};
