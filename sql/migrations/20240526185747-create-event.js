'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
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
      about: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM('event', 'job', 'training', 'internship'),
        allowNull: true,
        defaultValue: 'event',
      },
      venue: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      requirements: {
        type: Sequelize.TEXT,
        get() {
          const rawValue = this.getDataValue('requirements');
          return rawValue ? JSON.parse(rawValue) : JSON.parse('[]');
        },
        set(value) {
          this.setDataValue('requirements', JSON.stringify(value));
        },
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
    await queryInterface.dropTable('Events');
  },
};
