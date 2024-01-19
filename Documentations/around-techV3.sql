-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 07 nov. 2023 à 15:55
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `around-tech2`
--

-- --------------------------------------------------------

--
-- Structure de la table `city`
--

DROP TABLE IF EXISTS `city`;
CREATE TABLE IF NOT EXISTS `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `city`
--

INSERT INTO `city` (`id`, `name`) VALUES
(1, 'Montpellier'),
(2, 'Lyon'),
(3, 'Bordeaux'),
(4, 'Paris'),
(5, 'Marseille'),
(6, 'Toulouse'),
(7, 'Nantes'),
(8, 'Saint-Paul'),
(9, 'Nouméa'),
(10, 'Tourcoing'),
(11, 'Marcy-sous-Marle'),
(12, 'Cormeilles-en-Parisis');

-- --------------------------------------------------------

--
-- Structure de la table `expense_report`
--

DROP TABLE IF EXISTS `expense_report`;
CREATE TABLE IF NOT EXISTS `expense_report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` float DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `valid_at` date DEFAULT NULL,
  `mission_id` int NOT NULL,
  `nature_expense_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `expense_report_ibfk_3` (`mission_id`),
  KEY `expense_report_ibfk_4` (`nature_expense_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `expense_report`
--

INSERT INTO `expense_report` (`id`, `amount`, `created_at`, `valid_at`, `mission_id`, `nature_expense_id`) VALUES
(2, 150, '2023-10-18', '2023-11-06', 2, 2),
(12, 9.9, '2023-02-23', NULL, 3, 2),
(13, 12, '2023-02-23', NULL, 3, 1),
(17, 4.23, '2023-04-04', '2023-11-06', 2, 2),
(18, 4.34, '2023-04-04', '2023-11-06', 2, 3),
(19, 8, '2023-04-04', '2023-11-06', 2, 1),
(21, 10.99, '2023-04-07', '2023-11-06', 2, 2),
(22, 23.34, '2023-04-06', '2023-11-06', 2, 2),
(23, 5.34, '2023-04-06', '2023-11-06', 2, 1),
(25, 4343.3, '2023-10-17', '2023-11-06', 1, 1),
(26, 34.8, '2023-10-17', '2023-11-06', 1, 2),
(27, 43, '2023-10-23', '2023-11-06', 1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `mission`
--

DROP TABLE IF EXISTS `mission`;
CREATE TABLE IF NOT EXISTS `mission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nature_mission_id` int DEFAULT NULL,
  `departure_city_id` int DEFAULT NULL,
  `arrival_city_id` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `bonus` float DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `transport_id` int DEFAULT NULL,
  `init_nat_mis_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `transport_id` (`transport_id`),
  KEY `status_id` (`status_id`),
  KEY `arrival_city_id` (`arrival_city_id`),
  KEY `departure_city_id` (`departure_city_id`),
  KEY `mission_ibfk_6` (`nature_mission_id`),
  KEY `mission_ibfk_7` (`init_nat_mis_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `mission`
--

INSERT INTO `mission` (`id`, `nature_mission_id`, `departure_city_id`, `arrival_city_id`, `start_date`, `end_date`, `bonus`, `status_id`, `user_id`, `transport_id`, `init_nat_mis_id`) VALUES
(1, 2, 1, 3, '2023-10-17', '2023-10-23', 0, 2, 1, 1, 2),
(2, 1, 2, 4, '2022-04-04', '2022-04-07', 0, 2, 1, 2, 1),
(3, 3, 1, 5, '2021-02-17', '2021-02-23', 0, 3, 2, 3, 3),
(4, 1, 2, 3, '2024-03-20', '2024-05-31', 0, 3, 2, 2, 1),
(5, 2, 5, 8, '2023-10-09', '2023-10-31', 0, 3, 1, 2, 1),
(8, 3, 12, 1, '2023-10-04', '2024-02-29', 0, 3, 1, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `nature_expense`
--

DROP TABLE IF EXISTS `nature_expense`;
CREATE TABLE IF NOT EXISTS `nature_expense` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_capped` tinyint(1) NOT NULL DEFAULT '0',
  `cap_value` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `nature_expense`
--

INSERT INTO `nature_expense` (`id`, `name`, `is_capped`, `cap_value`) VALUES
(1, 'Restaurant', 1, 200),
(2, 'Essence', 0, 0),
(3, 'Péage', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `nature_mission`
--

DROP TABLE IF EXISTS `nature_mission`;
CREATE TABLE IF NOT EXISTS `nature_mission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `is_charge` tinyint(1) DEFAULT NULL,
  `is_bonus` tinyint(1) DEFAULT NULL,
  `tjm` float NOT NULL,
  `percentage` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `nature_mission`
--

INSERT INTO `nature_mission` (`id`, `name`, `is_charge`, `is_bonus`, `tjm`, `percentage`) VALUES
(1, 'formation', 0, 0, 500, 0.1),
(2, 'conseil', 1, 0, 300, 0.3),
(3, 'expertise technique', 1, 1, 400, 0.4);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'user'),
(2, 'gestion'),
(3, 'super admin');

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(2, 'en attente'),
(3, 'validée'),
(5, 'initiale'),
(6, 'rejetée');

-- --------------------------------------------------------

--
-- Structure de la table `transport`
--

DROP TABLE IF EXISTS `transport`;
CREATE TABLE IF NOT EXISTS `transport` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `transport`
--

INSERT INTO `transport` (`id`, `name`) VALUES
(1, 'voiture de service'),
(2, 'avion'),
(3, 'train'),
(4, 'covoiturage');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int NOT NULL,
  `manager_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `user_ibfk_2` (`manager_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `role_id`, `manager_id`) VALUES
(1, 'John', 'Doe', 'johndoe@example.com', '{bcrypt}$2a$10$83gVfFDEyxL2ObxVTXk/o.sowvXHyPOdzOxElbYh9YhAGzxSxHZce', 1, 1),
(2, 'Gigi', 'Holdman', 'aroundtech@yopmail.com', '{bcrypt}$2a$10$aev5tisaAMgVdArrwl9qwO9NpGaH8W86Aji9B4c3.ueSj.0ecLBXm', 2, 1),
(3, 'Manon', 'Paul', 'paul@example.com', '123', 3, 2);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `expense_report`
--
ALTER TABLE `expense_report`
  ADD CONSTRAINT `expense_report_ibfk_3` FOREIGN KEY (`mission_id`) REFERENCES `mission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `expense_report_ibfk_4` FOREIGN KEY (`nature_expense_id`) REFERENCES `nature_expense` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `mission`
--
ALTER TABLE `mission`
  ADD CONSTRAINT `mission_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `mission_ibfk_2` FOREIGN KEY (`transport_id`) REFERENCES `transport` (`id`),
  ADD CONSTRAINT `mission_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `mission_ibfk_4` FOREIGN KEY (`arrival_city_id`) REFERENCES `city` (`id`),
  ADD CONSTRAINT `mission_ibfk_5` FOREIGN KEY (`departure_city_id`) REFERENCES `city` (`id`),
  ADD CONSTRAINT `mission_ibfk_6` FOREIGN KEY (`nature_mission_id`) REFERENCES `nature_mission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `mission_ibfk_7` FOREIGN KEY (`init_nat_mis_id`) REFERENCES `nature_mission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
