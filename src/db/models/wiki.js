'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wiki = sequelize.define('Wiki', {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    title: {
	  type: DataTypes.STRING,
	  allowNull: false
	  },

    body: {
	  type: DataTypes.STRING,
	  allowNull: false
	  },

    private: {
	  type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Wiki.associate = function(models) {
      Wiki.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE"
      });
  };
  return Wiki;
};