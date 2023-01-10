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
        url: "https://a0.muscache.com/im/pictures/e4d0922e-03d1-4194-808a-0d1609186e29.jpg?im_w=960",
        spotId: 1
      },
      {
        url: "https://a0.muscache.com/im/pictures/e25a9b25-fa98-4160-bfd1-039287bf38b6.jpg?im_w=720",
        spotId: 2
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages'; // define table name in options object
    await queryInterface.bulkDelete(options);
  }
};
