'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'ReviewImages';

    await queryInterface.bulkInsert(options, [
      {
        url: "www.really-great-photo.io",
        reviewId: 1
      },
      {
        url: "www.very-good-photo.io",
        reviewId: 2
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'; // define table name in options object
    await queryInterface.bulkDelete(options);
  }
};
