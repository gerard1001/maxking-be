'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Services',
      [
        {
          id: 'c687c31e-32f0-42f4-9d19-c3d35f50294d',
          coverImage:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720568612/phcqwljtnpkvnhdkjj4s.png',
          title: 'Economic Development Planning',
          description:
            'Our economic development experts collaborate with local communities to create strategic plans aimed at stimulating economic growth and sustainability. ',
          body: '<p><span style="background-color: transparent;">We conduct comprehensive analyses of local economies, identify key opportunities for development, and formulate actionable strategies to attract investment, create jobs, and enhance the overall economic prosperity of the area.</span></p>',
          createdAt: '2024-07-09T23:43:33.389Z',
          updatedAt: '2024-07-09T23:43:33.389Z',
        },
        {
          id: 'bfb5ea04-5a98-4a2f-ba7d-6532d10b6271',
          coverImage:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720568650/u3likjmfhkh9isca4mgi.png',
          title: 'Workforce Development Programs',
          description:
            "Empower your community through our tailored workforce development programs. We offer training and education initiatives designed to equip individuals with the skills and knowledge needed to thrive in today's job market. \r\n",
          body: '<p>Our programs include vocational training, skill enhancement workshops, and career counseling, ensuring that participants are prepared for high-demand occupations and can contribute effectively to the local economy.</p>',
          createdAt: '2024-07-09T23:44:10.548Z',
          updatedAt: '2024-07-09T23:44:10.548Z',
        },
        {
          id: 'aec20b8d-c43d-4882-b2cd-3b555b227201',
          coverImage:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720568691/pnriww2rlxhqqzdo8vl7.png',
          title: 'Microfinance and Small Business Support',
          description:
            'Support local entrepreneurship with our microfinance and small business assistance services. We provide access to financial literacy training, and business development resources, helping aspiring entrepreneurs start and grow their businesses. ',
          body: '<p>Our goal is to foster a vibrant small business ecosystem that drives economic prosperity and job creation within the community.</p>',
          createdAt: '2024-07-09T23:44:52.432Z',
          updatedAt: '2024-07-09T23:44:52.432Z',
        },
        {
          id: '93a80010-840f-41d5-8af2-7e4696e82f28',
          coverImage:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720568743/zuiea55xrrul4rjngkrh.png',
          title: 'Community Health Initiatives',
          description:
            'Improve the overall health and well-being of your community with our community health initiatives. We design and implement health programs that address key public health issues, promote healthy lifestyles, and increase access to healthcare services. ',
          body: '<p>Our initiatives include health education campaigns, preventive health screenings, and partnerships with local healthcare providers to enhance community health outcomes.</p><p><br></p>',
          createdAt: '2024-07-09T23:45:43.942Z',
          updatedAt: '2024-07-09T23:45:43.942Z',
        },
        {
          id: 'c6719829-45ec-4ae8-834d-6578ffc655c8',
          coverImage:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720568781/nikvoowlxdadrwkgqnca.png',
          title: 'Education and Youth Empowerment',
          description:
            'Invest in the future of your community through our education and youth empowerment services. We offer a range of programs aimed at improving educational outcomes and fostering leadership skills among young people. ',
          body: '<p>Our services include after-school programs, mentorship initiatives, and scholarships, ensuring that youth have the support and resources they need to succeed academically and become active, engaged citizens.</p>',
          createdAt: '2024-07-09T23:46:22.338Z',
          updatedAt: '2024-07-09T23:46:22.338Z',
        },
        {
          id: '63a33f0f-9006-46f4-98dc-50f425d5356a',
          coverImage:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720568821/k3rnhmwrol0vmvg5zmze.png',
          title: 'Environmental Sustainability Projects',
          description:
            'Promote environmental sustainability in your community with our specialized projects. We help communities develop and implement strategies for sustainable resource management, renewable energy adoption, and environmental conservation. Our services include environmental education, green infrastructure planning, and support for community-led sustainability initiatives, contributing to a healthier and more resilient community.',
          body: '<p><br></p>',
          createdAt: '2024-07-09T23:47:01.973Z',
          updatedAt: '2024-07-09T23:47:01.973Z',
        },
        {
          id: '808e0818-b327-49bc-9ed0-fa334e9a084a',
          coverImage:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720568875/u2hgmxzoj08man8yofmb.png',
          title: 'Social Services and Support Networks',
          description:
            'Enhance the social safety net in your community with our social services and support networks. We provide a range of services aimed at assisting vulnerable populations, including mental health support, and family counseling. ',
          body: '<p>Our goal is to ensure that all community members have access to the resources and support they need to lead healthy, stable, and fulfilling lives.</p><p><br></p>',
          createdAt: '2024-07-09T23:47:55.737Z',
          updatedAt: '2024-07-09T23:47:55.737Z',
        },
        {
          id: '497722a5-4dff-494a-a4d0-d3e178ffd725',
          coverImage:
            'https://res.cloudinary.com/rutagerard/image/upload/v1720568907/lizouorlfnlvkbeltg5j.png',
          title: 'Cultural and Recreational Programs',
          description:
            'Enrich community life with our cultural and recreational programs. We offer a variety of activities and events that promote cultural awareness, community engagement, and physical well-being. \r\n',
          body: '<p>Our programs include cultural festivals, art workshops, sports leagues, and recreational facilities development, creating opportunities for community members to connect, learn, and enjoy a vibrant community life.</p>',
          createdAt: '2024-07-09T23:48:27.988Z',
          updatedAt: '2024-07-09T23:48:27.988Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
  },
};
