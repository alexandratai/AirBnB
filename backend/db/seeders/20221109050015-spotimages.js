'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'SpotImages';

    await queryInterface.bulkInsert(options, [
      {
        url: "www.greatSpot.io",
        spotId: 1
      },
      {
        url: "www.greatSpot2.io",
        spotId: 2
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages'; // define table name in options object
    await queryInterface.bulkDelete(options);
  }
};
