module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
    orderUuid: {
      type: DataTypes.UUID,
    },
    shippingAddress1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shippingAddress2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    orderedItem_uuid: {
      type: DataTypes.UUID,
    },
    user_uid: {
      type: DataTypes.UUID,
    },
    shop_uuid: {
      type: DataTypes.UUID,
    },
  });
  Orders.associate = (models) => {
    //   Orders.belongsTo(models.OrderItem, {
    //     foreignKey: "orderedItemId",
    //     onDelete: "cascade",
    //   });
    //   Orders.belongsTo(models.Users, {
    //     foreignKey: "userOrderedId",
    //     onDelete: "cascade",
    //   });
  };
  return Orders;
};
