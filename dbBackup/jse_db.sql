-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 05 Kas 2020, 21:44:59
-- Sunucu sürümü: 8.0.22-0ubuntu0.20.04.2
-- PHP Sürümü: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `jse_db`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblBlog`
--

CREATE TABLE `tblBlog` (
  `BlogID` int NOT NULL,
  `UserID` int NOT NULL,
  `BlogTitle` varchar(150) NOT NULL,
  `BlogDescription` varchar(200) NOT NULL,
  `BlogContent` text NOT NULL,
  `BlogState` tinyint(1) NOT NULL DEFAULT '0',
  `BlogCreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `BlogMenuID` int NOT NULL,
  `BlogImagePath` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblBlogMenu`
--

CREATE TABLE `tblBlogMenu` (
  `BlogMenuID` int NOT NULL,
  `BlogMenuName` varchar(50) NOT NULL,
  `BlogMenuDescription` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblMessage`
--

CREATE TABLE `tblMessage` (
  `MessageID` int NOT NULL,
  `SenderName` varchar(150) NOT NULL,
  `MessageSubject` varchar(150) NOT NULL,
  `SenderEmail` varchar(100) NOT NULL,
  `Message` text NOT NULL,
  `SenderPhone` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblProject`
--

CREATE TABLE `tblProject` (
  `ProjectID` int NOT NULL,
  `ProjectName` varchar(200) NOT NULL,
  `ProjectDescription` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblSlide`
--

CREATE TABLE `tblSlide` (
  `SlideID` int NOT NULL,
  `SlideImagePath` varchar(150) NOT NULL,
  `SlideLink` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblTeamMember`
--

CREATE TABLE `tblTeamMember` (
  `TeamMemberID` int NOT NULL,
  `TeamMemberName` varchar(100) NOT NULL,
  `TeamMemberTitle` varchar(100) NOT NULL,
  `TeamMemberGithub` varchar(200) NOT NULL,
  `TeamMemberLinkedin` varchar(200) NOT NULL,
  `TeamMemberCompany` varchar(200) NOT NULL,
  `TeamMemberDescription` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUser`
--

CREATE TABLE `tblUser` (
  `UserID` int NOT NULL,
  `UserFirstName` varchar(100) NOT NULL,
  `UserLastName` varchar(100) NOT NULL,
  `UserEmail` varchar(100) NOT NULL,
  `UserPassword` varchar(100) NOT NULL,
  `UserTypeName` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tetikleyiciler `tblUser`
--
DELIMITER $$
CREATE TRIGGER `userBlog` BEFORE DELETE ON `tblUser` FOR EACH ROW UPDATE tblBlog SET UserID=(SELECT UserID FROM tblUser WHERE UserTypeName='Root' ORDER BY RAND() LIMIT 1) WHERE UserID=old.UserID
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUserType`
--

CREATE TABLE `tblUserType` (
  `UserTypeName` varchar(25) NOT NULL,
  `UserTypeNumber` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `tblUserType`
--

INSERT INTO `tblUserType` (`UserTypeName`, `UserTypeNumber`) VALUES
('Administrator', 666),
('Editor', 555),
('Root', 777);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwBlogList`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwBlogList` (
`BlogID` int
,`UserID` int
,`BlogTitle` varchar(150)
,`BlogDescription` varchar(200)
,`BlogContent` text
,`BlogState` tinyint(1)
,`BlogCreatedDate` datetime
,`BlogMenuID` int
,`BlogImagePath` text
,`UserNameSurname` varchar(201)
);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwUserList`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwUserList` (
`UserID` int
,`UserFirstName` varchar(100)
,`UserLastName` varchar(100)
,`UserEmail` varchar(100)
,`UserTypeName` varchar(25)
);

-- --------------------------------------------------------

--
-- Görünüm yapısı `vwBlogList`
--
DROP TABLE IF EXISTS `vwBlogList`;

CREATE VIEW `vwBlogList`  AS  select `tblBlog`.`BlogID` AS `BlogID`,`tblBlog`.`UserID` AS `UserID`,`tblBlog`.`BlogTitle` AS `BlogTitle`,`tblBlog`.`BlogDescription` AS `BlogDescription`,`tblBlog`.`BlogContent` AS `BlogContent`,`tblBlog`.`BlogState` AS `BlogState`,`tblBlog`.`BlogCreatedDate` AS `BlogCreatedDate`,`tblBlog`.`BlogMenuID` AS `BlogMenuID`,`tblBlog`.`BlogImagePath` AS `BlogImagePath`,concat(`tblUser`.`UserFirstName`,' ',`tblUser`.`UserLastName`) AS `UserNameSurname` from (`tblBlog` join `tblUser` on((`tblBlog`.`UserID` = `tblUser`.`UserID`))) ;

-- --------------------------------------------------------

--
-- Görünüm yapısı `vwUserList`
--
DROP TABLE IF EXISTS `vwUserList`;

CREATE VIEW `vwUserList`  AS  select `tblUser`.`UserID` AS `UserID`,`tblUser`.`UserFirstName` AS `UserFirstName`,`tblUser`.`UserLastName` AS `UserLastName`,`tblUser`.`UserEmail` AS `UserEmail`,`tblUser`.`UserTypeName` AS `UserTypeName` from `tblUser` ;

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `tblBlog`
--
ALTER TABLE `tblBlog`
  ADD PRIMARY KEY (`BlogID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `BlogMenuID` (`BlogMenuID`);

--
-- Tablo için indeksler `tblBlogMenu`
--
ALTER TABLE `tblBlogMenu`
  ADD PRIMARY KEY (`BlogMenuID`),
  ADD UNIQUE KEY `BlogMenuName` (`BlogMenuName`);

--
-- Tablo için indeksler `tblMessage`
--
ALTER TABLE `tblMessage`
  ADD PRIMARY KEY (`MessageID`);

--
-- Tablo için indeksler `tblProject`
--
ALTER TABLE `tblProject`
  ADD PRIMARY KEY (`ProjectID`),
  ADD UNIQUE KEY `ProjectName` (`ProjectName`);

--
-- Tablo için indeksler `tblSlide`
--
ALTER TABLE `tblSlide`
  ADD PRIMARY KEY (`SlideID`);

--
-- Tablo için indeksler `tblTeamMember`
--
ALTER TABLE `tblTeamMember`
  ADD PRIMARY KEY (`TeamMemberID`);

--
-- Tablo için indeksler `tblUser`
--
ALTER TABLE `tblUser`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `UserEmail` (`UserEmail`),
  ADD KEY `UserTypeName` (`UserTypeName`);

--
-- Tablo için indeksler `tblUserType`
--
ALTER TABLE `tblUserType`
  ADD PRIMARY KEY (`UserTypeName`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `tblBlog`
--
ALTER TABLE `tblBlog`
  MODIFY `BlogID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `tblBlogMenu`
--
ALTER TABLE `tblBlogMenu`
  MODIFY `BlogMenuID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tablo için AUTO_INCREMENT değeri `tblMessage`
--
ALTER TABLE `tblMessage`
  MODIFY `MessageID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblProject`
--
ALTER TABLE `tblProject`
  MODIFY `ProjectID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `tblSlide`
--
ALTER TABLE `tblSlide`
  MODIFY `SlideID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Tablo için AUTO_INCREMENT değeri `tblTeamMember`
--
ALTER TABLE `tblTeamMember`
  MODIFY `TeamMemberID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblUser`
--
ALTER TABLE `tblUser`
  MODIFY `UserID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `tblBlog`
--
ALTER TABLE `tblBlog`
  ADD CONSTRAINT `tblBlog_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tblUser` (`UserID`),
  ADD CONSTRAINT `tblBlog_ibfk_2` FOREIGN KEY (`BlogMenuID`) REFERENCES `tblBlogMenu` (`BlogMenuID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Tablo kısıtlamaları `tblUser`
--
ALTER TABLE `tblUser`
  ADD CONSTRAINT `tblUser_ibfk_1` FOREIGN KEY (`UserTypeName`) REFERENCES `tblUserType` (`UserTypeName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;