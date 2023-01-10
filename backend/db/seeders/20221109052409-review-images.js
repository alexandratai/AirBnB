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
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45868372/original/d300da5c-054f-432b-b818-750803160cfc.jpeg?im_w=1200",
        reviewId: 1
      },
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/93cba8f8-f489-4f1c-83c1-246faae34ff3.jpeg?im_w=720",
        reviewId: 2
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'; // define table name in options object
    await queryInterface.bulkDelete(options);
  }
};
