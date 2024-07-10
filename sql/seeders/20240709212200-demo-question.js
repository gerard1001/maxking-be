'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Questions',
      [
        {
          id: 'a755ab0d-bdb4-4386-8a1b-e72f06eed64d',
          question:
            '<p>Which organ is responsible for pumping blood throughout the body?</p>',
          choices:
            '[{"index":1,"choice":"Lung"},{"index":2,"choice":"Liver"},{"index":3,"choice":"Heart"},{"index":4,"choice":"Kidneys"}]',
          trueAnswer: 'Heart',
          courseId: '04cf924f-d987-4ca2-836d-61b34bf357c5',
          moduleId: null,
          createdAt: '2024-07-09T16:08:46.430Z',
          updatedAt: '2024-07-09T16:08:46.430Z',
        },
        {
          id: '6cb8d75d-82f5-484f-af90-1e18e9a506d0',
          question: '<p>Which bone is the longest in the human body?</p>',
          choices:
            '[{"index":1,"choice":"Femur"},{"index":2,"choice":"Tibia"},{"index":3,"choice":"Humerus"},{"index":4,"choice":"Radius"}]',
          trueAnswer: 'Femur',
          courseId: '04cf924f-d987-4ca2-836d-61b34bf357c5',
          moduleId: null,
          createdAt: '2024-07-09T16:09:51.397Z',
          updatedAt: '2024-07-09T16:09:51.397Z',
        },
        {
          id: 'ac87f116-e380-479d-9cf9-226083b888a2',
          question:
            '<p>Ideas about&nbsp;<a href="https://api.seer.cancer.gov/rest/glossary/latest/id/550ed183e4b0c48f31dad283" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(0, 101, 168);">cell</a>&nbsp;structure have changed considerably over the years. Early biologists saw cells as simple membranous sacs containing fluid and a few floating particles. Today\'s biologists know that cells are infinitely more complex than this.</p><p><span style="background-color: rgb(255, 255, 255); color: rgb(33, 37, 41);"><img src="https://training.seer.cancer.gov/images/anatomy/cells_tissues_membranes/cell_structure.jpg" alt="Illustration showing the structure of a cell" height="291" width="511"></span></p><p><br></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(33, 37, 41);">What name do we give the above cell with all components?</span></p>',
          choices:
            '[{"index":1,"choice":"Small Cell"},{"index":2,"choice":"Large cell"},{"index":3,"choice":"Cell membrane"},{"index":4,"choice":"generalized cell"}]',
          trueAnswer: 'generalized cell',
          courseId: '04cf924f-d987-4ca2-836d-61b34bf357c5',
          moduleId: null,
          createdAt: '2024-07-09T16:13:59.169Z',
          updatedAt: '2024-07-09T16:13:59.169Z',
        },
        {
          id: '5e37ff1e-3efd-474d-8f79-47e38e8d1371',
          question: '<p>What is the primary function of red blood cells?</p>',
          choices:
            '[{"index":1,"choice":"To fight infections"},{"index":2,"choice":"To transport oxygen"},{"index":3,"choice":"To clot blood"},{"index":4,"choice":"To produce antibodies"}]',
          trueAnswer: 'To transport oxygen',
          courseId: '04cf924f-d987-4ca2-836d-61b34bf357c5',
          moduleId: null,
          createdAt: '2024-07-09T16:15:23.504Z',
          updatedAt: '2024-07-09T16:15:23.504Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};
