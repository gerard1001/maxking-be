'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Collaborators',
      [
        {
          id: '828f68ff-37f0-4bd1-87f4-a2a01c7d6594',
          name: 'Rwanda Medical academy',
          url: 'https://www.youtube.com/@medicalexcellencecenter',
          image:
            'https://res.cloudinary.com/rutagerard/image/upload/v1717965439/sosvfp1ur9xuequpiiwj.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'c6daa8ee-d384-4a79-b132-3703d45e88c7',
          name: 'RICA',
          url: 'https://www.recaonline.org/home/sample-page/',
          image:
            'https://res.cloudinary.com/rutagerard/image/upload/v1717966249/rypztbsfdmt6q8jqn8xn.webp',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Collaborators', null, {});
  },
};
