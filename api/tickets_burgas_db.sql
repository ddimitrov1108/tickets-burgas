-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2023 at 06:11 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tickets_burgas_db`
--

create database tickets_burgas_db;
use tickets_burgas_db;

drop table if exists bus_tickets;
drop table if exists bus_ticket_details;
drop table if exists users;

-- --------------------------------------------------------

--
-- Table structure for table `bus_tickets`
--

CREATE TABLE `bus_tickets` (
  `barCode` varchar(12) NOT NULL,
  `uid` int(11) NOT NULL,
  `tdid` int(11) NOT NULL,
  `dateOfIssue` datetime NOT NULL DEFAULT current_timestamp(),
  `dateOfExpire` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bus_tickets`
--

INSERT INTO `bus_tickets` (`barCode`, `uid`, `tdid`, `dateOfIssue`, `dateOfExpire`) VALUES
('9CxltUH50XDT', 33, 2, '2023-01-08 11:45:43', '2023-01-08 13:15:43'),
('c37Z1ZFQuIWj', 47, 2, '2023-01-02 14:49:39', '2023-01-02 16:19:39'),
('HqARx7k1111a', 33, 3, '2022-11-16 14:26:16', '2022-11-16 16:26:16'),
('HqARx7kasd33', 33, 3, '2022-11-16 09:26:16', '2022-11-16 11:26:16'),
('HqARx7kasd34', 33, 3, '2022-11-16 16:26:16', '2022-11-16 18:26:16'),
('HqARx7kasd88', 33, 3, '2022-11-16 16:26:16', '2022-11-16 18:26:16'),
('HqARx7kwNJVJ', 33, 3, '2022-12-24 09:26:16', '2022-12-24 11:26:16'),
('Kf9tBxUqGUxE', 33, 1, '2023-01-04 11:04:53', '2023-01-04 12:04:53');

-- --------------------------------------------------------

--
-- Table structure for table `bus_ticket_details`
--

CREATE TABLE `bus_ticket_details` (
  `id` int(11) NOT NULL,
  `travelTime` int(11) NOT NULL DEFAULT 0,
  `cost` double NOT NULL DEFAULT 0,
  `issuer` varchar(60) NOT NULL DEFAULT 'South Station - Burgas / 080040280'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bus_ticket_details`
--

INSERT INTO `bus_ticket_details` (`id`, `travelTime`, `cost`, `issuer`) VALUES
(1, 60, 1.5, 'South Station - Burgas'),
(2, 90, 2, 'South Station - Burgas'),
(3, 120, 2.5, 'South Station - Burgas');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `deactivated` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `deactivated`, `createdAt`) VALUES
(3, 'Stoqn', 'Stoqnov', 'susu2606@gmail.com', '$2a$11$n3.y.5RR0tPXezzz7tsZuucbC6d7U7TycX8OxUAUo8JdGrv3qsN.O', 0, '2022-10-31 09:20:13'),
(33, 'Daniel', 'Dimitrov', 'ddimitrov1108@gmail.com', '$2a$11$tn6Xm81b8Tg1trpzBOJepu0EhA6ls8JZeYCyiU9oa2JeobpetR5Je', 0, '2022-12-14 17:23:49'),
(38, 'Stoqn', 'Stoqnov', 'susu26061@gmail.com', '$2a$11$n3.y.5RR0tPXezzz7tsZuucbC6d7U7TycX8OxUAUo8JdGrv3qsN.O', 0, '2023-01-01 09:20:13'),
(39, 'Daniel', 'Dimitrov', 'test12314@abv.bg', '$2a$11$Rez4ZLKN4bUwrpLePcREOOivqQ9bjZKv7Hu8OmvPFMpcFtMC1pWo.', 0, '2023-01-01 14:28:26'),
(40, 'Daniel', 'Dimitrov', 'ddimitrov11108234@gmail.com', '$2a$11$o91t0BT5RiK.G8jzI2/BduD95Djwp7..L/SMf1DEHKtNQ5wo.ERmO', 0, '2023-01-01 17:23:49'),
(42, 'Daniel', 'Dimitrov', 'test123145123@abv.bg', '$2a$11$Rez4ZLKN4bUwrpLePcREOOivqQ9bjZKv7Hu8OmvPFMpcFtMC1pWo.', 0, '2023-01-01 14:28:26'),
(47, 'aaa', 'aaa', 'aaaa@abv.bg', '$2a$11$izSYJuA2eFEI5LPI0q.PlOsLvvwzruJlccr0Adyz1B7PTWVDrBZ0m', 0, '2023-01-02 14:49:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bus_tickets`
--
ALTER TABLE `bus_tickets`
  ADD PRIMARY KEY (`barCode`),
  ADD KEY `uid` (`uid`),
  ADD KEY `tdid` (`tdid`);

--
-- Indexes for table `bus_ticket_details`
--
ALTER TABLE `bus_ticket_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bus_ticket_details`
--
ALTER TABLE `bus_ticket_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bus_tickets`
--
ALTER TABLE `bus_tickets`
  ADD CONSTRAINT `bus_tickets_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `bus_tickets_ibfk_2` FOREIGN KEY (`tdid`) REFERENCES `bus_ticket_details` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
