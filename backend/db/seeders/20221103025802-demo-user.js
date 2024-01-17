'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Users';

    await queryInterface.bulkInsert(options, [
      {
        firstName: 'Joe',
        lastName: 'King',
        email: 'joeking@user.io',
        username: 'joeking',
        hashedPassword: bcrypt.hashSync('password13')
      },
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'johnsmith@user.io',
        username: 'johnsmith',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@user.io',
        username: 'janedoe',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    options.tableName = 'Users'

    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'joeking', 'johnsmith', 'janedoe'] }
    }, {});
  }
};
