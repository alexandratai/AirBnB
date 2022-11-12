'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: "12/12/12",
        endDate: "12/21/12"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "11/12/12",
        endDate: "11/21/12"
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "11/12/12",
        endDate: "11/21/12"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
