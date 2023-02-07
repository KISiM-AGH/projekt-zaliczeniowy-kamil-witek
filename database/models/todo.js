'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    text: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return Todo;
};