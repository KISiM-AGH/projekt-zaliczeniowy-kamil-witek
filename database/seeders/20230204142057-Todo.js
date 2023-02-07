'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert( 'Todos',
    [
      {
      text: 'Notatka 1',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Notatka 2',
        userId:2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  )
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete("Todos", null, {})
  }
};
