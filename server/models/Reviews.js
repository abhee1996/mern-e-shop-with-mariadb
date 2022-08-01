module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define("Reviews", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_uuid: {
      type: DataTypes.UUID,
    },
  });
  Reviews.associate = (models) => {
    //   Reviews.belongsTo(models.Products, {
    //     onDelete: "cascade",
    //   });
  };
  return Reviews;
};
