-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para banco_libros
CREATE DATABASE IF NOT EXISTS `banco_libros` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `banco_libros`;

-- Volcando estructura para tabla banco_libros.book
CREATE TABLE IF NOT EXISTS `book` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `isbn` varchar(50) NOT NULL,
  `subject_id` int(11) unsigned NOT NULL,
  `stock` int(10) unsigned NOT NULL DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  `searchdata` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_asignatura_id_libro` (`subject_id`) USING BTREE,
  CONSTRAINT `FK_asignatura_id_libro` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.book: ~1 rows (aproximadamente)
INSERT INTO `book` (`id`, `guid`, `name`, `isbn`, `subject_id`, `stock`, `created`, `updated`, `deleted`, `searchdata`) VALUES
	(113, '30A62106-4528-47B3-BD0B-40CEC78E7085', 'Mathematics1', '84-934895-3-0', 131, 10, '2024-05-24 14:32:28', '2024-05-24 14:32:28', NULL, 'Mathematics1 84-934895-3-0 Matemáticas ');

-- Volcando estructura para tabla banco_libros.copy
CREATE TABLE IF NOT EXISTS `copy` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `uniqid` varchar(50) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 0,
  `book_id` int(11) unsigned NOT NULL,
  `searchdata` text NOT NULL,
  `updated` timestamp NULL DEFAULT NULL,
  `created` timestamp NULL DEFAULT current_timestamp(),
  `deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqid` (`uniqid`),
  KEY `FK_libro_id_ejemplar` (`book_id`) USING BTREE,
  CONSTRAINT `FK_libro_id_ejemplar` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2096 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.copy: ~12 rows (aproximadamente)
INSERT INTO `copy` (`id`, `guid`, `uniqid`, `state`, `book_id`, `searchdata`, `updated`, `created`, `deleted`) VALUES
	(2084, '861F6A97-29CD-4B94-90CA-938CEA75B7BE', '1741663117818', 0, 113, '1741663117818 ', '2024-05-24 08:53:52', '2024-05-24 08:39:33', '2024-05-24 08:53:52'),
	(2085, '2806DC15-D8D6-4D3F-80B0-8DF1AEAA730F', '0528751873899', 0, 113, '0528751873899 ', '2024-05-24 08:56:33', '2024-05-24 08:39:33', '2024-05-24 08:56:33'),
	(2086, '598FEF6F-7376-419B-8E35-1B3FDA01716C', '0851393429040', 0, 113, '0851393429040 ', '2024-05-24 08:59:16', '2024-05-24 08:39:33', '2024-05-24 08:59:16'),
	(2087, '01BAFA0E-C318-4B10-91F6-B8C4A68AED23', '8901170678170', 0, 113, '8901170678170 ', '2024-05-24 14:21:02', '2024-05-24 08:39:33', '2024-05-24 14:21:02'),
	(2088, '31BBA445-E755-4848-9EBB-5B9D20558DFF', '5915982066294', 0, 113, '5915982066294 ', '2024-05-24 14:28:32', '2024-05-24 08:39:33', '2024-05-24 14:28:32'),
	(2089, 'F853DB2E-B9AD-4A0E-8D2B-228CDA39952D', '5781464295479', 4, 113, '5781464295479 ', NULL, '2024-05-24 08:39:33', NULL),
	(2090, 'B5A5069C-B00E-44D9-B43A-76D427DE9CC1', '0253507556663', 4, 113, '0253507556663 ', NULL, '2024-05-24 08:39:33', NULL),
	(2091, 'F8C975C4-DD8C-4F56-B168-A2CE702B118F', '2159438481832', 4, 113, '2159438481832 ', NULL, '2024-05-24 08:39:33', NULL),
	(2092, 'DF5A243A-ABD3-4E74-90A8-FDD2A8C5754A', '1520415963399', 4, 113, '1520415963399 ', NULL, '2024-05-24 08:39:33', NULL),
	(2093, '8525B70D-DDFE-48FE-8C5A-8B3DB6F15AD7', '6928721876899', 4, 113, '6928721876899 ', NULL, '2024-05-24 08:39:33', NULL),
	(2094, 'EC9404CC-4C15-4B25-A6F1-E97F08F68204', '3879244232399', 4, 113, '3879244232399 ', NULL, '2024-05-24 14:30:13', NULL),
	(2095, 'C123A328-3D40-47D8-B01B-8C5AE8547DF5', '7467214026316', 1, 113, '7467214026316 ', NULL, '2024-05-24 14:32:28', NULL);

-- Volcando estructura para tabla banco_libros.course
CREATE TABLE IF NOT EXISTS `course` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `abbr` varchar(10) NOT NULL,
  `season` varchar(50) NOT NULL,
  `searchdata` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.course: ~3 rows (aproximadamente)
INSERT INTO `course` (`id`, `guid`, `name`, `abbr`, `season`, `searchdata`, `created`, `updated`, `deleted`) VALUES
	(50, 'B64F1D56-5B53-4F6B-B69F-3FD5EB2AD33A', '1 Educación Secundaria Obligatoria', '1 ESO', '23-24', '1 Educación Secundaria Obligatoria 1 ESO ', '2024-05-23 15:13:20', '2024-05-24 08:04:30', '2024-05-24 08:04:30'),
	(51, 'B767209F-8A39-4898-B37C-38894F6ED0AB', '1 Educación Secundaria Obligatoria', '1 ESO', '23/24', '1 Educación Secundaria Obligatoria 1 ESO ', '2024-05-24 08:13:57', NULL, NULL),
	(52, '45826DB3-13F7-40D5-9C7A-93FA8A66F422', 'Hugos', '1 ESO', '23-24', 'Hugos 1 ESO ', '2024-05-24 08:19:46', NULL, NULL);

-- Volcando estructura para tabla banco_libros.history
CREATE TABLE IF NOT EXISTS `history` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL DEFAULT '',
  `copy_id` int(11) unsigned NOT NULL,
  `subject_id` int(11) unsigned NOT NULL,
  `student_id` int(11) unsigned NOT NULL,
  `initialstate` tinyint(1) NOT NULL DEFAULT 5,
  `finalstate` tinyint(1) DEFAULT NULL,
  `initialdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `finaldate` timestamp NULL DEFAULT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `updated` timestamp NULL DEFAULT NULL,
  `searchdata` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ejemplar_id_historial` (`copy_id`) USING BTREE,
  KEY `FK_student_id_historial` (`student_id`),
  KEY `FK_curso_id_historial` (`subject_id`) USING BTREE,
  CONSTRAINT `FK_ejemplar_id_historial` FOREIGN KEY (`copy_id`) REFERENCES `copy` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_student_id_historial` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_subject_id_historial` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.history: ~0 rows (aproximadamente)

-- Volcando estructura para tabla banco_libros.student
CREATE TABLE IF NOT EXISTS `student` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `nia` int(8) unsigned NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  `createdby` int(11) unsigned NOT NULL,
  `searchdata` text NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_createdby_alumno` (`createdby`),
  CONSTRAINT `FK_createdby_alumno` FOREIGN KEY (`createdby`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.student: ~1 rows (aproximadamente)
INSERT INTO `student` (`id`, `guid`, `nia`, `created`, `updated`, `deleted`, `createdby`, `searchdata`) VALUES
	(68, 'FF46BDD8-8BF8-44EF-9C77-B229B3DE1BAB', 96326632, '2024-05-23 15:14:19', NULL, NULL, 2, '96326632 Hugo Sanchis hugolluissimarro03@gmail.com ');

-- Volcando estructura para tabla banco_libros.studentprofile
CREATE TABLE IF NOT EXISTS `studentprofile` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` int(11) unsigned NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `surnames` varchar(255) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `email` varchar(255) NOT NULL,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_alumno_id_alumnoperfil` (`student_id`) USING BTREE,
  CONSTRAINT `FK_alumno_id_alumnoperfil` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.studentprofile: ~1 rows (aproximadamente)
INSERT INTO `studentprofile` (`id`, `student_id`, `name`, `surnames`, `phone`, `email`, `updated`) VALUES
	(19, 68, 'Hugo', 'Sanchis', '665958525', 'hugolluissimarro03@gmail.com', NULL);

-- Volcando estructura para tabla banco_libros.subject
CREATE TABLE IF NOT EXISTS `subject` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `abbr` varchar(10) NOT NULL,
  `course_id` int(11) unsigned NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  `searchdata` text NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `FK_curso_id_asignatura` (`course_id`) USING BTREE,
  CONSTRAINT `FK_curso_id_asignatura` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.subject: ~4 rows (aproximadamente)
INSERT INTO `subject` (`id`, `guid`, `name`, `abbr`, `course_id`, `created`, `updated`, `deleted`, `searchdata`) VALUES
	(129, '73CF6F8C-561D-4338-9439-4042E23C3667', 'Matematicas', 'MAT', 50, '2024-05-23 15:13:32', '2024-05-24 08:04:24', '2024-05-24 08:04:24', 'Matematicas MAT 1 Educación Secundaria Obligatoria 1 ESO '),
	(130, '6FF64761-A371-4C6F-BB35-58ADD3B30BF2', 'Base de Datos', 'BDD', 50, '2024-05-23 15:54:17', '2024-05-24 08:04:01', '2024-05-24 08:04:01', 'Base de Datos BDD 1 Educación Secundaria Obligatoria 1 ESO '),
	(131, '00592915-B5DF-422D-993E-A592E9EF970D', 'Matemáticas', 'DAS', 51, '2024-05-24 08:14:15', '2024-05-24 08:45:11', NULL, 'Matemáticas DAS 1 Educación Secundaria Obligatoria 1 ESO '),
	(132, '5EA5C91D-46BE-4C2C-BE2B-D139E8454E9C', 'Hugos', 'MSD', 51, '2024-05-24 08:19:11', '2024-05-24 08:19:16', '2024-05-24 08:19:16', 'Hugos MSD 1 Educación Secundaria Obligatoria 1 ESO ');

-- Volcando estructura para tabla banco_libros.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `recoverycode` varchar(50) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  `token` varchar(500) DEFAULT NULL,
  `expiredate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.user: ~2 rows (aproximadamente)
INSERT INTO `user` (`id`, `guid`, `email`, `password`, `recoverycode`, `created`, `updated`, `deleted`, `token`, `expiredate`) VALUES
	(1, 'D0201930-85B5-4121-814B-2017FB44F321', 'hugo.sanchis@vidavia.com', '$2y$10$N/NbSmL9wnRQnfEEyJMCwef.QBPc/X5uQRWiLUpMJ1K3S6j39TrDu', NULL, '2024-03-15 15:07:57', NULL, NULL, 'c57be08790bdd30fcb90ba2b49527aeacc653994f7d594278e0acc8543a726bd', '2024-05-25 14:20:30'),
	(2, '2FD1146E-D21B-4787-AEE1-72D3BE4E5D71', 'jose.sanchis@vidavia.com', '$2y$10$.w3dwJrGA3ol58g3IJFU8uN.QWxIpCtImMlM1sbfhsZTNP2tWGyvW', NULL, '2024-03-28 14:42:15', NULL, NULL, '5c13b6caf54675fc44c967a893e891100ba1c50cec3fe46cff0a647a1eadc4ca', '2024-05-24 14:10:45');

-- Volcando estructura para tabla banco_libros.userprofile
CREATE TABLE IF NOT EXISTS `userprofile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `surnames` varchar(255) NOT NULL,
  `phone` varchar(250) DEFAULT NULL,
  `updated` timestamp NULL DEFAULT NULL,
  `avatar` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_usuario_id_usuarioperfil` (`user_id`) USING BTREE,
  CONSTRAINT `FK_usuario_id_usuarioperfil` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.userprofile: ~0 rows (aproximadamente)
INSERT INTO `userprofile` (`id`, `user_id`, `name`, `surnames`, `phone`, `updated`, `avatar`) VALUES
	(1, 1, 'Hugo', 'Sanchis', '666595858', '2024-05-24 14:34:46', 'http://tesths.vidavia.net/Banc-De-Llibres/api/endpoints/media/getMedia.php?file=D0201930-85B5-4121-814B-2017FB44F321.png'),
	(2, 2, 'Jose', 'Sanchis', NULL, '2024-05-23 14:47:38', 'http://tesths.vidavia.net/Banc-de-Llibres/api/endpoints/media/getMedia.php?file=2FD1146E-D21B-4787-AEE1-72D3BE4E5D71.jpg');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
