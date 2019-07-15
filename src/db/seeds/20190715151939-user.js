'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        email: 'demo@demo.com',
        password: 'password123',
        name: 'John Doe',
        createdAt: '2004-10-19 10:23:54',
        updatedAt: '2004-10-19 10:23:54'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
