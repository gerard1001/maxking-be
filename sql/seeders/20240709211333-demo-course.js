'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Courses',
      [
        {
          id: '04cf924f-d987-4ca2-836d-61b34bf357c5',
          coverImage:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720461972/daf9hxzs05sofu6yfohr.jpg',
          title: 'Learn human anatomy',
          description:
            'The human body is made up of 11 systems. When one system starts behaving in an unusual way, the other systems react to compensate for the error. Learn about the relationships between each system with online courses delivered through edX.',
          estimatedDuration: '30 - 60 minutes',
          previewVideo: 'uBGl2BujkPQ',
          previewText:
            'Human anatomy involves the study of the bones, joints, muscles, and other systems within the human body. With each component serving a specific function, it’s important to not only understand those functions, but how they impact other parts of the body. For example, a practitioner treating a bacterial infection with penicillin risks causing a serious allergic reaction in their patient. While the drug itself is not harmful, it can become dangerous within a body that does not have the necessary immune response.',
          isFree: false,
          price: 100,
          discount: 0,
          currency: 'USD',
          isPublished: true,
          subjectId: 'a406cec5-c6d6-488d-a333-a14f3019dcba',
          createdAt: '2024-07-08T18:06:12.648Z',
          updatedAt: '2024-07-09T15:56:40.772Z',
        },
        {
          id: 'e821d0bc-023c-4370-8353-76c60bad079e',
          coverImage:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720544492/jzc09cnbaizenig19pcs.jpg',
          title: 'Introduction to Cancer Treatment',
          description:
            'Cancer treatment involves medical procedures to destroy, modify, control, or remove primary, nodal, regional, or metastatic cancer tissue. The goals of cancer treatment include eradicating known tumors entirely, preventing the recurrence or spread of the primary cancer, and relieving symptoms if all reasonable approaches have been exhausted.',
          estimatedDuration: '2 - 4 hours',
          previewVideo: '',
          previewText:
            'Cancer treatment involves medical procedures to destroy, modify, control, or remove primary, nodal, regional, or metastatic cancer tissue. The goals of cancer treatment include eradicating known tumors entirely, preventing the recurrence or spread of the primary cancer, and relieving symptoms if all reasonable approaches have been exhausted.',
          isFree: false,
          price: 150,
          discount: 0,
          currency: 'USD',
          isPublished: true,
          subjectId: 'f753acb0-db46-4e4b-8f5d-0238138f04da',
          createdAt: '2024-07-09T17:01:33.266Z',
          updatedAt: '2024-07-09T17:50:14.628Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {});
  },
};
