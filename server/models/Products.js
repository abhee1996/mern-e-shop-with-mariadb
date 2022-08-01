module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productUuid: {
      type: DataTypes.UUID,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    richDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    images_gallery_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    countInStock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numReviews: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    category_uuid: {
      type: DataTypes.UUID,
    },
    shop_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });
  Products.associate = (models) => {
    // Products.hasMany(models.Reviews, {
    //   onDelete: "cascade",
    // });
    // Products.hasMany(models.ProductImages, {
    //   foreignKey: "product_id",
    //   onDelete: "cascade",
    // });
    // Products.belongsTo(models.Shop, {
    //   onDelete: "cascade",
    // });
    // Products.belongsTo(models.Category, {
    //   onDelete: "cascade",
    // });
    // Products.hasOne(models.OrderItem, {
    //   foreignKey: "orderedProductId",
    //   onDelete: "cascade",
    // });
  };
  return Products;
};
