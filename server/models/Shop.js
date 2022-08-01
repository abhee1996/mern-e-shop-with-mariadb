module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define("Shop", {
    shopUuid: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    owner: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    discription: {
      type: DataTypes.STRING,
    },
    place: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
    },
  });
  Shop.associate = (models) => {
    //   Shop.belongsTo(models.User, {
    //     onDelete: "cascade",
    //   });
    // };
    // Shop.associate = (models) => {
    //   Shop.hasMany(models.Products, {
    //     onDelete: "cascade",
    //   });
  };
  return Shop;
};
