'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'liker',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      articleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Articles',
          key: 'id',
          as: 'article',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      commentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Comments',
          key: 'id',
          as: 'comment',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      replyId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Replies',
          key: 'id',
          as: 'reply',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Likes');
  },
};
