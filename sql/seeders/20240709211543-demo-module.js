'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Modules',
      [
        {
          id: '0d3e959a-c3b6-47d8-9fa2-7b7d4266ea85',
          moduleNumber: 1,
          title: 'Meet the heart',
          description:
            "The heart, nestled between the lungs and protected by the rib cage, serves as a powerful pump ensuring blood flow throughout the body. This systemic flow delivers oxygen and nutrients to cells and removes waste. Additionally, the heart manages pulmonary flow, sending blood to the lungs for oxygenation before distributing it to the body. Lastly, the heart's own cells are nourished by coronary blood vessels, part of the systemic flow. Created by Rishi Desai.",
          courseId: '04cf924f-d987-4ca2-836d-61b34bf357c5',
          createdAt: '2024-07-09T15:35:22.103Z',
          updatedAt: '2024-07-09T15:35:22.103Z',
        },
        {
          id: '54ab6a96-4fc8-4ff6-b4b9-49fc3173693e',
          moduleNumber: 2,
          title: 'The Skeletal System',
          description:
            'Humans are vertebrates, animals having a vertabral column or backbone. They rely on a sturdy internal frame that is centered on a prominent spine. The human skeletal system consists of bones, cartilage, ligaments and tendons and accounts for about 20 percent of the body weight.',
          courseId: '04cf924f-d987-4ca2-836d-61b34bf357c5',
          createdAt: '2024-07-09T15:57:48.657Z',
          updatedAt: '2024-07-09T15:57:48.657Z',
        },
        {
          id: 'c9b7422f-2441-4003-845f-6c95ba0d9b6d',
          moduleNumber: 3,
          title: 'Cells, Tissues, & Membranes',
          description:
            'This section provides detailed information about cell structure and function, four basic types of tissue in the human body, and the different types of membranes found in the body.',
          courseId: '04cf924f-d987-4ca2-836d-61b34bf357c5',
          createdAt: '2024-07-09T16:01:42.418Z',
          updatedAt: '2024-07-09T16:01:42.418Z',
        },
        {
          id: 'd9cb516f-83fe-48d1-95ee-96843de648b3',
          moduleNumber: 4,
          title: 'The Muscular System',
          description:
            'The muscular system is composed of specialized cells called muscle fibers. Their predominant function is contractibility. Muscles, attached to bones or internal organs and blood vessels, are responsible for movement. Nearly all movement in the body is the result of muscle contraction. Exceptions to this are the action of cilia, the flagellum on sperm cells, and amoeboid movement of some white blood cells.',
          courseId: '04cf924f-d987-4ca2-836d-61b34bf357c5',
          createdAt: '2024-07-09T16:05:34.892Z',
          updatedAt: '2024-07-09T16:05:34.892Z',
        },
        {
          id: 'dd806dc1-035c-4f51-ade2-b30bd23b3acd',
          moduleNumber: 1,
          title: 'Introduction to Cancer Treatment',
          description:
            'Cancer treatment involves medical procedures to destroy, modify, control, or remove primary, nodal, regional, or metastatic cancer tissue. The goals of cancer treatment include eradicating known tumors entirely, preventing the recurrence or spread of the primary cancer, and relieving symptoms if all reasonable approaches have been exhausted.',
          courseId: 'e821d0bc-023c-4370-8353-76c60bad079e',
          createdAt: '2024-07-09T17:37:46.914Z',
          updatedAt: '2024-07-09T17:37:46.914Z',
        },
        {
          id: 'ce820807-86b5-4485-bef1-097a5525201f',
          moduleNumber: 2,
          title: 'Surgery Data Fields',
          description:
            "Both the Commission on Cancer (CoC) of the American College of Surgeons and the National Cancer Institute's SEER Program are the standard-setting agencies responsible for the surgery data fields. Refer to pages 157 to 186 (and Appendix C) of the SEER Program Coding and Staging Manual, 2018 and the CoC's STORE ManualExternal Website Policy (and Appendix C) for the definitions and standard codes to be used in the surgery data fields.",
          courseId: 'e821d0bc-023c-4370-8353-76c60bad079e',
          createdAt: '2024-07-09T17:41:02.440Z',
          updatedAt: '2024-07-09T17:41:02.440Z',
        },
        {
          id: 'aeed35ed-cc4a-486c-858e-f4a50e36a41c',
          moduleNumber: 3,
          title: 'Hormonal Therapy',
          description:
            'Hormones are natural substances produced by the body that control reproduction, growth, and metabolism. A hormone is an internally secreted compound, such as insulin or thyroxine, formed in endocrine glands. Hormones affect the functions of specifically receptive organs or tissues when transported to them by the body fluids. Pharmaceutically, a hormone is a synthetic substance used in medicine to act like a compound when introduced into the body.',
          courseId: 'e821d0bc-023c-4370-8353-76c60bad079e',
          createdAt: '2024-07-09T17:44:14.601Z',
          updatedAt: '2024-07-09T17:44:14.601Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Modules', null, {});
  },
};
