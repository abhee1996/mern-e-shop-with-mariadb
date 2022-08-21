module.exports = (sequelize, DataTypes) => {
  const FireStoreChatRoom = sequelize.define("FireStoreChatRoom", {
    chatroom_uuid: {
      type: DataTypes.STRING(53),
      // defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    },

    sender_uuid: {
      type: DataTypes.STRING(36),
    },
    receiver_uuid: {
      type: DataTypes.STRING(36),
    },
    request_message_uuid: {
      type: DataTypes.STRING(36),
    },
    assigned_to: {
      type: DataTypes.INTEGER(11),
    },
    state: {
      type: DataTypes.BOOLEAN,
    },
  });
  FireStoreChatRoom.associate = (models) => {};
  return FireStoreChatRoom;
};
