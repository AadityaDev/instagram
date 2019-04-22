CREATE DATABASE  IF NOT EXISTS `learn` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `learn`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: learn
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `discuss`
--

DROP TABLE IF EXISTS `discuss`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discuss` (
  `discussId` int(10) NOT NULL AUTO_INCREMENT COMMENT 'commentid',
  `topicId` int(10) NOT NULL COMMENT 'topicid',
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'userid',
  `replyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Respondent name',
  `replyContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Reply content',
  `created_at` datetime(4) NOT NULL ON UPDATE CURRENT_TIMESTAMP(4) COMMENT 'Reply creation time',
  `updated_at` datetime(4) NOT NULL,
  PRIMARY KEY (`discussId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discuss`
--

LOCK TABLES `discuss` WRITE;
/*!40000 ALTER TABLE `discuss` DISABLE KEYS */;
INSERT INTO `discuss` VALUES (10,1,'a9445c646fd54a3d950f52df473c0380','aditya','Oh my God','2018-11-12 07:47:19.0000','2018-11-12 07:47:19.0000'),(11,1,'a9445c646fd54a3d950f52df473c0380','aditya','Oh my God','2018-11-12 07:47:21.0000','2018-11-12 07:47:21.0000'),(12,1,'a9445c646fd54a3d950f52df473c0380','aditya','Hahaha','2018-11-12 07:47:24.0000','2018-11-12 07:47:24.0000'),(13,1,'a9445c646fd54a3d950f52df473c0380','aditya','La la','2018-11-12 07:47:25.0000','2018-11-12 07:47:25.0000'),(15,1,'a9445c646fd54a3d950f52df473c0380','aditya','wuuw','2018-11-12 07:48:28.0000','2018-11-12 07:48:28.0000'),(16,1,'a9445c646fd54a3d950f52df473c0380','aditya','Where is my day (=@__@=)?','2018-11-14 09:17:17.0000','2018-11-14 09:17:17.0000'),(17,1,'a9445c646fd54a3d950f52df473c0380','Aadi','hi,my name is aadi','2018-11-14 09:23:31.0000','2018-11-14 09:23:31.0000'),(18,1,'a9445c646fd54a3d950f52df473c0380','aadi','lol','2018-11-14 09:23:36.0000','2018-11-14 09:23:36.0000'),(19,3,'e51c2d2e4366433fb35f017c69468149','Shwa','Cool，god！！！','2018-12-01 08:51:52.0000','2018-12-01 08:51:52.0000'),(20,2,'e51c2d2e4366433fb35f017c69468149','Shwai','Handsome！！','2018-12-01 08:51:59.0000','2018-12-01 08:51:59.0000'),(21,4,'e51c2d2e4366433fb35f017c69468149','Shwa','Landscape map！','2018-12-01 08:52:09.0000','2018-12-01 08:52:09.0000');
/*!40000 ALTER TABLE `discuss` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `follow` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'User id',
  `followedId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Follower id',
  `status` int(1) NOT NULL COMMENT 'Focus on status 0: Unfollow 1: Followed',
  `created_at` datetime NOT NULL COMMENT 'Creation time',
  `updated_at` datetime NOT NULL COMMENT 'Last update time',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (5,'c1dcc8a53ce6493ca05a357aac2d0aa4','a9445c646fd54a3d950f52df473c0380',1,'2018-11-15 09:39:02','2018-11-15 09:39:10'),(6,'a9445c646fd54a3d950f52df473c0380','c1dcc8a53ce6493ca05a357aac2d0aa4',1,'2018-11-15 10:36:33','2018-11-15 10:36:33'),(7,'cbd6eb6093e74c7290aad936e8a9a2cd','daabb0b0a90244a5b3204ac6779708dc',1,'2018-12-01 08:47:54','2018-12-01 08:53:34'),(8,'e51c2d2e4366433fb35f017c69468149','cbd6eb6093e74c7290aad936e8a9a2cd',1,'2018-12-01 08:53:34','2018-12-01 08:55:33');
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20181012071252-init-users.js'),('20181012072948-init-users.js'),('20181018140213-init-topic.js'),('20181019074022-init-discuss.js'),('20181021093431-init-topic-like.js'),('20181025024702-init-follow.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topic` (
  `topicId` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Post unique id',
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'User id',
  `topicTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Post title',
  `topicImg` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Post image list',
  `created_at` datetime NOT NULL COMMENT 'Post creation time',
  `updated_at` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'Post last update time',
  `address` varchar(255) NOT NULL COMMENT 'Publishing address',
  PRIMARY KEY (`topicId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES (1,'a9445c646fd54a3d950f52df473c0380','User four posts','[\"http://p0.ifengimg.com/pmop/2017/1102/901DB09B75FD0FB5422F657D8706E493B04A10ED_size115_w1200_h675.jpeg\",\"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Raijin-ogata-emuseum.JPG/300px-Raijin-ogata-emuseum.JPG\"]','2018-11-05 01:45:40','2018-11-05 01:45:40',''),(2,'cbd6eb6093e74c7290aad936e8a9a2cd','James, basketball！！','[\"http://pic8.nipic.com/20100727/4745653_164946829874_2.jpg\",\"http://pic5.nipic.com/20100104/2590249_091443085128_2.jpg\"]','2018-12-01 08:46:47','2018-12-01 08:46:47',''),(3,'cbd6eb6093e74c7290aad936e8a9a2cd','Kobe, basketball！！','[\"http://img.article.pchome.net/00/22/99/77/pic_lib/wm/kb_01.jpg\",\"http://www.pc6.com/uploadimages/2009-11/2009112261377237.jpg\"]','2018-12-01 08:47:24','2018-12-01 08:47:24',''),(4,'e51c2d2e4366433fb35f017c69468149','landscape picture','[\"http://img3.3lian.com/2013/c2/80/d/1.jpg\",\"http://img3.3lian.com/2013/v11/41/d/81.jpg\"]','2018-12-01 08:51:40','2018-12-01 08:51:40',''),(5,'daabb0b0a90244a5b3204ac6779708dc','fashion','[\"http://pic.nipic.com/2007-12-22/20071222104958273_2.jpg\"]','2018-12-01 08:54:24','2018-12-01 08:54:24','');
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_like`
--

DROP TABLE IF EXISTS `topic_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topic_like` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Self-added id',
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'User id',
  `topicId` int(10) NOT NULL COMMENT 'Post id',
  `status` int(1) NOT NULL COMMENT 'Like status 1: valid praise, 0: invalid praise',
  `created_at` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'Creation time',
  `updated_at` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update time',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_like`
--

LOCK TABLES `topic_like` WRITE;
/*!40000 ALTER TABLE `topic_like` DISABLE KEYS */;
INSERT INTO `topic_like` VALUES (1,'369a08c015df4f61a802099673cf92aa',1,1,'2018-10-21 12:57:07','2018-10-21 12:57:07'),(2,'a9445c646fd54a3d950f52df473c0380',1,0,'2018-11-15 03:51:47','2018-11-15 03:51:47'),(3,'c1dcc8a53ce6493ca05a357aac2d0aa4',1,1,'2018-11-15 10:38:50','2018-11-15 10:38:50'),(4,'e51c2d2e4366433fb35f017c69468149',4,1,'2018-12-01 08:51:43','2018-12-01 08:51:43'),(5,'e51c2d2e4366433fb35f017c69468149',3,1,'2018-12-01 08:51:44','2018-12-01 08:51:44'),(6,'daabb0b0a90244a5b3204ac6779708dc',5,1,'2018-12-01 08:54:30','2018-12-01 08:54:30'),(7,'daabb0b0a90244a5b3204ac6779708dc',2,1,'2018-12-01 08:55:13','2018-12-01 08:55:13'),(8,'daabb0b0a90244a5b3204ac6779708dc',3,1,'2018-12-01 08:58:55','2018-12-01 08:58:55');
/*!40000 ALTER TABLE `topic_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `avatarUrl` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `mobile` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `prefix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sex` varchar(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `abstract` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'cbd6eb6093e74c7290aad936e8a9a2cd','aditya','466150516@qq.com','111111','http://piyhxgz90.bkt.clouddn.com/1543653964188.jpg',NULL,'86','m','2018-12-01 08:45:12','2018-12-01 08:46:09','I am a player'),(4,'e51c2d2e4366433fb35f017c69468149','aadi','codingzx@gmail.com','111111','http://piyhxgz90.bkt.clouddn.com/1543654269146.jpg',NULL,'86','m','2018-12-01 08:47:47','2018-12-01 08:52:30','Landscape expert'),(5,'daabb0b0a90244a5b3204ac6779708dc','wuwan','wuwantian@gmail.com','111111','http://piyhxgz90.bkt.clouddn.com/15436544923382531170_182711296228_2.jpg',NULL,'86','f','2018-12-01 08:52:49','2018-12-01 08:54:58',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'learn'
--

--
-- Dumping routines for database 'learn'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-23  2:06:28
