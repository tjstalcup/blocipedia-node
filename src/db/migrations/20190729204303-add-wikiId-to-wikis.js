"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      "Wikis",
      "wikiId",
      {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: "Wiki",
          key: "id",
          as: "wikiId"
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Wikis", "wikiId");
  }
};