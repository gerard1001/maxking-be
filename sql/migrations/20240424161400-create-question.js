'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      courseId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Courses',
          key: 'id',
          as: 'course',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      moduleId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Modules',
          key: 'id',
          as: 'module',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      choices: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        allowNull: false,
      },
      trueAnswer: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Questions');
  },
};
