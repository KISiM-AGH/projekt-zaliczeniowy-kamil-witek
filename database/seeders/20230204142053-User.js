'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
queryInterface.bulkInsert(
    'Users',
    [
      {
        email: 'janedoe@example.com',
        password:"123456",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jondoe@example.com',
        password:"123456",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  )
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete("Users", null, {})
  }
};
