module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    comment_body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.UUID,
    },
  });
  Comments.associate = (models) => {
    //   Comments.belongsTo(models.Posts, {
    //     onDelete: "cascade",
    //   });
  };
  return Comments;
};
