'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          id: 'b09608a3-1385-40ab-89e6-9741c1ff9058',
          name: 'Health',
          image:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720461323/vmwvwlnov7tj924tw5px.png',
          createdAt: '2024-07-08T17:55:24.236Z',
          updatedAt: '2024-07-08T17:55:24.236Z',
        },
        {
          id: 'c749dc45-d7c7-4b17-ae7c-a7ea3472b7a7',
          name: 'Climate',
          image:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720461271/re1a83nbrou4oypemdcu.png',
          createdAt: '2024-07-08T17:54:32.420Z',
          updatedAt: '2024-07-08T17:54:32.420Z',
        },
        {
          id: 'e5aba996-5696-4697-8625-05b23257662c',
          name: 'Education',
          image:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720460395/edoksodnlnj6x6bucypa.png',
          createdAt: '2024-07-08T17:39:55.873Z',
          updatedAt: '2024-07-08T17:39:55.873Z',
        },
        {
          id: '3db6921e-cc98-4ddf-a884-e2b0efe96ec6',
          name: 'Business',
          image:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720460262/sghkkfztiqzycodulr3v.png',
          createdAt: '2024-07-08T17:37:43.579Z',
          updatedAt: '2024-07-08T17:37:43.579Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
