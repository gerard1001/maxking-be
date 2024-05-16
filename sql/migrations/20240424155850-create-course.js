'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      subjectId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Subjects',
          key: 'id',
          as: 'subject',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      estimatedDuration: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      previewVideo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      previewText: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isFree: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      discount: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
        allowNull: true,
      },
      currency: {
        type: Sequelize.ENUM('USD', 'EUR', 'GBP', 'RWF'),
        allowNull: true,
        defaultValue: 'USD',
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
    await queryInterface.dropTable('Courses');
  },
};
