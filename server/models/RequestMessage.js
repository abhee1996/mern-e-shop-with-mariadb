module.exports = (sequelize, DataTypes) => {
  const RequestMessages = sequelize.define("Request_Messages", {
    request_message_uuid: {
      type: DataTypes.UUID(36),
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    },
    sender_uuid: {
      type: DataTypes.UUID(36),
    },
    title: {
      type: DataTypes.STRING(200),
    },
    message: {
      type: DataTypes.TEXT,
    },
    timestamp: {
      type: DataTypes.DATE(6),
    },
  });
  RequestMessages.associate = (models) => {};
  return RequestMessages;
};
