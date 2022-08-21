module.exports = (sequelize, DataTypes) => {
  const ConversationsMessages = sequelize.define("Conversations_Messages", {
    conversation_message_uuid: {
      type: DataTypes.UUID(36),
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    },
    conversations_uuid: {
      type: DataTypes.UUID(36),
    },
    sender_uuid: {
      type: DataTypes.UUID(36),
    },
    receiver_uuid: {
      type: DataTypes.UUID(36),
    },
    message: {
      type: DataTypes.TEXT,
    },
    message_type: {
      type: DataTypes.ENUM,
      values: ["text", "image", ""],
    },
    accessToSender: {
      type: DataTypes.BOOLEAN,
    },
    accesstoReceiver: {
      type: DataTypes.BOOLEAN,
    },
    is_seen: {
      type: DataTypes.BOOLEAN,
    },
  });
  ConversationsMessages.associate = (models) => {};
  return ConversationsMessages;
};
