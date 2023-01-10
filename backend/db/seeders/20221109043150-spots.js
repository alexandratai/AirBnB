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
        address: "100 Seasonal Lane",
        city: "Mammoth Lakes",
        state: "California",
        country: "United States",
        lat: 1000,
        lng: 2000,
        name: "Mountainside Retreat",
        description: "Experience the convenience, craftsmanship, and tranquil ambiance of Mountainside, located directly across the street from Canyon Lodge.",
        price: 100,
        previewImage: "https://a0.muscache.com/im/pictures/e4d0922e-03d1-4194-808a-0d1609186e29.jpg?im_w=960"
      },
      {
        ownerId: 2,
        address: "300 Ibuku Road",
        city: "Abiansemal",
        state: "Bali",
        country: "Indonesia",
        lat: 3000,
        lng: 4000,
        name: "Bamboo House",
        description: "A beautiful bamboo house built on the west bank of the River Ayung.",
        price: 150,
        previewImage: "https://a0.muscache.com/im/pictures/e25a9b25-fa98-4160-bfd1-039287bf38b6.jpg?im_w=720"
      },
      {
        ownerId: 3,
        address: "301 Kellogg Lane",
        city: "Joshua Tree",
        state: "California",
        country: "United States",
        lat: 3010,
        lng: 4001,
        name: "The Kellogg Estate",
        description: "The Kellogg Estate is one of the most exclusive homes in the world.",
        price: 152,
        previewImage: "https://a0.muscache.com/im/pictures/1f6c495e-b877-4a48-9f2c-d8012f640166.jpg?im_w=960"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'; // define table name in options object
    await queryInterface.bulkDelete(options);
  }
};
