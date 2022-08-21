module.exports = (sequelize, DataTypes) => {
  const Conversations = sequelize.define("Conversations", {
    conversations_uuid: {
      type: DataTypes.UUID(36),
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    },
    title: {
      type: DataTypes.STRING(200),
    },
    sender_uuid: {
      type: DataTypes.UUID(36),
    },
    receiver_uuid: {
      type: DataTypes.UUID(36),
    },
    request_message_uuid: {
      type: DataTypes.UUID(36),
    },
    assigned_to: {
      type: DataTypes.INTEGER(11),
    },
    state: {
      type: DataTypes.BOOLEAN,
    },
  });
  Conversations.associate = (models) => {};
  return Conversations;
};
