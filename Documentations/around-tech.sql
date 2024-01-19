-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 10 nov. 2023 à 17:03
-- Version du serveur : 8.0.31
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `around-tech`
--

-- --------------------------------------------------------

--
-- Structure de la table `city`
--

CREATE TABLE `city` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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

CREATE TABLE `expense_report` (
  `id` int NOT NULL,
  `amount` float DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `valid_at` date DEFAULT NULL,
  `mission_id` int NOT NULL,
  `nature_expense_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `expense_report`
--

INSERT INTO `expense_report` (`id`, `amount`, `created_at`, `valid_at`, `mission_id`, `nature_expense_id`) VALUES
(2, 58.65, '2023-10-18', NULL, 2, 2),
(12, 9.9, '2023-02-23', NULL, 3, 2),
(13, 12, '2023-02-23', NULL, 3, 1),
(16, 2, '2023-04-06', NULL, 2, 2),
(17, 4.23, '2023-04-04', NULL, 2, 2),
(18, 4.34, '2023-04-04', NULL, 2, 3),
(19, 8, '2023-04-04', NULL, 2, 1),
(20, 9, '2023-04-06', NULL, 2, 2),
(21, 9.99, '2023-04-07', NULL, 2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `mission`
--

CREATE TABLE `mission` (
  `id` int NOT NULL,
  `nature_mission_id` int DEFAULT NULL,
  `departure_city_id` int DEFAULT NULL,
  `arrival_city_id` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `transport_id` int DEFAULT NULL,
  `init_nat_mis_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `mission`
--

INSERT INTO `mission` (`id`, `nature_mission_id`, `departure_city_id`, `arrival_city_id`, `start_date`, `end_date`, `status_id`, `user_id`, `transport_id`, `init_nat_mis_id`) VALUES
(1, 2, 1, 3, '2023-10-17', '2023-10-23', 2, 1, 1, 2),
(2, 1, 2, 4, '2023-04-04', '2023-04-07', 3, 1, 2, 1),
(3, 3, 1, 5, '2023-02-17', '2023-02-23', 2, 2, 3, 3),
(4, 1, 2, 3, '2024-03-20', '2024-05-31', 3, 2, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `nature_expense`
--

CREATE TABLE `nature_expense` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_capped` tinyint(1) NOT NULL DEFAULT '0',
  `cap_value` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `nature_mission` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `is_charge` tinyint(1) DEFAULT NULL,
  `is_bonus` tinyint(1) DEFAULT NULL,
  `tjm` float DEFAULT NULL,
  `percentage` float DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `nature_mission`
--

INSERT INTO `nature_mission` (`id`, `name`, `is_charge`, `is_bonus`, `tjm`, `percentage`, `start_date`, `end_date`) VALUES
(1, 'formation', 0, 0, 500, 1, NULL, NULL),
(2, 'conseil', 1, 0, 300, 3, NULL, NULL),
(3, 'expertise technique', 1, 1, 400, 4, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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

CREATE TABLE `status` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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

CREATE TABLE `transport` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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

CREATE TABLE `user` (
  `id` int NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int NOT NULL,
  `manager_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `role_id`, `manager_id`) VALUES
(1, 'John', 'Doe', 'johnd@aroundtech.com', '$2a$15$dLNgQL9rhWxtfbFEYbcj2.8SDd4Flzbpghu00kmNPsj0HDuIU7yOC', 1, 8),
(2, 'Gigi', 'Holdman', 'gigih@aroundtech.com', '$2a$15$/OZ7WG4SFroXaWwdZRhfP.YSeDWqPa114ZbD7IlZmewct6sZugjR6', 2, 2),
(3, 'Manon', 'Paul', 'manonp@aroundtech.com', '$2a$15$wZ3FkZ5us3FeuhWoZzeviujI3.G82FwxRxQjIa8cdplJxKQeljG5y', 3, 2),
(8, 'James', 'Holmes', 'jamesh@aroundtech.com', '$2a$10$pkLRV0YtMGcNv4kmz4WKde8U0sTC/w.GUN1QPW4PwsYVEAJ8A8bu2', 2, 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `expense_report`
--
ALTER TABLE `expense_report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expense_report_ibfk_3` (`mission_id`),
  ADD KEY `expense_report_ibfk_4` (`nature_expense_id`);

--
-- Index pour la table `mission`
--
ALTER TABLE `mission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `transport_id` (`transport_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `arrival_city_id` (`arrival_city_id`),
  ADD KEY `departure_city_id` (`departure_city_id`),
  ADD KEY `mission_ibfk_6` (`nature_mission_id`),
  ADD KEY `mission_ibfk_7` (`init_nat_mis_id`);

--
-- Index pour la table `nature_expense`
--
ALTER TABLE `nature_expense`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `nature_mission`
--
ALTER TABLE `nature_mission`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `transport`
--
ALTER TABLE `transport`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email_key` (`email`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `user_ibfk_2` (`manager_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `city`
--
ALTER TABLE `city`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `expense_report`
--
ALTER TABLE `expense_report`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `mission`
--
ALTER TABLE `mission`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `nature_expense`
--
ALTER TABLE `nature_expense`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `nature_mission`
--
ALTER TABLE `nature_mission`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `status`
--
ALTER TABLE `status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `transport`
--
ALTER TABLE `transport`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
