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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.book: ~12 rows (aproximadamente)
INSERT INTO `book` (`id`, `guid`, `name`, `isbn`, `enabled`, `subject_id`, `stock`, `created`, `updated`, `deleted`, `searchdata`) VALUES
	(30, '15638385-F37B-4CCA-B9D3-B67EA4AA97EA', 'Formacion y Orientacion Laboral', '84-934895-3-0', 0, 3, 20, '2024-03-28 09:04:52', '2024-03-28 09:04:52', '2024-03-28 09:04:52', 'Formacion y Orientacion Laboral 84-934895-3-0 Diseño Grafico '),
	(31, '10B3E9EC-01D9-4C6E-A8A2-2220C77F492F', 'Mathematics1', '978-0-470-10963-2', 1, 3, 32, '2024-03-28 16:05:01', '2024-03-28 16:05:01', '2024-03-28 16:05:01', 'Mathematics1 978-0-470-10963-2 '),
	(32, 'BE5E51E9-769C-4D84-9F68-C3E465EF1F88', 'Libro1c', '84-934895-3-1', 1, 3, 43, '2024-03-28 16:05:03', '2024-03-28 16:05:03', '2024-03-28 16:05:03', 'Libro1c 84-934895-3-1 '),
	(33, 'A2C8B809-15F2-42F0-89C3-0D1499E7BDC3', 'Mathematics2', '84-934895-3-4', 1, 3, 21, '2024-03-28 16:05:04', '2024-03-28 16:05:04', '2024-03-28 16:05:04', 'Mathematics2 84-934895-3-4 '),
	(34, '167673EF-6687-4DD7-899D-F96D37D2AD36', 'Hugos', '84-934895-3-0', 1, 3, 1, '2024-03-28 16:05:06', '2024-03-28 16:05:06', '2024-03-28 16:05:06', 'Hugos 84-934895-3-0 '),
	(35, '7000A380-ECFC-4C9B-8FCA-317DBE04FF57', 'Mathematics98', '84-934895-3-0', 1, 3, 1, '2024-03-28 16:05:09', '2024-03-28 16:05:09', '2024-03-28 16:05:09', 'Mathematics98 84-934895-3-0 '),
	(36, 'D5372D34-3FDE-4DDC-8498-6D57BC8868D3', 'Libro1csd', '84-934595-3-4', 1, 3, 1, '2024-03-28 16:05:10', '2024-03-28 16:05:10', '2024-03-28 16:05:10', 'Libro1csd 84-934595-3-4 '),
	(37, 'EAAAEC5B-7BB9-4636-A572-E859DA098742', 'Hugos', '84-934895-3-8', 1, 3, 4, '2024-03-28 16:05:12', '2024-03-28 16:05:12', '2024-03-28 16:05:12', 'Hugos 84-934895-3-8 '),
	(38, '6999E2DC-B2B5-4656-864E-6C1A271177A0', 'Design Patterns', '84-934895-3-0', 1, 3, 20, '2024-03-28 16:05:44', NULL, NULL, 'Design Patterns 84-934895-3-0 '),
	(39, '20C7CB84-3017-4AFE-B1C9-FDAF54A379DB', 'Mathematics', '84-934895-3-8', 1, 3, 3, '2024-03-28 16:06:13', NULL, NULL, 'Mathematics 84-934895-3-8 '),
	(40, 'FF84983D-2211-4AD4-9070-F3C1C7CA7A90', 'English', '84-934895-3-1', 1, 3, 10, '2024-04-03 11:24:54', NULL, NULL, 'English 84-934895-3-1 '),
	(41, 'D98F57BE-98EF-49A9-8433-DE9B6260A3E4', 'El Quijote', '23-23453-33-2', 1, 8, 12, '2024-04-04 14:31:13', '2024-04-04 14:31:13', '2024-04-04 14:31:13', 'El Quijote 23-23453-33-2 ');

-- Volcando estructura para tabla banco_libros.copy
CREATE TABLE IF NOT EXISTS `copy` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `uniqid` varchar(50) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 0,
  `book_id` int(11) unsigned NOT NULL,
  `student_id` int(11) unsigned DEFAULT NULL,
  `searchdata` text NOT NULL,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_libro_id_ejemplar` (`book_id`) USING BTREE,
  KEY `FK_alumno_id_ejemplar` (`student_id`) USING BTREE,
  CONSTRAINT `FK_alumno_id_ejemplar` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_libro_id_ejemplar` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.copy: ~53 rows (aproximadamente)
INSERT INTO `copy` (`id`, `guid`, `uniqid`, `state`, `book_id`, `student_id`, `searchdata`, `updated`) VALUES
	(142, 'C50FFCA4-B497-4438-8DA1-C32A86B2A05A', '5384932376757', 4, 31, NULL, '', NULL),
	(143, '7964AEBD-9B17-4BE8-AEB7-632C9FFF7C8B', '1084620725028', 5, 34, NULL, '', NULL),
	(144, 'A5EB2CF9-90E9-409C-BF9D-1086CE762532', '3806331136023', 5, 35, NULL, '', NULL),
	(145, '6DCD5A6C-9BB6-4A49-A792-DD0BB5324694', '5025662200896', 5, 36, NULL, '', NULL),
	(146, '4BAF2524-7138-43FB-9488-8DE7C2EA0F7A', '9571449837199', 5, 37, NULL, '', NULL),
	(147, 'ECAE87D7-7469-40E8-A17E-E3DDE21E3643', '1229108466841', 5, 37, NULL, '', NULL),
	(148, 'DDCE5978-BE06-4F60-80D8-11F8353CCD56', '8453022384268', 5, 37, NULL, '', NULL),
	(149, 'AAB35109-FED7-440C-9DFA-6DDE7E592C68', '3784086532174', 5, 37, NULL, '', NULL),
	(150, 'F121B88A-1607-49D7-A1A6-21C8D13C6432', '4583755977061', 5, 38, NULL, '', NULL),
	(151, 'C08CF8F1-E850-48C5-BC02-BECFE9070B2C', '4868500840321', 5, 38, NULL, '', NULL),
	(152, 'DE059E66-BCE2-4746-810A-3BC70502B625', '3145091352757', 5, 38, NULL, '', NULL),
	(153, 'AC3AF585-07EE-445A-80B3-16A11F9D1BAD', '8922759445487', 5, 38, NULL, '', NULL),
	(154, '66EC38D9-A173-4C62-B941-B7220E90B236', '1363060928673', 5, 38, NULL, '', NULL),
	(155, 'BCD23C1C-07E4-4510-8D94-1BE33C54F55E', '4023989595810', 5, 38, NULL, '', NULL),
	(156, '97938C59-A6B2-4FB5-B221-F880BF35B69D', '4720577995563', 5, 38, NULL, '', NULL),
	(157, '9E64024E-5AAA-4AF3-94AA-7E7A61C321BD', '0174067163045', 5, 38, NULL, '', NULL),
	(158, '5DC8640A-AF75-4BC8-9C59-9E8C1B7C1230', '9003503037337', 5, 38, NULL, '', NULL),
	(159, '44DB36AF-18EE-4A1E-806D-81718550A12A', '5984072027800', 5, 38, NULL, '', NULL),
	(160, 'A5B3DA21-7AC5-456B-9671-CEFA4C24D692', '1260800964931', 5, 38, NULL, '', NULL),
	(161, 'CDE4F383-C2A6-41DA-8B72-D49CEE1D0E42', '6820774669522', 5, 38, NULL, '', NULL),
	(162, '5C6506CF-1FD7-4C73-924A-69DC1D2D7430', '2306850986044', 5, 38, NULL, '', NULL),
	(163, 'B0C99D23-84D0-4548-981E-437FC4F5104B', '0724254132588', 5, 38, NULL, '', NULL),
	(164, 'D0891E17-3A90-451E-91B0-7296369BD5BA', '8095889792826', 5, 38, NULL, '', NULL),
	(165, '626C99AC-C8E8-4FB5-95AA-6250DB42D20E', '8617570640954', 5, 38, NULL, '', NULL),
	(166, 'DD6442D2-3188-4035-BA8F-A73C6EFE6B1A', '1162303080030', 5, 38, NULL, '', NULL),
	(167, 'AF6D2B45-17FE-443E-999F-C995AF063D9B', '3888731955887', 5, 38, NULL, '', NULL),
	(168, 'A471AB56-0325-417D-B65A-D39ED5173091', '5699775424073', 5, 38, NULL, '', NULL),
	(169, '806D41DA-2D61-4DFF-AAFD-79573F26874E', '2256867952054', 5, 38, NULL, '', NULL),
	(170, '56C0C7E5-D8C1-4ABB-96E5-6492F067541A', '6343160489616', 5, 39, NULL, '', NULL),
	(171, '28D11E77-45CD-4BBC-BEB3-0CA2D14D8A9F', '0214782607461', 5, 39, NULL, '', NULL),
	(172, 'B4417F4A-BF9C-40A4-95C5-2A7D7C4BB0C8', '7589232524468', 5, 39, NULL, '', NULL),
	(173, '21C35C89-B695-474D-8354-498DF803E64B', '3846974741421', 1, 40, NULL, '3846974741421 ', '2024-04-03 11:26:22'),
	(174, '875A4ED1-7F27-473E-8EDE-9A784B2B1AF6', '2664351621719', 1, 40, NULL, '2664351621719 ', '2024-04-03 11:26:37'),
	(175, '842260C3-4A49-4C6F-8492-B4FCAA639D02', '5632433995927', 5, 40, NULL, '5632433995927 ', NULL),
	(176, '6B8AD127-D1A9-45F6-BBD7-2D733D04E82D', '3142057962704', 5, 40, NULL, '3142057962704 ', NULL),
	(177, '0E58D8B6-D6FD-4671-9D0C-87F746F86171', '8108719631394', 5, 40, NULL, '8108719631394 ', NULL),
	(178, '4C41803B-6A1C-482A-BFBD-FFFF51DA7B5F', '8592045638458', 5, 40, NULL, '8592045638458 ', NULL),
	(179, '6FC4F45C-4652-43DF-BA53-8F622CBFD80C', '4140053114157', 5, 40, NULL, '4140053114157 ', NULL),
	(180, 'EBDD877F-F86D-48E8-A828-DC12F8DE09D0', '4129231383484', 5, 40, NULL, '4129231383484 ', NULL),
	(181, 'C92E113B-B3A5-44CE-A323-9829149AF3DF', '3230642342929', 5, 40, NULL, '3230642342929 ', NULL),
	(182, '90F63A5E-34DD-4857-8B0E-7FB7468C7604', '6098504846559', 5, 40, NULL, '6098504846559 ', NULL),
	(183, '32C1D90C-88F5-49C8-A962-6453C6837D3F', '0527253792887', 2, 41, NULL, '0527253792887 ', '2024-04-04 13:51:28'),
	(184, '77A2B453-5C44-4CF0-9B20-4ADE44EEB448', '7450572689418', 1, 41, NULL, '7450572689418 ', '2024-04-04 14:28:17'),
	(185, 'DDEBF138-2AAD-49D7-93B0-B7FA43C72CA7', '8432833561073', 5, 41, NULL, '8432833561073 ', NULL),
	(186, '577BE09A-ECCF-4B3B-A4F9-1A69AD775CAF', '3676609728479', 5, 41, NULL, '3676609728479 ', NULL),
	(187, 'D383A092-41A6-4124-9042-9E72159BC346', '0112498826147', 5, 41, NULL, '0112498826147 ', '2024-04-04 14:28:29'),
	(188, '34625CEA-F28C-470D-B810-F2F9E4939EEF', '2118821438049', 5, 41, NULL, '2118821438049 ', NULL),
	(189, '3EA18D01-E2F2-4B0F-A3FC-D3D3A261191A', '7035031405902', 5, 41, NULL, '7035031405902 ', NULL),
	(190, '86BB4EAC-6D89-42DF-A84C-B4109C492DCC', '4389842399800', 5, 41, NULL, '4389842399800 ', NULL),
	(191, 'AA03719F-F81A-4482-B5FB-CFD37F072E38', '9289777976670', 5, 41, NULL, '9289777976670 ', NULL),
	(192, 'C5CC978E-F3C9-4512-89E5-B10F92CF26E7', '6544310143553', 5, 41, NULL, '6544310143553 ', NULL),
	(193, 'CA14BF09-40E3-45C6-A110-62ECC8E8C480', '4296045003669', 5, 41, NULL, '4296045003669 ', NULL),
	(194, '1E2E4531-200D-4A76-8174-1B6CC257449A', '2235871880806', 5, 41, NULL, '2235871880806 ', NULL);

-- Volcando estructura para tabla banco_libros.course
CREATE TABLE IF NOT EXISTS `course` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `abbr` varchar(10) NOT NULL,
  `searchdata` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.course: ~5 rows (aproximadamente)
INSERT INTO `course` (`id`, `guid`, `name`, `abbr`, `searchdata`, `created`, `updated`, `deleted`) VALUES
	(1, '23sa', 'Desarrollo de Aplicaciones Web', 'DAW', 'Desarrollo de Aplicaciones Web DAW ', '2024-03-18 16:14:22', '2024-04-03 15:21:03', NULL),
	(2, 'dfasdf', 'Desarrollo de aplicaciones multiplaaforma', 'DAM', 'Desarrollo de aplicaciones multiplaaforma DAM ', '2024-04-03 13:51:02', '2024-04-03 14:49:58', '2024-04-03 14:49:58'),
	(3, '4839891E-32AA-454D-9D7B-D1DB5B57FFE6', 'Desarrollo de aplicaciones multimedia', 'DAM', 'Desarrollo de aplicaciones multimedia DAM ', '2024-04-03 15:14:18', '2024-04-04 14:21:46', '2024-04-04 14:21:46'),
	(4, '07E3D21C-09B5-4C39-A4E5-78EB49EB6DFC', 'Desarrollim', 'DIM', 'Desarrollim DIM ', '2024-04-03 15:21:29', '2024-04-04 10:04:12', '2024-04-04 10:04:12'),
	(5, 'F8CAD1AD-4833-492D-BAAA-CEA51B738769', 'This is just a test', 'NEW Course', 'This is just a test NEW Course ', '2024-04-04 14:25:24', NULL, NULL);

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
  `createdby` int(11) unsigned NOT NULL,
  `searchdata` text NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_createdby_alumno` (`createdby`),
  CONSTRAINT `FK_createdby_alumno` FOREIGN KEY (`createdby`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.student: ~16 rows (aproximadamente)
INSERT INTO `student` (`id`, `guid`, `nia`, `created`, `updated`, `deleted`, `createdby`, `searchdata`) VALUES
	(1, '1', 96326161, '2024-03-26 15:59:08', NULL, '2024-03-28 15:54:07', 1, '96326161 '),
	(6, '2555FEE6-50A2-4C1E-8606-266B18AFDB73', 96326636, '2024-03-28 15:29:47', NULL, '2024-03-28 15:34:45', 1, '96326636 '),
	(7, '2E9BFF0E-3732-42A2-BC1E-6B6C194D287F', 96326636, '2024-03-28 15:29:57', NULL, '2024-03-28 15:34:46', 1, '96326636 '),
	(8, 'F289B610-0453-4602-9674-457CDA983BA9', 96326636, '2024-03-28 15:33:08', NULL, '2024-03-28 15:34:48', 1, '96326636 '),
	(9, '9196BDC9-085A-4B1D-B92D-B4635BA81ACC', 96326636, '2024-03-28 15:33:13', NULL, '2024-03-28 15:34:49', 1, '96326636 '),
	(10, '5488088D-5C2E-4F05-85A5-116AEAC20A3D', 96326636, '2024-03-28 15:33:14', NULL, '2024-03-28 15:34:53', 1, '96326636 '),
	(11, 'FFF2DDB9-DDA4-4183-AAE4-9910141AC4B2', 96326636, '2024-03-28 15:33:15', NULL, '2024-03-28 15:54:08', 1, '96326636 '),
	(12, 'A437413D-6AB4-4735-87E2-D7301D35EFF4', 96326636, '2024-03-28 15:33:15', NULL, '2024-03-28 15:54:10', 1, '96326636 '),
	(13, '35C2B2C4-09F1-4653-BF31-81928499644D', 96326636, '2024-03-28 15:33:55', NULL, '2024-03-28 15:54:11', 1, '96326636 '),
	(14, '3F4632B1-6EEE-469D-A239-4369EEC9E188', 96326636, '2024-03-28 15:34:22', NULL, '2024-03-28 15:54:13', 1, '96326636 '),
	(15, '765FFD14-8002-4C87-83F7-72088C4BDC12', 66575859, '2024-03-28 15:35:19', NULL, '2024-03-28 15:54:14', 1, '66575859 '),
	(16, '7D3B54BB-F17E-4F85-AF4C-CE4AF26D5728', 66575855, '2024-03-28 15:54:00', NULL, '2024-03-28 15:54:15', 1, '66575855 '),
	(17, '1DB4D93C-C37D-4025-BCFA-4FAA040F56F2', 96326631, '2024-03-28 15:54:32', NULL, '2024-04-03 11:54:08', 1, '96326631 '),
	(18, 'B725F3C5-B47F-4DA5-B111-211E9D4F1E75', 96326632, '2024-03-28 15:54:48', NULL, NULL, 1, '96326632 '),
	(19, '1F8FF302-A45C-46AC-BB6C-24FE290E62D1', 96326635, '2024-03-28 16:11:33', NULL, '2024-04-03 11:40:43', 1, '96326635 '),
	(20, '76330E5A-3ABE-4C25-B052-149F863029A2', 12341231, '2024-04-04 14:17:23', NULL, NULL, 2, '12341231 ');

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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.studentprofile: ~16 rows (aproximadamente)
INSERT INTO `studentprofile` (`id`, `student_id`, `name`, `surnames`, `phone`, `email`, `updated`) VALUES
	(1, 1, 'Hugo', 'Sanchis', '665958524', 'hugo@gmail.com', '2024-03-28 12:56:48'),
	(3, 6, 'Hugos', 'Sanchis ', '665958525', 'hugolluissimarro03@gmail.com', NULL),
	(4, 7, 'Hugos', 'Sanchis ', '665958525', 'hugolluissimarro03@gmail.com', NULL),
	(5, 8, 'Hugos', 'Sanchis ', '665958525', 'hugolluissimarro03@gmail.com', NULL),
	(6, 9, 'Hugos', 'Sanchis ', '665958525', 'hugolluissimarro03@gmail.com', NULL),
	(7, 10, 'Hugos', 'Sanchis ', '665958525', 'hugolluissimarro03@gmail.com', NULL),
	(8, 11, 'Hugos', 'Sanchis ', '665958525', 'hugolluissimarro03@gmail.com', NULL),
	(9, 12, 'Hugos', 'Sanchis ', '665958525', 'hugolluissimarro03@gmail.com', NULL),
	(10, 13, 'Hugos', 'Sanchis ', '665958525', 'hugolluissimarro03@gmail.com', NULL),
	(11, 14, 'Hugos', 'Sanchis ', '665958525', 'hugolluissimarro03@gmail.com', NULL),
	(12, 15, 'Jose', 'Sanchis Belda', '665958525', 'jose@gmail.com', NULL),
	(13, 16, 'Hugos', 'Sanchis ', '665958555', 'hugolluissimarro03@gmail.com', NULL),
	(14, 17, 'Hugos', 'Sanchis ', '665958525', 'hugolluissimarro03@gmail.com', '2024-04-03 11:54:05'),
	(15, 18, 'Hugo', 'Sanchis', '666595858', 'hugolluissimarro03@gmail.com', NULL),
	(16, 19, 'Hugos', 'Sanchis ', '666595858', 'hugolluissimarro03@gmail.com', NULL),
	(17, 20, 'Jose', 'Sanchis', '684092823', 'sanchisbeldajose@gmail.com', NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.subject: ~10 rows (aproximadamente)
INSERT INTO `subject` (`id`, `guid`, `name`, `abbr`, `course_id`, `created`, `updated`, `deleted`, `searchdata`) VALUES
	(3, '2112-5121', 'Diseño Grafico', 'DG', 1, '2024-03-18 16:15:04', '2024-04-04 08:33:27', '2024-04-04 08:33:27', 'Diseño Grafico DG '),
	(4, '415183DB-0DD4-45A2-9F12-47770BB93D44', 'Diseño de Interficies', 'DIM', 1, '2024-04-04 09:51:55', '2024-04-04 10:06:20', '2024-04-04 10:06:20', 'Diseño de Interficies DIM '),
	(5, '09977FDB-3A8B-4CB2-BA18-DCE805763A1F', 'Mathematics1', 'DAS', 1, '2024-04-04 09:52:34', NULL, NULL, 'Mathematics1 DAS '),
	(6, '8F46953C-78D0-4233-B6D3-696CDECFA319', 'Mathematics1', 'DAS', 1, '2024-04-04 09:53:01', '2024-04-04 09:53:32', '2024-04-04 09:53:32', 'Mathematics1 DAS '),
	(7, '4247159C-A8E5-4E45-85FB-76E43118AF15', 'Cliente Servidor', 'CS', 1, '2024-04-04 09:53:59', NULL, NULL, 'Cliente Servidor CS '),
	(8, '3C497598-425F-41DC-992B-E0C91E33DB77', 'Mathematics1', 'DAW', 3, '2024-04-04 10:04:08', NULL, NULL, 'Mathematics1 DAW '),
	(9, 'FBD424DA-DD05-49E9-87BB-F78D6922B4F1', 'Hugos', 'DAS', 3, '2024-04-04 10:04:19', NULL, NULL, 'Hugos DAS '),
	(10, '7B376705-602D-474B-9E39-1AFB8FD302FA', 'Hugos', 'DAS', 1, '2024-04-04 10:05:41', NULL, NULL, 'Hugos DAS '),
	(11, '1DC0B623-6FB8-47E5-AEB8-67D7733B4E6A', 'Hugos', 'DAS', 3, '2024-04-04 10:06:13', NULL, NULL, 'Hugos DAS '),
	(12, '6EE686B5-8761-4F54-910E-3AB5B2012790', 'NEw Subject', 'NS', 1, '2024-04-04 14:26:13', NULL, NULL, 'NEw Subject NS ');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.user: ~2 rows (aproximadamente)
INSERT INTO `user` (`id`, `guid`, `email`, `password`, `created`, `updated`, `deleted`, `token`, `expiredate`) VALUES
	(1, 'D0201930-85B5-4121-814B-2017FB44F321', 'hugo.sanchis@vidavia.com', '$2y$10$iXgSHn6PXDMrz5dRNeDqOuccc/Bo2Ur4K6jf5PWd8vlLc9mQ9pSCG', '2024-03-15 15:07:57', NULL, NULL, NULL, NULL),
	(2, '2FD1146E-D21B-4787-AEE1-72D3BE4E5D71', 'jose.sanchis@vidavia.com', '$2y$10$.w3dwJrGA3ol58g3IJFU8uN.QWxIpCtImMlM1sbfhsZTNP2tWGyvW', '2024-03-28 14:42:15', NULL, NULL, '98beece613f19732ae79c28eba776adacd0193f30d2c4a34b2844dd54a3c7ded', '2024-04-05 07:36:24');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla banco_libros.userprofile: ~1 rows (aproximadamente)
INSERT INTO `userprofile` (`id`, `user_id`, `name`, `surnames`, `phone`, `updated`) VALUES
	(1, 1, 'Hugo', 'Sanchis', NULL, NULL),
	(2, 2, 'Jose', 'Sanchis', NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
