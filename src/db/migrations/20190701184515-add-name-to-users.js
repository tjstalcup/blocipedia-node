"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Users",
      "name",
      {
        type: Sequelize.STRING,
        allowNull: false,

 // #1
        defaultValue: "Name"
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "name");
  }
};

