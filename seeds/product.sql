-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 07, 2022 at 05:36 PM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `j6zQXIyB22`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `price` float NOT NULL,
  `description` int(11) DEFAULT NULL,
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `productViewed` int(11) NOT NULL DEFAULT '0',
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime NOT NULL,
  `deletedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `description`, `isDeleted`, `productViewed`, `createdDate`, `updatedDate`, `deletedDate`) VALUES
(1, 'Kawasaki Ninja 650', 10.5, NULL, 0, 0, '2022-07-07 00:00:00', '2022-07-07 00:00:00', NULL),
(2, 'Kawasaki Ninja 750', 11.75, NULL, 0, 0, '2022-07-07 00:00:00', '2022-07-07 00:00:00', NULL),
(3, 'Kawasaki Ninja 850', 12.33, NULL, 0, 0, '2022-07-07 00:00:00', '2022-07-07 00:00:00', NULL),
(4, 'Kawasaki Ninja 950', 14.15, NULL, 0, 0, '2022-07-07 00:00:00', '2022-07-07 00:00:00', NULL),
(5, 'Kawasaki Ninja 1000', 17.95, NULL, 0, 0, '2022-07-07 00:00:00', '2022-07-07 00:00:00', NULL),
(6, 'Kawasaki Ninja 12R', 21.75, NULL, 0, 0, '2022-07-07 00:00:00', '2022-07-07 00:00:00', NULL),
(7, 'Kawasaki Ninja 14R', 31, NULL, 0, 0, '2022-07-07 00:00:00', '2022-07-07 00:00:00', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
