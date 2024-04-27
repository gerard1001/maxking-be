'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        allowNull: true,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'user',
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      specialty: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['MALE', 'FEMALE', 'OTHER'],
        allowNull: true,
        defaultValue: null,
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
        validate: {
          isDate: true,
          isBefore: new Date(),
        },
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      addressLine: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
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
    return queryInterface.dropTable('Profiles');
  },
};
