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
        previewImage: "https://media.architecturaldigest.com/photos/56f9add368aa959e79f353ec/master/w_2240%2Cc_limit/beach-houses-10.jpg"
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
        previewImage: "https://media.architecturaldigest.com/photos/56f9adcd68aa959e79f353df/master/w_2240%2Cc_limit/beach-houses-03.jpg"
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
        previewImage: "https://media.architecturaldigest.com/photos/56f9add115f605c343d44fd9/master/w_2240%2Cc_limit/beach-houses-08.jpg"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'; // define table name in options object
    await queryInterface.bulkDelete(options);
  }
};
