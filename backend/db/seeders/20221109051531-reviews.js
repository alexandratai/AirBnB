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
      {
        userId: 2,
        spotId: 2,
        review: "Beautiful home. I really enjoyed my stay.",
        stars: 4
      },
      {
        userId: 1,
        spotId: 5,
        review: "Host was very kind! Would come back again.",
        stars: 4
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews'; // define table name in options object
    await queryInterface.bulkDelete(options);
  }
};
