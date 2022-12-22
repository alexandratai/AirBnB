'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Spots';

    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "100 Demo Road",
        city: "Demo Town",
        state: "California",
        country: "United States",
        lat: 1000,
        lng: 2000,
        name: "Demo",
        description: "A very nice spot",
        price: 100,
        previewImage: "www.demo-house.io"
      },
      {
        ownerId: 2,
        address: "300 Demo Road",
        city: "Demo City",
        state: "New York",
        country: "United States",
        lat: 3000,
        lng: 4000,
        name: "Yay",
        description: "A very cool spot",
        price: 150,
        previewImage: "www.other-demo.io"
      },
      {
        ownerId: 3,
        address: "301 Demo Road",
        city: "Demo City",
        state: "New York",
        country: "United States",
        lat: 3010,
        lng: 4001,
        name: "Yay",
        description: "A very cool spot",
        price: 152,
        previewImage: "www.other-demos.io"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'; // define table name in options object
    await queryInterface.bulkDelete(options);
  }
};
