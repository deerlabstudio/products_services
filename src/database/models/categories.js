'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Categories.associate = function(models) {
    // associations can be defined here
    Categories.hasMany(models.Products, {
      foreignKey: {
        name:"categoriesId",
        field: "categoriesId",
        allowNull: true
      }
    });
  };
  return Categories;
};
