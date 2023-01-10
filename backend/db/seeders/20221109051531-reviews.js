'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Reviews';

    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        review: "A once in a lifetime experience.",
        stars: 5
      },
      {
        userId: 2,
        spotId: 1,
        review: "I thought it was okay. Terrible cell reception.",
        stars: 3
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews'; // define table name in options object
    await queryInterface.bulkDelete(options);
  }
};
