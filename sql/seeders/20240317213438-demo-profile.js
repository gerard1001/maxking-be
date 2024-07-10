'use strict';

const { title } = require('process');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // const users = await queryInterface.sequelize.query(
    //   `SELECT * FROM "Users";`,
    // );
    // const profiles = users[0]?.map((user) => {
    //   return {
    //     id: Sequelize.literal('uuid_generate_v4()'),
    //     userId: user.id,
    //     title: '',
    //     specialty: '',
    //     phoneNumber: '',
    //     gender: null,
    //     birthDate: new Date('1990-01-01'),
    //     picture:
    //       'https://res.cloudinary.com/rutagerard/image/upload/v1710712498/brand/elh13kdsiqvo8dvjyh0a.jpg',
    //     country: '',
    //     city: '',
    //     addressLine: '',
    //     bio: '',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
    // });

    await queryInterface.bulkInsert(
      'Profiles',
      [
        // ...profiles
        {
          id: '08354b21-58c6-4792-b35c-45c99eba1a1e',
          userId: '42c0fbcd-8d32-4526-a5ef-02df2bab5e41',
          title: '',
          specialty: '',
          phoneNumber: '',
          gender: null,
          birthDate: '1990-01-01T00:00:00.000Z',
          picture:
            'https://res.cloudinary.com/rutagerard/image/upload/v1710712498/brand/elh13kdsiqvo8dvjyh0a.jpg',
          country: '',
          city: '',
          addressLine: '',
          bio: '',
          coverLetter: null,
          createdAt: '2024-07-03T18:43:25.318Z',
          updatedAt: '2024-07-03T18:43:25.318Z',
        },
        {
          id: 'e14cc202-3597-4d2b-88ef-556801beaad5',
          userId: '056e8cc0-0f7f-44a3-8de0-adcb920cf873',
          title: '',
          specialty: '',
          phoneNumber: '',
          gender: null,
          birthDate: '1990-01-01T00:00:00.000Z',
          picture:
            'https://res.cloudinary.com/rutagerard/image/upload/v1710712498/brand/elh13kdsiqvo8dvjyh0a.jpg',
          country: '',
          city: '',
          addressLine: '',
          bio: '',
          coverLetter: null,
          createdAt: '2024-07-03T18:43:25.318Z',
          updatedAt: '2024-07-03T18:43:25.318Z',
        },
        {
          id: '9039bef3-1331-480a-9cce-b8ce762266f9',
          userId: '356b23fd-3b54-48d8-971c-cc87a2f0bc2f',
          title: '',
          specialty: 'Developer',
          phoneNumber: '250383938292',
          gender: 'MALE',
          birthDate: '1990-01-01T00:00:00.000Z',
          picture:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720419682/ol07jlqlaadlmrwt4iti.jpg',
          country: 'Rwanda',
          city: 'Kigali',
          addressLine: 'KN-345',
          bio: 'Chris Baptist is a seasoned full stack developer with over 5 years of experience in crafting high-quality web applications. Specializing in JavaScript and its frameworks, John is adept at both front-end and back-end development, ensuring seamless user experiences and robust functionality.',
          coverLetter: null,
          createdAt: '2024-07-03T18:43:25.318Z',
          updatedAt: '2024-07-08T06:21:23.538Z',
        },
        {
          id: 'f5aa9ba5-ceda-4326-bd7e-725152ba47c7',
          userId: '2b0bbfea-4283-4b22-8e34-8353f8b2bc1f',
          title: '',
          specialty: 'Heath doc',
          phoneNumber: '250828928222',
          gender: 'FEMALE',
          birthDate: '1989-11-08T00:00:00.000Z',
          picture:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720217558/on2xojcpw9famdvdmnze.jpg',
          country: 'Rwanda',
          city: 'Kigali',
          addressLine: 'KN-345',
          bio: 'Anastasia is a dedicated and compassionate health professional with over 10 years of experience in internal medicine. ',
          coverLetter: null,
          createdAt: '2024-07-03T18:43:25.318Z',
          updatedAt: '2024-07-08T08:54:55.692Z',
        },
        {
          id: '0967fc95-d515-41b8-a999-a7aa954c4536',
          userId: 'facb4ecf-9105-472e-a869-b2370713a1b9',
          title: '',
          specialty: 'Heath doc',
          phoneNumber: '250828928222',
          gender: 'FEMALE',
          birthDate: '1990-01-01T00:00:00.000Z',
          picture:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720462076/z9l6jfir5bfowa4k95wm.jpg',
          country: 'Rwanda',
          city: 'Kigali',
          addressLine: 'KN-345',
          bio: 'Anastasia is a dedicated and compassionate health professional with over 10 years of experience in internal medicine. ',
          coverLetter: null,
          createdAt: '2024-07-03T18:43:25.318Z',
          updatedAt: '2024-07-08T18:07:57.372Z',
        },
        {
          id: '6fb786e2-7a1b-4809-8feb-7513ac00178f',
          userId: '8df1d5e0-45c7-4462-97e7-06ee5ab20eaf',
          title: null,
          specialty: null,
          phoneNumber: null,
          gender: null,
          birthDate: null,
          picture:
            'https://res.cloudinary.com/rutagerard/image/upload/v1710712498/brand/elh13kdsiqvo8dvjyh0a.jpg',
          country: null,
          city: null,
          addressLine: null,
          bio: null,
          coverLetter: null,
          createdAt: '2024-07-09T19:10:38.821Z',
          updatedAt: '2024-07-09T19:10:38.821Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  },
};
