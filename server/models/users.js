module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    user_uid: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    city: {
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
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });
  Users.associate = (models) => {
    //   // Users.hasOne(models.Shop, {
    //   //   onDelete: "cascade",
    //   // });
    //   Users.hasOne(models.Orders, {
    //     foreignKey: "userOrderedId",
    //     onDelete: "cascade",
    //   });
  };
  return Users;
};
