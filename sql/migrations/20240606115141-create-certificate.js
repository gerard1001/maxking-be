'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Certificates', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      courseId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Courses',
          key: 'id',
          as: 'course',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      issuers: {
        type: Sequelize.TEXT,
        get() {
          const rawValue = this.getDataValue('issuers');
          return rawValue ? JSON.parse(rawValue) : JSON.parse('[]');
        },
        set(value) {
          this.setDataValue('issuers', JSON.stringify(value));
        },
      },
      // issuerName1: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      // issuerSignature1: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      // issuerPosition1: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      // issuerName2: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
      // issuerSignature2: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
      // issuerPosition2: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
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
    await queryInterface.dropTable('Certificates');
  },
};
