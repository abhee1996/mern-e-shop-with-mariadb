module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define("OrderItem", {
    orderitemUuid: {
      type: DataTypes.UUID,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ordered_product_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });
  OrderItem.associate = (models) => {
    //   OrderItem.belongsTo(models.Products, {
    //     foreignKey: "orderedProductId",
    //     onDelete: "cascade",
    //   });
    //   OrderItem.hasOne(models.Orders, {
    //     foreignKey: "orderedItemId",
    //     onDelete: "cascade",
    //   });
  };
  return OrderItem;
};
