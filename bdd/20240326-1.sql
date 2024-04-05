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
  `enabled` tinyint(1) unsigned NOT NULL DEFAULT 1,
  `subject_id` int(11) unsigned NOT NULL,
  `stock` int(10) unsigned NOT NULL DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  `searchdata` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_asignatura_id_libro` (`subject_id`) USING BTREE,
  CONSTRAINT `FK_asignatura_id_libro` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.book: ~2 rows (aproximadamente)
INSERT INTO `book` (`id`, `guid`, `name`, `isbn`, `enabled`, `subject_id`, `stock`, `created`, `updated`, `deleted`, `searchdata`) VALUES
	(8, '2', 'Mathematics', '978-0-470-10963-1', 1, 3, 15, '2024-03-26 15:47:35', '2024-03-26 15:47:35', '2024-03-26 15:47:35', 'Mathematics 978-0-470-10963-1 Diseño Grafico '),
	(9, '1', 'Spanish', '84-934895-3-0', 1, 3, 15, '2024-03-26 15:27:52', '2024-03-26 15:27:44', NULL, 'Spanish 84-934895-3-0 Diseño Grafico ');

-- Volcando estructura para tabla banco_libros.copy
CREATE TABLE IF NOT EXISTS `copy` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `uniqid` varchar(50) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 0,
  `book_id` int(11) unsigned NOT NULL,
  `student_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_libro_id_ejemplar` (`book_id`) USING BTREE,
  KEY `FK_alumno_id_ejemplar` (`student_id`) USING BTREE,
  CONSTRAINT `FK_alumno_id_ejemplar` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_libro_id_ejemplar` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.copy: ~0 rows (aproximadamente)

-- Volcando estructura para tabla banco_libros.course
CREATE TABLE IF NOT EXISTS `course` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `abbr` varchar(10) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.course: ~1 rows (aproximadamente)
INSERT INTO `course` (`id`, `guid`, `name`, `abbr`, `created`, `updated`, `deleted`) VALUES
	(1, '23sa', 'Desarrollo de Aplicaciones Web', 'DAW', '2024-03-18 16:14:22', NULL, NULL);

-- Volcando estructura para tabla banco_libros.history
CREATE TABLE IF NOT EXISTS `history` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL DEFAULT '',
  `copy_id` int(11) unsigned NOT NULL,
  `course_id` int(11) unsigned NOT NULL,
  `initialstate` tinyint(1) NOT NULL DEFAULT 0,
  `finalstate` tinyint(1) DEFAULT 0,
  `initialdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `finaldate` timestamp NULL DEFAULT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ejemplar_id_historial` (`copy_id`) USING BTREE,
  KEY `FK_curso_id_historial` (`course_id`) USING BTREE,
  CONSTRAINT `FK_curso_id_historial` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ejemplar_id_historial` FOREIGN KEY (`copy_id`) REFERENCES `copy` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.history: ~0 rows (aproximadamente)

-- Volcando estructura para tabla banco_libros.student
CREATE TABLE IF NOT EXISTS `student` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `nia` int(8) unsigned NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  `createdby` int(11) unsigned NOT NULL DEFAULT 0,
  `searchdata` text NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_createdby_alumno` (`createdby`),
  CONSTRAINT `FK_createdby_alumno` FOREIGN KEY (`createdby`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.student: ~1 rows (aproximadamente)
INSERT INTO `student` (`id`, `guid`, `nia`, `created`, `updated`, `deleted`, `createdby`, `searchdata`) VALUES
	(1, '1', 96326161, '2024-03-26 15:59:08', NULL, NULL, 1, '');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.studentprofile: ~1 rows (aproximadamente)
INSERT INTO `studentprofile` (`id`, `student_id`, `name`, `surnames`, `phone`, `email`, `updated`) VALUES
	(1, 1, 'Hugo', 'Sanchis', '665958525', 'hugo@gmail.com', NULL);

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
  PRIMARY KEY (`id`),
  KEY `FK_curso_id_asignatura` (`course_id`) USING BTREE,
  CONSTRAINT `FK_curso_id_asignatura` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.subject: ~0 rows (aproximadamente)
INSERT INTO `subject` (`id`, `guid`, `name`, `abbr`, `course_id`, `created`, `updated`, `deleted`) VALUES
	(3, '2112-5121', 'Diseño Grafico', 'DG', 1, '2024-03-18 16:15:04', NULL, NULL);

-- Volcando estructura para tabla banco_libros.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  `token` varchar(500) DEFAULT NULL,
  `expiredate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.user: ~1 rows (aproximadamente)
INSERT INTO `user` (`id`, `guid`, `email`, `password`, `created`, `updated`, `deleted`, `token`, `expiredate`) VALUES
	(1, 'D0201930-85B5-4121-814B-2017FB44F321', 'hugo.sanchis@vidavia.com', '$2y$10$iXgSHn6PXDMrz5dRNeDqOuccc/Bo2Ur4K6jf5PWd8vlLc9mQ9pSCG', '2024-03-15 15:07:57', NULL, NULL, '88a897fa8018798cea2c3ede5b6e70a2d0b806fdf8f32d024a13daa550ab3529', '2024-03-27 14:29:17');

-- Volcando estructura para tabla banco_libros.userprofile
CREATE TABLE IF NOT EXISTS `userprofile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `surnames` varchar(255) NOT NULL,
  `phone` varchar(250) DEFAULT NULL,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_usuario_id_usuarioperfil` (`user_id`) USING BTREE,
  CONSTRAINT `FK_usuario_id_usuarioperfil` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.userprofile: ~0 rows (aproximadamente)
INSERT INTO `userprofile` (`id`, `user_id`, `name`, `surnames`, `phone`, `updated`) VALUES
	(1, 1, 'Hugo', 'Sanchis', NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
