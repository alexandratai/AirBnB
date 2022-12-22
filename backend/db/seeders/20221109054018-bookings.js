'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Bookings';

    await queryInterface.bulkInsert(options, [
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
    options.tableName = 'Bookings'; // define table name in options object
    await queryInterface.bulkDelete(options);
  }
};
