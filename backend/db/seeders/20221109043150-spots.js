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
        previewImage: "https://static.mansionglobal.com/production/media/article-images/87a32185a421fad515c48589c0d43243/large_BN-OY651_07121W_GR_20160718104302.jpg"
      },
      {
        ownerId: 2,
        address: "300 Ibuku Road",
        city: "Abiansemal",
        state: "Bali",
        country: "Indonesia",
        lat: 3000,
        lng: 4000,
        name: "Sandoval House",
        description: "A beautiful house built on the west bank of the River Ayung.",
        price: 150,
        previewImage: "http://cdn.home-designing.com/wp-content/uploads/2017/01/five-piece-chandelier-in-white-kitchen-grey.jpg"
      },
      {
        ownerId: 3,
        address: "301 Reve Lane",
        city: "Joshua Tree",
        state: "California",
        country: "United States",
        lat: 3010,
        lng: 4001,
        name: "The Reve Estate",
        description: "The Reve Estate is one of the most exclusive homes in the world.",
        price: 152,
        previewImage: "https://www.mydomaine.com/thmb/iP8D8w6_rbmUKPkhYZ43LoNoCHw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/HereDwelling-4a2e14a1892046ec8cde64bab4ab596b.jpg"
      },
      {
        ownerId: 1,
        address: "123 Baroque Court",
        city: "Beverly Hills",
        state: "California",
        country: "United States",
        lat: 3040,
        lng: 2041,
        name: "Chateau Laurel",
        description: "Just off North Beverly Hills Drive, this estate is in prime location for enjoying all this iconic area has to offer.",
        price: 14000,
        previewImage: "https://blog.canadianloghomes.com/wp-content/uploads/2022/02/rustic-luxury-interior-design.jpg"
      },
      {
        ownerId: 1,
        address: "25412 Cabrera Road",
        city: "Kecamatan Mengwi",
        state: "Bali",
        country: "Indonesia",
        lat: 6040,
        lng: 2641,
        name: "The River House",
        description: "An artistic and architectural triumph, this dynamic home offers a premium stay on Bali’s southern coast in elegant, modern surrounds.",
        price: 1200,
        previewImage: "https://cdn.shopify.com/s/files/1/0048/7194/6351/files/7FB044A1-C032-426C-B0A3-7E4A0D0EED9F.jpg?v=1638830638"
      },
      {
        ownerId: 1,
        address: "90 Villa Lane",
        city: "Las Catalinas",
        state: "Guanacaste Province",
        country: "Costa Rica",
        lat: 9034,
        lng: 2127,
        name: "Casa Pacifica",
        description: "This pretty white villa, built around a stone tower, has beautiful views of Playa Danta—and several terraces that make the most of those views.",
        price: 540,
        previewImage: "https://a0.muscache.com/im/pictures/f51243e1-9a9e-4f52-b16a-dea326324800.jpg?im_w=960"
      },
      {
        ownerId: 2,
        address: "127 Infinity Road",
        city: "Malibu",
        state: "California",
        country: "United States",
        lat: 9054,
        lng: 2126,
        name: "Studio Blanco",
        description: "Open & light contemporary featuring breathtaking views.",
        price: 540,
        previewImage: "https://a0.muscache.com/im/pictures/a7a4cd9c-16f4-4a05-8ebc-a5c7605c5171.jpg?im_w=720"
      },
      {
        ownerId: 3,
        address: "7 Sherwin Place",
        city: "New York City",
        state: "New York",
        country: "United States",
        lat: 9154,
        lng: 7186,
        name: "Sherwin Townhouse",
        description: "This newly renovated Townhome is located on a tree-lined street in the Upper Manhattan of Historic Harlem.",
        price: 150,
        previewImage: "https://a0.muscache.com/im/pictures/770e0a69-cd34-4929-accd-a51903d48cd4.jpg?im_w=960"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'; // define table name in options object
    await queryInterface.bulkDelete(options);
  }
};
