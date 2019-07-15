'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Wikis', [{
        title: "Toast",
        body: "Toast is objectively the best food. Made in a toaster. Composed of bread. Best topped with avocado.",
        private: false,
        createdAt: '2004-10-19 10:23:54',
        updatedAt: '2004-10-19 10:23:54'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wikis', null, {});
  }
};
