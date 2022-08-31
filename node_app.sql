/*
 Navicat Premium Data Transfer

 Source Server         : Mariadb
 Source Server Type    : MariaDB
 Source Server Version : 100512
 Source Host           : localhost:3307
 Source Schema         : node_app

 Target Server Type    : MariaDB
 Target Server Version : 100512
 File Encoding         : 65001

 Date: 31/08/2022 11:22:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `image` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `color` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (1, 'Laptops', 'laptops-2198770_1280.png', 'img.jpg', 'Purple', '2022-07-20 15:50:57', '2022-07-20 15:50:57');
INSERT INTO `categories` VALUES (2, 'gardening', 'gardening-2198770_1280.png', 'img.jpg', 'green', '2022-07-20 15:51:28', '2022-07-20 15:51:28');
INSERT INTO `categories` VALUES (3, 'grocery', 'grocery-2198770_1280.png', 'img.jpg', 'yellow', '2022-07-20 15:51:41', '2022-07-20 15:51:41');
INSERT INTO `categories` VALUES (4, 'cloths', 'cloths-2198770_1280.png', 'img.jpg', 'yellow', '2022-07-27 07:53:52', '2022-07-27 07:53:52');
INSERT INTO `categories` VALUES (5, 'pets and animals', 'pets_&_animals-2198770_1280.png', 'pets_&_animals.jpg', 'yellow', '2022-07-28 14:08:41', '2022-07-28 14:08:41');
INSERT INTO `categories` VALUES (6, 'Electronic Appliences', 'Electronic_appliences-2198770_1280.png', 'Electronic_appliences.jpg', 'yellow', '2022-07-28 14:14:34', '2022-07-28 14:14:34');
INSERT INTO `categories` VALUES (7, 'mobile_Phones', 'mobile_Phones-2198770_1280.png', 'mobile_Phones.jpg', 'yellow', '2022-07-28 14:15:55', '2022-07-28 14:15:55');
INSERT INTO `categories` VALUES (8, 'Cosmatics', 'Cosmatics-2198770_1280.png', 'Cosmatics.jpg', 'yellow', '2022-08-01 10:09:13', '2022-08-01 10:09:13');
INSERT INTO `categories` VALUES (9, 'fruits', 'fruits-234347_9803.png', 'fruits.jpg', 'green', '2022-08-15 10:09:13', '2022-08-01 10:09:13');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_body` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `postId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comments
-- ----------------------------

-- ----------------------------
-- Table structure for conversations
-- ----------------------------
DROP TABLE IF EXISTS `conversations`;
CREATE TABLE `conversations`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conversations_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `title` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `sender_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `receiver_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `request_message_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `assigned_to` int(11) NULL DEFAULT NULL,
  `state` tinyint(1) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of conversations
-- ----------------------------

-- ----------------------------
-- Table structure for conversations_messages
-- ----------------------------
DROP TABLE IF EXISTS `conversations_messages`;
CREATE TABLE `conversations_messages`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conversation_message_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `conversations_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `sender_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `receiver_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `message` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `message_type` enum('text','image','') CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `accessToSender` tinyint(1) NULL DEFAULT NULL,
  `accesstoReceiver` tinyint(1) NULL DEFAULT NULL,
  `is_seen` tinyint(1) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of conversations_messages
-- ----------------------------

-- ----------------------------
-- Table structure for firestorechatrooms
-- ----------------------------
DROP TABLE IF EXISTS `firestorechatrooms`;
CREATE TABLE `firestorechatrooms`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chatroom_uuid` char(53) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `sender_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `receiver_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `request_message_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `assigned_to` int(11) NULL DEFAULT NULL,
  `state` tinyint(1) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of firestorechatrooms
-- ----------------------------
INSERT INTO `firestorechatrooms` VALUES (1, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '2022-08-16 11:15:02', '2022-08-16 11:15:02');
INSERT INTO `firestorechatrooms` VALUES (2, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '2022-08-16 11:18:06', '2022-08-16 11:18:06');
INSERT INTO `firestorechatrooms` VALUES (3, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '2022-08-16 11:20:45', '2022-08-16 11:20:45');
INSERT INTO `firestorechatrooms` VALUES (4, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '2022-08-16 11:24:05', '2022-08-16 11:24:05');
INSERT INTO `firestorechatrooms` VALUES (5, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '2022-08-16 11:25:30', '2022-08-16 11:25:30');
INSERT INTO `firestorechatrooms` VALUES (6, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '2022-08-16 11:27:39', '2022-08-16 11:27:39');
INSERT INTO `firestorechatrooms` VALUES (7, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '2022-08-16 11:31:03', '2022-08-16 11:31:03');
INSERT INTO `firestorechatrooms` VALUES (8, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-16 11:33:28');
INSERT INTO `firestorechatrooms` VALUES (9, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-16 11:38:53');
INSERT INTO `firestorechatrooms` VALUES (10, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-16 11:40:48');
INSERT INTO `firestorechatrooms` VALUES (11, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-16 11:41:50');
INSERT INTO `firestorechatrooms` VALUES (12, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-17 07:01:08');
INSERT INTO `firestorechatrooms` VALUES (13, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-17 11:52:13');
INSERT INTO `firestorechatrooms` VALUES (14, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-17 11:56:37');
INSERT INTO `firestorechatrooms` VALUES (15, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-17 11:56:53');
INSERT INTO `firestorechatrooms` VALUES (16, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-17 11:57:25');
INSERT INTO `firestorechatrooms` VALUES (17, 'Shop3321120998478240770547-3321120998478240770547', 'User3321118386350696202957', 'Shop3321120998478240770547', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-17 12:01:11');
INSERT INTO `firestorechatrooms` VALUES (19, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-17 14:29:03');
INSERT INTO `firestorechatrooms` VALUES (20, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-17 14:31:46');
INSERT INTO `firestorechatrooms` VALUES (21, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-17 14:31:52');
INSERT INTO `firestorechatrooms` VALUES (22, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-17 15:13:25');
INSERT INTO `firestorechatrooms` VALUES (23, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-17 15:14:05');
INSERT INTO `firestorechatrooms` VALUES (24, 'chatroom33214865756208598100-3321486905632847442438', 'User33214865756208598100', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-17 15:18:34');
INSERT INTO `firestorechatrooms` VALUES (25, 'chatroom33214865756208598100-3321486905632847442438', 'User33214865756208598100', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-17 15:18:49');
INSERT INTO `firestorechatrooms` VALUES (26, 'chatroom33214865756208598100-3321486905632847442438', 'User33214865756208598100', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-17 15:19:03');
INSERT INTO `firestorechatrooms` VALUES (27, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-18 15:14:03');
INSERT INTO `firestorechatrooms` VALUES (28, 'chatroom33214865756208598100-3321486905632847442438', 'User33214865756208598100', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-18 15:16:22');
INSERT INTO `firestorechatrooms` VALUES (29, 'chatroom33214865756208598100-3321486905632847442438', 'User33214865756208598100', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-19 13:38:01');
INSERT INTO `firestorechatrooms` VALUES (30, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-24 08:55:51');
INSERT INTO `firestorechatrooms` VALUES (31, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-24 08:56:30');
INSERT INTO `firestorechatrooms` VALUES (32, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-24 08:57:18');
INSERT INTO `firestorechatrooms` VALUES (33, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-24 09:00:56');
INSERT INTO `firestorechatrooms` VALUES (34, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-24 09:13:36');
INSERT INTO `firestorechatrooms` VALUES (35, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-24 14:24:09');
INSERT INTO `firestorechatrooms` VALUES (36, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-24 15:02:31');
INSERT INTO `firestorechatrooms` VALUES (37, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-24 15:09:28');
INSERT INTO `firestorechatrooms` VALUES (38, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-25 07:21:07');
INSERT INTO `firestorechatrooms` VALUES (39, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-25 07:33:00');
INSERT INTO `firestorechatrooms` VALUES (40, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-25 07:34:44');
INSERT INTO `firestorechatrooms` VALUES (41, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-25 07:41:16');
INSERT INTO `firestorechatrooms` VALUES (42, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-25 07:46:18');
INSERT INTO `firestorechatrooms` VALUES (43, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-25 07:46:26');
INSERT INTO `firestorechatrooms` VALUES (44, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-25 07:48:43');
INSERT INTO `firestorechatrooms` VALUES (45, 'chatroom3321486422822701957046-3321486905632847442438', 'User3321486422822701957046', 'Shop3321486905632847442438', NULL, NULL, NULL, '0000-00-00 00:00:00', '2022-08-25 07:52:39');

-- ----------------------------
-- Table structure for orderitems
-- ----------------------------
DROP TABLE IF EXISTS `orderitems`;
CREATE TABLE `orderitems`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderitemUuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `quantity` int(11) NULL DEFAULT NULL,
  `ordered_product_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orderitems
-- ----------------------------
INSERT INTO `orderitems` VALUES (1, 'OrderItem3317506628378531524831', 1, 'Product3316802422284264966902', '2022-07-25 12:48:34', '2022-07-25 12:48:34');
INSERT INTO `orderitems` VALUES (2, 'OrderItem3317524174610878555990', 1, 'Product3316802422284264966902', '2022-07-25 15:14:47', '2022-07-25 15:14:47');
INSERT INTO `orderitems` VALUES (3, 'OrderItem3317524174610878555990', 1, 'Product3316802422284264966902', '2022-07-25 15:14:47', '2022-07-25 15:14:47');
INSERT INTO `orderitems` VALUES (4, 'OrderItem3317638869152304428115', 1, 'Product3316802422284264966902', '2022-07-26 07:10:34', '2022-07-26 07:10:34');
INSERT INTO `orderitems` VALUES (5, 'OrderItem3317638869152304428115', 1, 'Product3316802422284264966902', '2022-07-26 07:10:34', '2022-07-26 07:10:34');
INSERT INTO `orderitems` VALUES (6, 'OrderItem3317639904108718372790', 1, 'Product3316802422284264966902', '2022-07-26 07:19:12', '2022-07-26 07:19:12');
INSERT INTO `orderitems` VALUES (7, 'OrderItem3317639904108718372790', 1, 'Product3316802422284264966902', '2022-07-26 07:19:12', '2022-07-26 07:19:12');
INSERT INTO `orderitems` VALUES (8, 'OrderItem3317690580160801537128', 1, 'Product3317657161368253677689', '2022-07-26 14:21:30', '2022-07-26 14:21:30');
INSERT INTO `orderitems` VALUES (9, 'OrderItem3317690580160801537128', 1, 'Product3316802422284264966902', '2022-07-26 14:21:30', '2022-07-26 14:21:30');
INSERT INTO `orderitems` VALUES (10, 'OrderItem3317692260376340302795', 1, 'Product3317657161368253677689', '2022-07-26 14:35:30', '2022-07-26 14:35:30');
INSERT INTO `orderitems` VALUES (11, 'OrderItem3317692260376340302795', 1, 'Product3316802422284264966902', '2022-07-26 14:35:30', '2022-07-26 14:35:30');
INSERT INTO `orderitems` VALUES (12, 'OrderItem3317693002676239429560', 1, 'Product3316802422284264966902', '2022-07-26 14:41:41', '2022-07-26 14:41:41');
INSERT INTO `orderitems` VALUES (13, 'OrderItem3317693088254698039704', 1, 'Product3316802422284264966902', '2022-07-26 14:42:24', '2022-07-26 14:42:24');
INSERT INTO `orderitems` VALUES (14, 'OrderItem3317694148678483804484', 1, 'Product3316802422284264966902', '2022-07-26 14:51:14', '2022-07-26 14:51:14');
INSERT INTO `orderitems` VALUES (15, 'OrderItem3317695587370377801570', 1, 'Product3316802422284264966902', '2022-07-26 15:03:13', '2022-07-26 15:03:13');
INSERT INTO `orderitems` VALUES (16, 'OrderItem3318006306730505688227', 1, 'Product3316802422284264966902', '2022-07-28 10:12:33', '2022-07-28 10:12:33');
INSERT INTO `orderitems` VALUES (17, 'OrderItem3318006306730505688227', 1, 'Product3317827464746364078554', '2022-07-28 10:12:33', '2022-07-28 10:12:33');
INSERT INTO `orderitems` VALUES (18, 'OrderItem3318020740200403785329', 1, 'Product3316802422284264966902', '2022-07-28 12:12:50', '2022-07-28 12:12:50');
INSERT INTO `orderitems` VALUES (19, 'OrderItem3318194054804739899429', NULL, NULL, '2022-07-29 12:17:07', '2022-07-29 12:17:07');
INSERT INTO `orderitems` VALUES (20, 'OrderItem331819417039624477629', NULL, NULL, '2022-07-29 12:18:05', '2022-07-29 12:18:05');
INSERT INTO `orderitems` VALUES (21, 'OrderItem3318194249586564401745', NULL, NULL, '2022-07-29 12:18:44', '2022-07-29 12:18:44');
INSERT INTO `orderitems` VALUES (22, 'OrderItem3318194875178892318142', NULL, 'Shop3317695829394431406893', '2022-07-29 12:23:57', '2022-07-29 12:23:57');
INSERT INTO `orderitems` VALUES (23, 'OrderItem3318195500902619760203', NULL, 'Shop3317695829394431406893', '2022-07-29 12:29:10', '2022-07-29 12:29:10');
INSERT INTO `orderitems` VALUES (24, 'OrderItem331867519181847610943', 1, NULL, '2022-08-01 07:06:35', '2022-08-01 07:06:35');
INSERT INTO `orderitems` VALUES (25, 'OrderItem331904731662458709107', NULL, 'Shop3317500883994305079770', '2022-08-03 10:47:38', '2022-08-03 10:47:38');
INSERT INTO `orderitems` VALUES (26, 'OrderItem331904731662458709107', NULL, 'Shop3317695829394431406893', '2022-08-03 10:47:38', '2022-08-03 10:47:38');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderUuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `shippingAddress1` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `shippingAddress2` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `phone` int(11) NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `country` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `zipcode` int(11) NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `totalPrice` int(11) NULL DEFAULT NULL,
  `orderedItem_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `user_uid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `shop_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, 'Order3317506628378617318447', 'bgbgbgbgbgbg', 'cdcdcdcd', 2147483647, 'ere', 'AX', NULL, 252525252, 'Pending', 32, 'OrderItem3317506628378531524831', 'User3317477019592895208157', 'Shop3316654037436579110870', '2022-07-25 12:48:34', '2022-07-25 12:48:34');
INSERT INTO `orders` VALUES (2, 'Order3317638869152235729702', 'gbggbgbggbgbbg', 'vfvfddcxsxszaza', 1414144114, 'nhhn', 'AL', NULL, 2147483647, 'Pending', 64, 'OrderItem3317638869152304428115', 'User3317508949614474770836', 'Shop3316654037436579110870', '2022-07-26 07:10:34', '2022-07-26 07:10:34');
INSERT INTO `orders` VALUES (3, 'Order3317639904108275182512', 'dfdfreertgyhu', 'vfbgnhmjkilo', 32323, 'frbg', 'DZ', NULL, 2147483647, 'Pending', 64, 'OrderItem3317639904108718372790', 'User3317508949614474770836', 'Shop3316654037436579110870', '2022-07-26 07:19:12', '2022-07-26 07:19:12');
INSERT INTO `orders` VALUES (4, 'Order3317690580160755188494', 'ggvvgvgvgvggvvgvg', 'vgbhbhjjnjkk', 2147483647, 'tyty', 'AF', NULL, 212121, 'Pending', 64, 'OrderItem3317690580160801537128', 'User3317689512580781987841', 'Shop3316654037436579110870', '2022-07-26 14:21:30', '2022-07-26 14:21:30');
INSERT INTO `orders` VALUES (5, 'Order3317692260376354455392', 'ggvvgvgvgvggvvgvg', 'vgbhbhjjnjkk', 2147483647, 'tyty', 'AF', NULL, 212121, 'Pending', 64, 'OrderItem3317692260376340302795', 'User3317689512580781987841', 'Shop3316654037436579110870', '2022-07-26 14:35:30', '2022-07-26 14:35:30');
INSERT INTO `orders` VALUES (6, 'Order3317693002676383657950', 'ghhgghghgh', 'vgvggvgvvg', 1221212121, 'jnjnj', 'DZ', NULL, 11245, 'Pending', 32, 'OrderItem3317693002676239429560', 'User3317689512580781987841', 'Shop3316654037436579110870', '2022-07-26 14:41:41', '2022-07-26 14:41:41');
INSERT INTO `orders` VALUES (7, 'Order3317693088254991995291', 'ghhgghghgh', 'vgvggvgvvg', 1221212121, 'jnjnj', 'DZ', NULL, 11245, 'Pending', 32, 'OrderItem3317693088254698039704', 'User3317689512580781987841', 'Shop3316654037436579110870', '2022-07-26 14:42:24', '2022-07-26 14:42:24');
INSERT INTO `orders` VALUES (8, 'Order3317694148678883907041', 'ghhgghghgh', 'vgvggvgvvg', 1221212121, 'jnjnj', 'DZ', NULL, 11245, 'Pending', 32, 'OrderItem3317694148678483804484', 'User3317689512580781987841', 'Shop3316654037436579110870', '2022-07-26 14:51:14', '2022-07-26 14:51:14');
INSERT INTO `orders` VALUES (9, 'Order3317695587370368873332', 'dfdfdf', 'dfdfdf', 343434, 'cvcv', NULL, NULL, 34344, 'Pending', 32, 'OrderItem3317695587370377801570', 'User3317689512580781987841', 'Shop3316654037436579110870', '2022-07-26 15:03:13', '2022-07-26 15:03:13');
INSERT INTO `orders` VALUES (10, 'Order3318006306730224281228', 'hjhjhjhjhjhj nnhnh bbgbg gtgtghyhy ujuu', 'gtgtgt hyyh  nn bvbvbv mjk ,ll', 2147483647, 'rttr yt ', 'AL', NULL, 54454545, 'Pending', 68, 'OrderItem3318006306730505688227', 'User3317689512580781987841', 'Shop3317695829394431406893', '2022-07-28 10:12:33', '2022-07-28 10:12:33');
INSERT INTO `orders` VALUES (11, 'Order3318020740200104116301', 'fgfgfgfgf', 'vfvvv', 2147483647, 'ddddd', 'AL', NULL, 22222, 'Pending', 32, 'OrderItem3318020740200403785329', 'User3317689512580781987841', 'Shop3316654037436579110870', '2022-07-28 12:12:50', '2022-07-28 12:12:50');
INSERT INTO `orders` VALUES (12, 'Order3318195500902108726202', 'DHA LAYAQAT CHOWQ', 'dha laiqat chowk', 2147483647, 'lahore', 'PK', NULL, 32232323, 'Pending', 2200, 'OrderItem3318195500902619760203', 'User3317689512580781987841', 'Shop3317695829394431406893', '2022-07-29 12:29:10', '2022-07-29 12:29:10');
INSERT INTO `orders` VALUES (13, 'Order331867519181838114323', 'King STreet London', '13 Down Street London', 2147483647, 'London', 'GB', NULL, 0, 'Pending', 2200, 'OrderItem331867519181847610943', 'User3317689512580781987841', NULL, '2022-08-01 07:06:35', '2022-08-01 07:06:35');
INSERT INTO `orders` VALUES (14, 'Order3319047316624530881610', 'some where in london', 'some where in england', 2147483647, 'london', 'DZ', NULL, 14141414, 'Pending', 2400, 'OrderItem331904731662458709107', 'User3318676939608582370004', 'Shop3317695829394431406893', '2022-08-03 10:47:38', '2022-08-03 10:47:38');

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `postText` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of posts
-- ----------------------------

-- ----------------------------
-- Table structure for productimages
-- ----------------------------
DROP TABLE IF EXISTS `productimages`;
CREATE TABLE `productimages`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_images` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `product_uuid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of productimages
-- ----------------------------
INSERT INTO `productimages` VALUES (7, 'http://192.168.93.13:5000/public/uploads/istockphoto-1202870693-612x612-jpg-1658401211011.jpeg', 'Product3316802422284264966902', '2022-07-21 11:00:11', '2022-07-21 11:00:11');
INSERT INTO `productimages` VALUES (8, 'http://192.168.93.13:5000/public/uploads/istockphoto-1204583853-612x612-jpg-1658401211012.jpeg', 'Product3316802422284264966902', '2022-07-21 11:00:11', '2022-07-21 11:00:11');
INSERT INTO `productimages` VALUES (9, 'http://192.168.93.13:5000/public/uploads/tree-ga973539e0_1280-jpg-1658828580491.jpeg', 'Product3317657161368253677689', '2022-07-26 09:43:00', '2022-07-26 09:43:00');
INSERT INTO `productimages` VALUES (10, 'http://192.168.93.13:5000/public/uploads/tree-g641352d68_1280-jpg-1658828580657.jpeg', 'Product3317657161368253677689', '2022-07-26 09:43:00', '2022-07-26 09:43:00');
INSERT INTO `productimages` VALUES (11, 'http://192.168.93.13:5000/public/uploads/dog-gd4f8ae28d_1920-jpg-1658828580658.jpeg', 'Product3317657161368253677689', '2022-07-26 09:43:00', '2022-07-26 09:43:00');
INSERT INTO `productimages` VALUES (12, 'http://192.168.93.13:5000/public/uploads/tree-ga973539e0_1280-jpg-1658848207617.jpeg', 'Product3317696416096501377887', '2022-07-26 15:10:08', '2022-07-26 15:10:08');
INSERT INTO `productimages` VALUES (13, 'http://192.168.93.13:5000/public/uploads/tree-g641352d68_1280-jpg-1658848207624.jpeg', 'Product3317696416096501377887', '2022-07-26 15:10:08', '2022-07-26 15:10:08');
INSERT INTO `productimages` VALUES (14, 'http://192.168.93.13:5000/public/uploads/cat-g385fd4b39_1920-jpg-1658848207993.jpeg', 'Product3317696416096501377887', '2022-07-26 15:10:08', '2022-07-26 15:10:08');
INSERT INTO `productimages` VALUES (15, 'http://192.168.93.13:5000/public/uploads/tree-g641352d68_1280-jpg-1658848280482.jpeg', 'Product331769656119474093936', '2022-07-26 15:11:20', '2022-07-26 15:11:20');
INSERT INTO `productimages` VALUES (16, 'http://192.168.93.13:5000/public/uploads/cat-g385fd4b39_1920-jpg-1658848280487.jpeg', 'Product331769656119474093936', '2022-07-26 15:11:20', '2022-07-26 15:11:20');
INSERT INTO `productimages` VALUES (17, 'http://192.168.93.13:5000/public/uploads/dog-gd4f8ae28d_1920-jpg-1658908504607.jpeg', 'Product331781700958666260382', '2022-07-27 07:55:04', '2022-07-27 07:55:04');
INSERT INTO `productimages` VALUES (18, 'http://192.168.93.13:5000/public/uploads/tree-g641352d68_1280-jpg-1658908504764.jpeg', 'Product331781700958666260382', '2022-07-27 07:55:04', '2022-07-27 07:55:04');
INSERT INTO `productimages` VALUES (19, 'http://192.168.93.13:5000/public/uploads/cat-g385fd4b39_1920-jpg-1658913732185.jpeg', 'Product3317827464746364078554', '2022-07-27 09:22:12', '2022-07-27 09:22:12');
INSERT INTO `productimages` VALUES (20, 'http://192.168.93.13:5000/public/uploads/tree-g641352d68_1280-jpg-1658913732354.jpeg', 'Product3317827464746364078554', '2022-07-27 09:22:12', '2022-07-27 09:22:12');
INSERT INTO `productimages` VALUES (21, 'http://192.168.93.13:5000/public/uploads/dog-gd4f8ae28d_1920-jpg-1659010666324.jpeg', 'Product3318021332998800419532', '2022-07-28 12:17:46', '2022-07-28 12:17:46');
INSERT INTO `productimages` VALUES (22, 'http://192.168.93.13:5000/public/uploads/tree-g641352d68_1280-jpg-1659010666438.jpeg', 'Product3318021332998800419532', '2022-07-28 12:17:46', '2022-07-28 12:17:46');
INSERT INTO `productimages` VALUES (23, 'http://192.168.93.13:5000/public/uploads/cat-g385fd4b39_1920-jpg-1659010666438.jpeg', 'Product3318021332998800419532', '2022-07-28 12:17:46', '2022-07-28 12:17:46');
INSERT INTO `productimages` VALUES (24, 'http://192.168.0.102:5000/public/uploads/tree-ga973539e0_1280-jpg-1659205570365.jpeg', 'Product3318411141490629695563', '2022-07-30 18:26:10', '2022-07-30 18:26:10');
INSERT INTO `productimages` VALUES (25, 'http://192.168.0.102:5000/public/uploads/tree-g641352d68_1280-jpg-1659205570712.jpeg', 'Product3318411141490629695563', '2022-07-30 18:26:10', '2022-07-30 18:26:10');
INSERT INTO `productimages` VALUES (26, 'http://192.168.0.102:5000/public/uploads/Reno4-5G-navigation-Black-v2-png-1659206189566.png', 'Product3318412379834836206973', '2022-07-30 18:36:29', '2022-07-30 18:36:29');
INSERT INTO `productimages` VALUES (27, 'http://192.168.0.102:5000/public/uploads/images-parameter-shouping-tagore_496@d5-224d73-496x477-jpg-1659206189914.jpeg', 'Product3318412379834836206973', '2022-07-30 18:36:29', '2022-07-30 18:36:29');
INSERT INTO `productimages` VALUES (28, 'http://192.168.93.13:5000/public/uploads/images-(2)-jpeg-1659348638403.jpeg', 'Product3318697277086277279797', '2022-08-01 10:10:38', '2022-08-01 10:10:38');
INSERT INTO `productimages` VALUES (29, 'http://192.168.93.13:5000/public/uploads/1093441-jpg-1660564586996.jpeg', 'Product3321129174850479527', '2022-08-15 11:56:27', '2022-08-15 11:56:27');
INSERT INTO `productimages` VALUES (30, 'http://192.168.93.13:5000/public/uploads/1090233-jpg-1660564587338.jpeg', 'Product3321129174850479527', '2022-08-15 11:56:27', '2022-08-15 11:56:27');
INSERT INTO `productimages` VALUES (31, 'http://192.168.93.13:5000/public/uploads/fUPiCF-jpg-1660565385545.jpeg', 'Product332113077169870508383', '2022-08-15 12:09:45', '2022-08-15 12:09:45');
INSERT INTO `productimages` VALUES (32, 'http://192.168.93.13:5000/public/uploads/wp9376285-jpg-1660565891493.jpeg', 'Product3321131783194597722344', '2022-08-15 12:18:11', '2022-08-15 12:18:11');
INSERT INTO `productimages` VALUES (33, 'http://192.168.93.13:5000/public/uploads/wp4958043-jpg-1660744344906.jpeg', 'Product3321488690652556699077', '2022-08-17 13:52:25', '2022-08-17 13:52:25');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productUuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `sku` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `richDescription` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `images_gallery_count` int(11) NULL DEFAULT NULL,
  `brand` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `price` int(11) NULL DEFAULT NULL,
  `countInStock` int(11) NULL DEFAULT NULL,
  `rating` int(11) NULL DEFAULT NULL,
  `numReviews` int(11) NULL DEFAULT NULL,
  `isFeatured` tinyint(1) NULL DEFAULT NULL,
  `category_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `shop_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES (6, 'Product3316802422284264966902', 'product 1', 'sku 1', 'description 1', NULL, 'http://192.168.93.13:5000/public/uploads/istockphoto-1202870693-612x612-jpg-1658401211011.jpeg', 2, 'Brand 1', 32, 22323, 0, 0, 0, '1', 'Shop3316654037436579110870', '2022-07-21 11:00:11', '2022-07-21 11:00:11');
INSERT INTO `products` VALUES (7, 'Product3317657161368253677689', 'product 2', 'sku 2', 'description 2', NULL, 'http://192.168.93.13:5000/public/uploads/tree-ga973539e0_1280-jpg-1658828580491.jpeg', 3, 'brand 2', 233, 3454, 0, 0, 0, '2', 'Shop3316654037436579110870', '2022-07-26 09:43:00', '2022-07-26 09:43:00');
INSERT INTO `products` VALUES (8, 'Product3317696416096501377887', 'shoew', 'sku shoes ', 'shoe descriptioon', NULL, 'http://192.168.93.13:5000/public/uploads/tree-ga973539e0_1280-jpg-1658848207617.jpeg', 3, 'shoes', 333, 4545455, 0, 0, 0, '3', 'Shop3317695829394431406893', '2022-07-26 15:10:08', '2022-07-26 15:10:08');
INSERT INTO `products` VALUES (11, 'Product3317827464746364078554', 't-Shirts', 'good tshirts', 'very good t-shirts', NULL, 'http://192.168.93.13:5000/public/uploads/cat-g385fd4b39_1920-jpg-1658913732185.jpeg', 2, 'ab clothes', 34, 344545, 0, 0, 0, '4', 'Shop3317695829394431406893', '2022-07-27 09:22:12', '2022-07-27 09:22:12');
INSERT INTO `products` VALUES (12, 'Product3318021332998800419532', 'dogs and cats', 'faimly and frindly pets', 'we have good faimly and friendly pets', NULL, 'http://192.168.93.13:5000/public/uploads/dog-gd4f8ae28d_1920-jpg-1659010666324.jpeg', 3, 'family pets', 2200, 3434, 0, 0, 0, '4', 'Shop3317695829394431406893', '2022-07-28 12:17:46', '2022-07-29 07:26:22');
INSERT INTO `products` VALUES (13, 'Product3318411141490629695563', 'OPPO A3S', 'ooppo_mobiles_model_a3s', 'OPPO mobile A3S is a very goodd smart , light weight mobile with split screen functionallity, , in which you can you two app at a time ', NULL, 'http://192.168.0.102:5000/public/uploads/tree-ga973539e0_1280-jpg-1659205570365.jpeg', 2, 'OPPO mobiles', 200, 20, 0, 0, 0, '7', 'Shop3317500883994305079770', '2022-07-30 18:26:10', '2022-07-30 18:26:10');
INSERT INTO `products` VALUES (14, 'Product3318412379834836206973', 'OPPO Find', 'oppo_mobiles_new_find_s32', 'OPPO mobile new launch OPPO find s32  is a very goodd smart , light weight mobile with split screen functionallity, , in which you can you two app at a time ', NULL, 'http://192.168.0.102:5000/public/uploads/Reno4-5G-navigation-Black-v2-png-1659206189566.png', 2, 'OPPO find', 400, 2651, 0, 0, 0, '7', 'Shop3317500883994305079770', '2022-07-30 18:36:29', '2022-07-30 18:36:29');
INSERT INTO `products` VALUES (15, 'Product3318697277086277279797', 'purple Orchid', 'brown_orchid_mens_perfimes_by_jane_hopper', 'brown orchid mens perfimes by jane hopper is a very good perfmue for regular body use, give you refreshing fragrane throught  out the day', NULL, 'http://192.168.93.13:5000/public/uploads/images-(2)-jpeg-1659348638403.jpeg', 1, 'Jane C perfumes', 120, 5222, 0, 0, 0, '8', 'Shop3318685654722599951532', '2022-08-01 10:10:38', '2022-08-03 10:58:58');
INSERT INTO `products` VALUES (16, 'Product3321129174850479527', 'Apples-10kg', 'hamza_fruits_juice_apples_1k', 'hamza fruits juice apples 1k red apples best taste', 'null', 'http://192.168.93.13:5000/public/uploads/1093441-jpg-1660564586996.jpeg', 2, 'hamza fruits', 52, 1000, 0, 0, 0, '9', 'Shop3321120998478240770547', '2022-08-15 11:56:27', '2022-08-17 12:02:54');
INSERT INTO `products` VALUES (17, 'Product332113077169870508383', 'mangoes-1kg', 'hamza_fruits_juice_mangoes', 'hamza_fruits_juice_mangoes_1k red mangoes best taste', NULL, 'http://192.168.93.13:5000/public/uploads/fUPiCF-jpg-1660565385545.jpeg', 1, 'hamza fruits', 24, 2222, 0, 0, 0, '9', 'Shop3321120998478240770547', '2022-08-15 12:09:45', '2022-08-15 12:09:45');
INSERT INTO `products` VALUES (18, 'Product3321131783194597722344', 'Pomegranate-1kg', 'hamza_fruits_juice_Pomegranate_1k', 'hamza_fruits_juice_Pomegranate_1k red Pomegranate best taste', 'undefined', 'http://192.168.93.13:5000/public/uploads/wp9376285-jpg-1660565891493.jpeg', 1, 'Hamza fruits', 50, 1000, 0, 0, 0, '9', 'Shop3321120998478240770547', '2022-08-15 12:18:11', '2022-08-15 12:18:11');
INSERT INTO `products` VALUES (19, 'Product3321488690652556699077', 'deded', 'vffvffv_gfgfgfgf', 'fff bggg nh mmj kiki', 'undefined', 'http://192.168.93.13:5000/public/uploads/wp4958043-jpg-1660744344906.jpeg', 1, 'shport', 1111, 454545, 0, 0, 0, '1', 'Shop3321486905632847442438', '2022-08-17 13:52:25', '2022-08-17 13:52:25');

-- ----------------------------
-- Table structure for request_messages
-- ----------------------------
DROP TABLE IF EXISTS `request_messages`;
CREATE TABLE `request_messages`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `request_message_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `sender_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `title` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `message` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `timestamp` datetime(6) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of request_messages
-- ----------------------------

-- ----------------------------
-- Table structure for reviews
-- ----------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` int(11) NOT NULL,
  `discription` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `product_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reviews
-- ----------------------------

-- ----------------------------
-- Table structure for shops
-- ----------------------------
DROP TABLE IF EXISTS `shops`;
CREATE TABLE `shops`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shopUuid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `owner` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `discription` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `place` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shops
-- ----------------------------
INSERT INTO `shops` VALUES (7, 'Shop3316654037436579110870', 'ali grocery store ', 'alistore01@mail.com', '$2b$10$gCctxJY3Gxuqf8BGpzktt.Km8uXwXnAIPjo4O0bP2N8TAgdmMKS0y', 'ali ahmed khan ', 'grocery', 'Ali store has all daliy life grocery items', 'kareem block allama iqbal town lahore', 2147483647, '2022-07-20 14:23:38', '2022-08-03 11:52:00');
INSERT INTO `shops` VALUES (8, 'Shop3317500883994305079770', 'ahmed game store', 'ahm@mail.com', '$2b$10$nGyD2.tY2tC7N6TyxhT0/O5s/MnY2wN4h78sbjw5AzXrjsdGdhfMC', 'ahmed', NULL, NULL, NULL, 2147483647, '2022-07-25 12:00:42', '2022-07-25 12:00:42');
INSERT INTO `shops` VALUES (9, 'Shop3317695829394431406893', 'zain shop', 'zain01@mail.com', '$2b$10$3RYHT7Gvo77Je3VFypsEs.l2Ixzai1Ie7CLKAYEI/WY.Izc.RXp9a', 'zain gulraiz', NULL, NULL, NULL, 32122222, '2022-07-26 15:05:14', '2022-07-26 15:05:14');
INSERT INTO `shops` VALUES (10, 'Shop3318685654722599951532', 'Jane Cosmatics', 'janeh01@mail.com', '$2b$10$GMSz1hjuH9oIQoE6fBqnn.TH8Wkw/CtGjS1hJ0AyHui6ePnUzhR2S', 'Jane Hopper', NULL, NULL, NULL, 2147483647, '2022-08-01 08:33:47', '2022-08-01 08:33:47');
INSERT INTO `shops` VALUES (11, 'Shop3318686107924130407116', 'John body Building products', 'jone01@mail.com', '$2b$10$SsE9qJu9/ipFhMBM93GtM.vgR0xUxpNF2BOzDXJ2sl84tJEiD8St2', 'john H', NULL, NULL, NULL, 2147483647, '2022-08-01 08:37:34', '2022-08-01 08:37:34');
INSERT INTO `shops` VALUES (12, 'Shop3321120998478240770547', 'hamza fruit and juice ', 'hamza07@mail.com', '$2b$10$GvjEKMTFiGhlhC/e5hjJ1.I9v/SCtscGmDGCzvFN1.5odGfoAVzou', 'Hamza Muzzamil', NULL, NULL, NULL, 90078601, '2022-08-15 10:48:19', '2022-08-17 12:04:30');
INSERT INTO `shops` VALUES (13, 'Shop3321486905632847442438', ' Zain Sports Shop', 'zainsport01@mail.com', '$2b$10$kKWE5wTu0tlnu6OteqljeOK60aj90I.NEiYehDrTBPJg82gTFcIv2', NULL, NULL, NULL, NULL, NULL, '2022-08-17 13:37:32', '2022-08-17 13:37:32');
INSERT INTO `shops` VALUES (14, 'Shop3322351615422299332571', NULL, NULL, '$2b$10$7AF6oJPorCmmD7J.13WZf.w5NGLdEOoGcJW5VCOIJEFD.rdiL4Oh.', NULL, NULL, NULL, NULL, NULL, '2022-08-22 13:43:28', '2022-08-22 13:43:28');
INSERT INTO `shops` VALUES (15, 'Shop3322364503922339232897', NULL, NULL, '$2b$10$6QVWQJmQwRYS7wfbftnfIOfFN7v0gOKuDapfD2XDC1s6h7VksEmPe', NULL, NULL, NULL, NULL, NULL, '2022-08-22 15:30:52', '2022-08-22 15:30:52');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_uid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `phone` int(11) NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `zipcode` int(11) NULL DEFAULT NULL,
  `country` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `isAdmin` tinyint(1) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (2, 'User3316641008406832100880', ' m abdullah', 'ab', 'ab@mail.com', '$2b$10$fMJeXm0ijmlOiMliRKgm0OXiLg2aMFQRsPorgIg4zpLLsCZHR5fKS', 322, 'Karachi', '454 fhfh main karachi', 3343, 'Pakistan', NULL, '2022-07-20 12:35:04', '2022-07-20 13:51:00');
INSERT INTO `users` VALUES (3, 'User3317477019592895208157', 'm umer', 'umer01', 'umer01@mail.com', '$2b$10$GLXFgzjm4KfZX5VaSWKeaez/oB3cUTi9RbMjI98roYSTg.yhBIRZe', 2147483647, 'city222', 'address422', 4222, 'pk', NULL, '2022-07-25 08:41:50', '2022-07-25 12:50:51');
INSERT INTO `users` VALUES (4, 'User3317497343216249102702', 'ahmed', 'ahmed game shop', 'ahm01@mail.com', '$2b$10$ILg0cGt/eWk5SzjZZ1SzzOqSAKHVYWXjr3S9z3gcsHNYzawc9/ehu', NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-25 11:31:11', '2022-07-25 11:31:11');
INSERT INTO `users` VALUES (5, 'User3317508949614474770836', 'Ahsan', 'ahsan001', 'ahsan@gmail.com', '$2b$10$OXW9L1H3aItdHkysYzPQvOKmBejhM5t8cpIxb513EqvvA0Lx4Ti0K', NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-25 13:07:54', '2022-07-25 13:07:54');
INSERT INTO `users` VALUES (6, 'User3317677553836204028112', 'zain', 'gulbas', 'za', '$2b$10$/MjR1haXjEGJj9UZvbuNLe3bTgymDjmiKzBsOwrcRebB7crbvra/G', NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-26 12:32:57', '2022-07-26 12:32:57');
INSERT INTO `users` VALUES (7, 'User3317689512580781987841', 'zain Gulbaz', 'zain ', 'zain01@mail.com', '$2b$10$G7sEBwHtkDtIO/nLQmQML.q26qmFqQz0jNOFm83VpxWwDgd1sG9OC', 1111111111, 'dfdfdfddf', 'vvbvvbvbvbv', 454554, 'erererererer', NULL, '2022-07-26 14:12:36', '2022-07-26 15:04:11');
INSERT INTO `users` VALUES (8, 'User3318676600876204095506', 'mark jones', 'markjones01', 'markj01@mail.com', '$2b$10$nLBYbbaepmxWp.6D9r93j.gxMp9WNWQgnxvXkRhpmSVKJAWPVuXGG', NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-01 07:18:20', '2022-08-01 07:18:20');
INSERT INTO `users` VALUES (9, 'User3318676939608582370004', ' joe kerry', 'joekerry01', 'joekerry01@mail.com', '$2b$10$kVyFF.r0e123v6HE.tFrC.rRjSi1rP3MevM8xgItle9t1akdGw9Ii', NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-01 07:21:09', '2022-08-01 07:21:09');
INSERT INTO `users` VALUES (15, 'User3321118386350696202957', 'adnan', NULL, 'adnan01@mail.com', '$2b$10$BfCG3Q7AITC5JksR5m/anOnI32BvQA1LNL30A3cmSTJt6wUd2J4eq', NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-15 10:26:33', '2022-08-15 10:26:33');
INSERT INTO `users` VALUES (16, 'User3321486422822701957046', 'Imran Khan', NULL, 'imran01@mail.com', '$2b$10$5snR0i.u3dMPUo7o4X.hPeDvprN2QbcjSmynmGkkyVJ5GiksJ5OiC', NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-17 13:33:31', '2022-08-17 13:33:31');
INSERT INTO `users` VALUES (17, 'User33214865756208598100', 'shoaib akhtar', NULL, 'shoaib01@mail.com', '$2b$10$Uv7IEgCSMT.eqUFlbXRcf.4eSRa9pEJGKDfPfE21nub/pZtUUWSTW', NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-17 13:34:47', '2022-08-17 13:34:47');

SET FOREIGN_KEY_CHECKS = 1;
