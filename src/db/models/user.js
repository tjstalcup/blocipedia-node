'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
	  unique: {
	  	  args: true,
		  msg: "This email is already in use."
	  },
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Name"
    }

  }, {});
  User.associate = function(models) {

      User.hasMany(models.Wiki, {
      foreignKey: "email",
      as: "userId"
    });
    
  };
  return User;
};