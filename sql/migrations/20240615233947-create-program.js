'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Programs', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      coverImage: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue:
          'https://res.cloudinary.com/rutagerard/image/upload/v1713800805/Important/manga_z8z1xs.png',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      short: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Programs');
  },
};
