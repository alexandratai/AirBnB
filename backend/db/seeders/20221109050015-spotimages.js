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
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/22ae9ca7-aa3c-47f0-9f7e-d22c40270db5.jpeg?im_w=1200",
        spotId: 1
      },
      {
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45868372/original/8a8e1ba3-0ddc-4032-965a-5370b45c6de6.jpeg?im_w=1200",
        spotId: 2
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages'; // define table name in options object
    await queryInterface.bulkDelete(options);
  }
};
