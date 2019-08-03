'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    vendor: DataTypes.STRING,
    height: DataTypes.DOUBLE,
    width: DataTypes.DOUBLE,
    weigth: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
    sku: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    categoriesId: DataTypes.INTEGER
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
    Products.belongsTo(models.Categories, { foreignKey: { name:"categoriesId", field: "categoriesId", allowNull: true }});
  };
  return Products;
};
