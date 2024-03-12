'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      authorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'author',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      coverImage: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue:
          'https://www.pngkit.com/png/detail/2-23698_splash-png-image-color-splash-png-blue.png',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          max: 100,
          min: 1,
        },
      },
      body: {
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
    await queryInterface.dropTable('Articles');
  },
};
