module.exports = (sequelize, DataTypes) => {
  const ProductImages = sequelize.define("ProductImages", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_images: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_uuid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  ProductImages.associate = (models) => {
    // ProductImages.belongsTo(models.Products, {
    //   foreignKey: "product_id",
    //   onDelete: "cascade",
    // });
  };
  return ProductImages;
};
