-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2024 at 10:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `DevicePlatform` varchar(100) NOT NULL,
  `DeviceUUID` varchar(150) NOT NULL,
  `DeviceVersion` varchar(50) NOT NULL,
  `AppInstalledDate` datetime NOT NULL,
  `AppExipiredDate` datetime NOT NULL,
  `IsSubscribedUser` enum('0','1') NOT NULL,
  `referralcode` text NOT NULL,
  `UserName` varchar(150) NOT NULL,
  `UserEmail` varchar(150) DEFAULT NULL,
  `UserMobileNo` varchar(15) DEFAULT NULL,
  `UserGeoAddress` varchar(500) NOT NULL,
  `UserWPLoginRegistered` enum('0','1') NOT NULL DEFAULT '0',
  `IsRegistered` enum('0','1') NOT NULL DEFAULT '0',
  `ClientId` int(11) NOT NULL DEFAULT 1,
  `AppLoggedIn` enum('0','1') NOT NULL DEFAULT '0',
  `AppRegisteredDate` datetime NOT NULL,
  `Password` text NOT NULL,
  `userlog` enum('yes','no') NOT NULL DEFAULT 'no',
  `SecretKey` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `DevicePlatform`, `DeviceUUID`, `DeviceVersion`, `AppInstalledDate`, `AppExipiredDate`, `IsSubscribedUser`, `referralcode`, `UserName`, `UserEmail`, `UserMobileNo`, `UserGeoAddress`, `UserWPLoginRegistered`, `IsRegistered`, `ClientId`, `AppLoggedIn`, `AppRegisteredDate`, `Password`, `userlog`, `SecretKey`) VALUES
(2, 'Android', '2ae52bfb03b38cde', '4.4.2', '2018-11-26 12:54:18', '2019-08-29 00:00:00', '1', '', 'manikandan', 'manikandan91095@gmail.com', '8148405281', 'Latitude: 10.2981922\r\n Longitude: 77.8826382\r\nChennai - Theni Hwy, Jivalsaragu, Tamil Nadu 624303, India', '1', '1', 1, '1', '2018-11-26 12:54:18', '202cb962ac59075b964b07152d234b70', 'no', NULL),
(4, 'Android', '8217b5b89f061763', '7.1.2', '2019-05-16 07:22:47', '2020-05-23 05:50:46', '1', '5cdd0fc7c7f35', 'Testing', 'Testing@fastura.com', '9036782332', 'Permission Denied', '1', '1', 1, '1', '2019-05-16 07:22:47', '81dc9bdb52d04dc20036dbd8313ed055', 'no', NULL),
(5, 'Moto G (5) Plus', '9a13aaba5c7cd8de', '10', '2019-09-09 02:03:53', '2021-09-16 10:41:41', '0', '5d75b30920dc8', 'Fastura', 'contact@fastura.com', ' 	8903330035', 'Permission Denied', '1', '1', 1, '1', '2019-09-09 02:03:53', '96be3ac9ae0508c00631d022428ddbb9', 'no', NULL),
(6, '', '', '', '2024-03-13 18:31:17', '2024-03-13 18:31:17', '', '', '', 'paulwesly0125@gmail.com', NULL, '', '0', '0', 1, '0', '2024-03-13 18:31:17', '25d55ad283aa400af464c76d713c07ad', 'no', '58399561-94a0-4b90-b3a7-182483fd1c17'),
(7, '', '', '', '2024-04-16 09:01:20', '2024-04-16 09:01:20', '', '', '', 'abc@gmail.com', NULL, '', '0', '0', 1, '0', '2024-04-16 09:01:20', '25d55ad283aa400af464c76d713c07ad', 'no', 'aa30fdbf-1c39-4bf1-ad8f-cbab3db25926');

-- --------------------------------------------------------

--
-- Table structure for table `appsettings`
--

CREATE TABLE `appsettings` (
  `id` int(11) NOT NULL,
  `clientid` int(11) NOT NULL DEFAULT 1,
  `webserviceurl` varchar(150) NOT NULL,
  `paymenturl` varchar(150) NOT NULL,
  `trailexpiredmsg` varchar(2000) NOT NULL,
  `trailperioddays` int(11) NOT NULL DEFAULT 14,
  `paymentexpiredmsg` varchar(2000) NOT NULL,
  `termsandconditions` varchar(2000) NOT NULL,
  `aboutcompany` varchar(2500) NOT NULL,
  `smsserverurl` varchar(150) NOT NULL,
  `newsurl` varchar(250) NOT NULL,
  `twitter_oauth_token` varchar(250) NOT NULL,
  `twitter_oauth_token_secret` varchar(250) NOT NULL,
  `freeactivationterms` varchar(1500) NOT NULL,
  `freeactivationstatus` enum('on','off') NOT NULL,
  `Promocodestatus` enum('off','on') NOT NULL,
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `appsettings`
--

INSERT INTO `appsettings` (`id`, `clientid`, `webserviceurl`, `paymenturl`, `trailexpiredmsg`, `trailperioddays`, `paymentexpiredmsg`, `termsandconditions`, `aboutcompany`, `smsserverurl`, `newsurl`, `twitter_oauth_token`, `twitter_oauth_token_secret`, `freeactivationterms`, `freeactivationstatus`, `Promocodestatus`, `updated_on`) VALUES
(1, 1, 'http://mcxdev.fastura.net/wp-json/mcx/v1/', 'http://mcxtracker.com/payment.html           ', 'Your trial period has been expired. Please register your account to get 7 more days free. Please Contact us at  9036782332 | 8903330035  or mail to support@fastura.com', 7, '<p>Rs.3000/M    <strong>Thank you so much</strong>.Your subscription has been expired. Please make the payment to our Bank Account and inform us.</p>\r\n\r\n<h3>Fastura technologies pvt ltd</h3>\r\n\r\n<h3><strong>ICICI bank A/C NO:000205501011</strong></h3>\r\n\r\n<h3><strong>IFSC Code: ICIC0000002</strong></h3>\r\n\r\n<p> </p>\r\n\r\n<p>For any queries, please Contact us at 8903330035 / 9036782332 or mail to supportteam@fastura.com</p>\r\n\r\n<h1>Rs.2500/M</h1>\r\n\r\n<p>For online payment, click subscribe button</p>\r\n', 'Disclaimer : Fastura.com will not accept any liability for loss or damage as a result of reliance on the information contained within this website including data, quotes, charts and buy/sell signals.', '<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\"      content=\'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0\'>\r\n    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css\"\r\n        integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\r\n    <title>About</title>\r\n    <style type=\"text/css\">\r\n    body{\r\n    margin: 10px 10px 10px;\r\n    }\r\n    </style>\r\n</head>\r\n\r\n<body>\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n<p>Commodity Market Tracker is a flagship product of our company Fastura Technologies. Downloads of our App has reached more than 50k+ customers. Our company Fastura is an Award winning company which develops more market oriented mobile apps.</p>\r\n        </div>\r\n        <div class=\"row\">\r\n\r\n<p>To know more details of our product, visit <a href=\"http://market-tracker.in\">market-tracker.in</a></p>\r\n        </div>\r\n        <div class=\"row\">\r\n<p>Please Contact us at  <strong>9036782332 </strong>| <strong>8903330035 </strong> or mail to <a href=\"http://supportteam@fastura.com\">supportteam@fastura.com</a> </p>\r\n        </div>\r\n    </div>\r\n</body>\r\n</html>', '', 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fmarket-tracker.in%2Findex.php%2Ffeed%2F', '', '', '', 'off', '', '2020-04-14 07:14:20');

-- --------------------------------------------------------

--
-- Table structure for table `bankdetails`
--

CREATE TABLE `bankdetails` (
  `id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `bank_name` varchar(100) NOT NULL,
  `account_no` varchar(20) NOT NULL,
  `ifsc_code` varchar(11) NOT NULL,
  `branch_name` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `bankdetails`
--

INSERT INTO `bankdetails` (`id`, `user_name`, `bank_name`, `account_no`, `ifsc_code`, `branch_name`) VALUES
(2, 'Karthikeyan K', 'ICICI bank', '106201501066', 'ICIC0000562', 'MADURAI - TEPPAKULAM'),
(5, 'Karthikeyan K', 'ICICI', 'fasturakarthik@okici', 'ICIC0000562', 'MADURAI - TEPPAKULAM');

-- --------------------------------------------------------

--
-- Table structure for table `calls`
--

CREATE TABLE `calls` (
  `id` int(11) NOT NULL,
  `type` enum('buy','sell') NOT NULL,
  `indicator` enum('buy','sell','','') NOT NULL,
  `call_type` enum('','CASH','FUTURE','PE','CE') NOT NULL,
  `quantity` int(11) NOT NULL,
  `commodity` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `expiry_date` varchar(30) NOT NULL,
  `holding_period` text NOT NULL,
  `holding_time` enum('None','Month','Months','Year','Years') NOT NULL,
  `margin` text NOT NULL,
  `additional_commodity_string` varchar(250) NOT NULL,
  `subscribe_plan` enum('normal','premium') NOT NULL,
  `price_type` enum('at','between') NOT NULL,
  `at_price` decimal(11,2) NOT NULL,
  `strike_price` decimal(11,2) NOT NULL,
  `from_price` decimal(11,2) NOT NULL,
  `to_price` decimal(11,2) NOT NULL,
  `target1` decimal(11,2) NOT NULL,
  `target1_achieved` varchar(10) NOT NULL,
  `target2` decimal(11,2) NOT NULL,
  `target2_achieved` varchar(10) NOT NULL,
  `target3` decimal(11,2) NOT NULL,
  `target3_achieved` varchar(10) NOT NULL,
  `stop_loss` decimal(11,2) NOT NULL,
  `stop_loss_met` varchar(10) NOT NULL,
  `exit_price` decimal(11,2) NOT NULL,
  `exit_call` varchar(10) NOT NULL,
  `follow_up` enum('target','stop_loss','exit') NOT NULL,
  `profit_loss` decimal(11,2) NOT NULL,
  `last_sms` varchar(500) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` varchar(30) DEFAULT NULL,
  `updated_on` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `calls`
--

INSERT INTO `calls` (`id`, `type`, `indicator`, `call_type`, `quantity`, `commodity`, `name`, `expiry_date`, `holding_period`, `holding_time`, `margin`, `additional_commodity_string`, `subscribe_plan`, `price_type`, `at_price`, `strike_price`, `from_price`, `to_price`, `target1`, `target1_achieved`, `target2`, `target2_achieved`, `target3`, `target3_achieved`, `stop_loss`, `stop_loss_met`, `exit_price`, `exit_call`, `follow_up`, `profit_loss`, `last_sms`, `created_by`, `created_on`, `updated_on`) VALUES
(18, 'buy', 'buy', 'FUTURE', 0, 1, '', 'NOV', '', 'None', '', 'FUTURE', 'normal', 'at', 3010.00, 0.00, 0.00, 0.00, 3030.00, '', 3045.00, '', 3060.00, '', 3985.00, '', 3010.00, 'yes', 'exit', 0.00, '11:20AM EXIT CRUDE NOV FUTURE AT 3010.00', 0, '2015-10-22 18:06:08', '0000-00-00 00:00:00'),
(20, 'buy', 'buy', 'FUTURE', 0, 5, '', 'NOV', '', 'None', '', 'FUTURE', 'normal', 'at', 347.00, 0.00, 0.00, 0.00, 348.00, 'yes', 349.00, '', 350.00, '', 345.00, '', 0.00, '', 'target', 1000.00, '3:41PM COPPER  NOV FUTURE TGT1  ACHIEVED AT 346.35. BOOK PROFIT', 0, '2015-10-22 18:19:06', '0000-00-00 00:00:00'),
(21, 'sell', 'buy', 'FUTURE', 0, 10, '', 'NOV', '', 'None', '', 'FUTURE', 'normal', 'at', 153.00, 0.00, 0.00, 0.00, 152.00, 'yes', 151.00, '', 0.00, '', 155.00, '', 0.00, '', 'target', -1250.00, '7:30PM NATURAL GAS  NOV FUTURE TGT1 ACHIEVED. BOOK PROFIT', 0, '2015-10-23 15:13:29', '0000-00-00 00:00:00'),
(8035, 'sell', 'buy', 'FUTURE', 0, 5, '', 'APR', '', 'None', '', 'FUTURE', 'normal', 'between', 400.00, 0.00, 0.00, 0.00, 398.80, '', 397.60, '', 396.40, '', 401.50, '', 0.00, '', 'target', 0.00, '\n                  01:45 PM sell COPPER APR FUTURE BETWEEN 400 TGT  398.8/397.6/396.4  SL 401.5', 0, '2024-04-29 01:45:07', '2024-04-29 13:45:30');

-- --------------------------------------------------------

--
-- Table structure for table `commodities`
--

CREATE TABLE `commodities` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `rate` int(11) NOT NULL,
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `commodities`
--

INSERT INTO `commodities` (`id`, `name`, `rate`, `updated_on`, `created_on`, `created_by`) VALUES
(1, 'CRUDE', 100, '2021-05-28 04:15:33', '2021-05-28 04:15:33', 1),
(2, 'GOLD', 100, '2017-03-10 05:24:24', '0000-00-00 00:00:00', 1),
(3, 'SILVER', 30, '2017-03-10 05:24:53', '0000-00-00 00:00:00', 1),
(5, 'COPPER', 2500, '2019-10-14 14:32:23', '0000-00-00 00:00:00', 1),
(6, 'ZINC', 5000, '2015-10-19 09:43:54', '0000-00-00 00:00:00', 0),
(7, 'LEAD', 5000, '2015-10-19 09:44:10', '0000-00-00 00:00:00', 0),
(8, 'NICKEL', 1500, '2017-03-10 05:22:45', '0000-00-00 00:00:00', 1),
(9, 'ALUMINIUM', 5000, '2015-10-19 09:44:42', '0000-00-00 00:00:00', 0),
(10, 'NATURAL GAS', 1250, '2015-10-19 09:44:59', '0000-00-00 00:00:00', 0),
(11, 'SILVERMINI', 5, '2017-03-10 05:25:40', '0000-00-00 00:00:00', 1),
(17, 'GOLDGUINEA', 8, '2023-01-18 08:57:05', '2023-01-18 08:57:05', 1),
(18, 'GOLDPETAL', 1, '2023-01-18 09:04:43', '0000-00-00 00:00:00', 1),
(30, 'ALUMINI', 1000, '2023-04-19 14:30:15', '2023-04-19 14:30:15', 1),
(31, 'LEAD MINI', 1000, '2023-04-19 14:31:58', '2023-04-19 14:31:58', 1),
(32, 'ZINC MINI', 1000, '2023-04-19 14:32:42', '2023-04-19 14:32:42', 1),
(33, 'CRUDE MINI', 10, '2023-04-19 14:33:38', '2023-04-19 14:33:38', 1),
(34, 'NATGAS MINI', 250, '2023-04-19 14:34:25', '2023-04-19 14:34:25', 1),
(37, 'GOLD MINI', 10, '2023-04-19 16:05:50', '2023-04-19 16:05:50', 1),
(38, 'SILVER MICRO', 1, '2023-08-17 08:05:57', '2023-08-17 08:05:57', 1);

-- --------------------------------------------------------

--
-- Table structure for table `commoditiespoint`
--

CREATE TABLE `commoditiespoint` (
  `ID` int(11) NOT NULL,
  `COMMODITIES` varchar(50) NOT NULL,
  `R1` decimal(10,2) NOT NULL,
  `R2` decimal(10,2) NOT NULL,
  `R3` decimal(10,2) NOT NULL,
  `T1` decimal(10,2) NOT NULL,
  `T2` decimal(10,2) NOT NULL,
  `T3` decimal(10,2) NOT NULL,
  `SL` decimal(10,2) NOT NULL,
  `Commodities_ID` int(11) DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `commoditiespoint`
--

INSERT INTO `commoditiespoint` (`ID`, `COMMODITIES`, `R1`, `R2`, `R3`, `T1`, `T2`, `T3`, `SL`, `Commodities_ID`) VALUES
(1, 'CRUDE', 20.00, 30.00, 40.00, 20.00, 20.00, 20.00, 20.00, 1),
(2, 'GOLD', 80.00, 80.00, 80.00, 80.00, 80.00, 80.00, 80.00, 2),
(3, 'SILVER', 200.00, 200.00, 200.00, 200.00, 200.00, 200.00, 200.00, 3),
(5, 'COPPER', 1.20, 1.20, 1.20, 1.20, 1.20, 1.20, 1.50, 5),
(6, 'ZINC', 0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 6),
(7, 'LEAD', 0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 7),
(8, 'NICKEL', 6.00, 6.00, 6.00, 5.00, 5.00, 5.00, 6.00, 8),
(9, 'ALUMINIUM', 0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 9),
(10, 'NATURAL GAS', 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 10),
(11, 'SILVERMINI', 200.00, 200.00, 200.00, 200.00, 200.00, 200.00, 200.00, 11),
(13, 'MENTHAOIL', 10.00, 10.00, 10.00, 20.00, 20.00, 20.00, 20.00, 13),
(14, 'Mcxbulldex', 20.00, 20.00, 20.00, 20.00, 20.00, 20.00, 20.00, 14),
(15, 'Mcxmetldex', 20.00, 20.00, 20.00, 20.00, 20.00, 20.00, 20.00, 15),
(16, 'Gold Petal', 80.00, 80.00, 80.00, 80.00, 80.00, 80.00, 80.00, 16),
(17, 'GOLDGUINEA', 100.00, 100.00, 100.00, 100.00, 100.00, 100.00, 100.00, 17),
(18, 'GOLDPETAL', 100.00, 100.00, 100.00, 100.00, 100.00, 100.00, 100.00, 18),
(31, '', 200.00, 200.00, 200.00, 200.00, 200.00, 200.00, 200.00, 38),
(24, 'ALUMINI', 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 30),
(25, 'LEAD MINI', 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 31),
(26, 'ZINC MINI', 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 32),
(27, 'CRUDE MINI', 50.00, 50.00, 50.00, 50.00, 50.00, 50.00, 50.00, 33),
(28, 'NATGAS MINI', 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 34),
(30, 'GOLD MINI', 80.00, 80.00, 80.00, 80.00, 80.00, 80.00, 80.00, 37);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `emp_name` varchar(10) NOT NULL,
  `email` varchar(10) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `salary` varchar(10) NOT NULL,
  `city` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `emp_name`, `email`, `gender`, `salary`, `city`) VALUES
(1, 'karthik', 'karthik', 'male', 'good', 'chennai');

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` int(11) NOT NULL,
  `faq` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `faq`) VALUES
(1, '<div><strong>1) How can I use Commodity Market Tracker?</strong><br>\r\n\r\n&nbsp;&nbsp;&nbsp;&nbsp;Commodity Market Tracker is providing the Market-Calls, Pivot Levels, News, Performance, and Chart. Using this unique information you can trade on the go.</div>\r\n\r\n<hr>\r\n\r\n\r\n<div><strong>2) What is Market Calls?</strong><br>\r\n\r\n&nbsp;&nbsp;&nbsp;&nbsp; Market calls are Tips or Unique information which is telling what to buy, when to buy, at what price, when to sell and when to exit if goes wrong. For Example, BUY CRUDE JULY CONTRACT at 950R, Target 955R Stoploss 945R.</div>\r\n\r\n<hr>\r\n\r\n\r\n<div><strong>3) What is Pivot Levels?</strong><br>\r\n\r\n&nbsp;&nbsp;&nbsp;&nbsp;The pivot point levels are composed of a pivot point, three higher resistance levels known as R1, R2, and R3, and three lower pivot point supports known as S1, S2, and S3.<br>\r\nA pivot is a significant price level established when a stock fails to penetrate it to the up or downside or the price has a breakout past the pivot level.</div>\r\n\r\n<hr>\r\n<div><strong>4) What is Performance Page?</strong><br>\r\n\r\n    Performance Page reflects our prediction and its accuracy.Its shows on calendar view. You can check the performance of our Market Calls upto 2 previous years</div>\r\n\r\n<hr>\r\n<div> </div>\r\n\r\n\r\n\r\n\r\n\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `holiday`
--

CREATE TABLE `holiday` (
  `ID` bigint(20) NOT NULL,
  `Date` date NOT NULL,
  `Days` text NOT NULL,
  `Particulars` text NOT NULL,
  `Ms` text NOT NULL,
  `Es` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `holiday`
--

INSERT INTO `holiday` (`ID`, `Date`, `Days`, `Particulars`, `Ms`, `Es`) VALUES
(42, '2020-05-01', 'Friday	', 'Maharashtra Day/ May Day (Labour Day)', '<font color=\"red\">Closed</font>', '<font color=\"green\"><b>Open</b></font>'),
(43, '2020-05-25', 'Monday	', 'Id-Ul-Fitr (Ramzan Id)', '<font color=\"red\">Closed</font>', '<font color=\"green\"><b>Open</b></font>'),
(47, '2020-10-02', '	Friday	', 'Gandhi Jayanti	', '<font color=\"red\">Closed</font>', '<font color=\"red\">Closed</font>'),
(53, '2020-11-16', 'Monday', 'Diwali-Balipratipada', '<font color=\"red\">Closed</font>', '<font color=\"green\"><b>Open</b></font>'),
(54, '2020-11-30', 'Monday', 'Guru Nanak Jayanti', '<font color=\"red\">Closed</font>', '<font color=\"green\"><b>Open</b></font>'),
(57, '2020-04-06', 'Monday', 'Mahavir Jayanti', '<font color=\"red\">Closed</font>', '<font color=\"green\">Open</font>'),
(58, '2020-04-14', 'Tuesday', 'Dr.Babasaheb Ambedkar Jayanti', '<font color=\"red\">Closed</font>', '<font color=\"green\">Open</font>'),
(59, '2020-12-25', 'Friday', 'Christmas Day', '<font color=\"red\">Closed</font>', '<font color=\"red\">Closed</font>');

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `ID` int(11) NOT NULL,
  `TV` varchar(25) NOT NULL,
  `SN` varchar(25) NOT NULL,
  `MN` varchar(25) NOT NULL,
  `R1` decimal(10,2) NOT NULL,
  `R2` decimal(10,2) NOT NULL,
  `R3` decimal(10,2) NOT NULL,
  `S1` decimal(10,2) NOT NULL,
  `S2` decimal(10,2) NOT NULL,
  `S3` decimal(10,2) NOT NULL,
  `DV` varchar(25) NOT NULL,
  `GN` varchar(25) NOT NULL,
  `created_on` varchar(30) DEFAULT NULL,
  `updated_on` varchar(30) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `Levels_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `levels`
--

INSERT INTO `levels` (`ID`, `TV`, `SN`, `MN`, `R1`, `R2`, `R3`, `S1`, `S2`, `S3`, `DV`, `GN`, `created_on`, `updated_on`, `created_by`, `Levels_id`) VALUES
(1, '10:02 AM', 'CRUDE', '6324', 6344.00, 6374.00, 6414.00, 6304.00, 6284.00, 6264.00, '', '', '2024-02-09 15:32:44', '2024-02-09 15:32:44', 1, '1'),
(2, '10:03 AM', 'GOLD', '62439', 62519.00, 62599.00, 62679.00, 62359.00, 62279.00, 62199.00, '', '', '2024-02-09 15:33:17', '2024-02-09 15:33:17', 1, '2'),
(3, '10:06 AM', 'SILVER', '70973', 71173.00, 71373.00, 71573.00, 70773.00, 70573.00, 70373.00, '', '', '2024-02-09 15:36:27', '2024-02-09 15:36:27', 1, '3'),
(6, '10:06 AM', 'ZINC', '209.40', 209.90, 210.40, 210.90, 208.90, 208.40, 207.90, '', '', '2024-02-09 15:36:44', '2024-02-09 15:36:44', 1, '6'),
(7, '10:04 AM', 'LEAD', '175.95', 176.45, 176.95, 177.45, 175.45, 174.95, 174.45, '', '', '2024-02-09 15:34:09', '2024-02-09 15:34:09', 1, '7'),
(8, '10:06 AM', 'NICKEL', '1371.6', 1377.60, 1383.60, 1389.60, 1366.60, 1361.60, 1356.60, '', '', '2024-02-09 15:36:09', '2024-02-09 15:36:09', 1, '8'),
(10, '10:05 AM', 'NATURAL GAS', '156.1', 158.10, 160.10, 162.10, 154.10, 152.10, 150.10, '', '', '2024-02-09 15:35:52', '2024-02-09 15:35:52', 1, '10'),
(13, '10:05 AM', 'MENTHAOIL', '910', 920.00, 930.00, 940.00, 890.00, 870.00, 850.00, '', '', '2024-02-09 15:35:18', '2024-02-09 15:35:18', 1, '13'),
(14, '10:04 AM', 'mcxbulldex', '16058', 16078.00, 16098.00, 16118.00, 16038.00, 16018.00, 15998.00, '', '', '2024-02-09 15:34:46', '2024-02-09 15:34:46', 1, '14'),
(15, '10:05 AM', 'mcxmetldex', '15012', 15032.00, 15052.00, 15072.00, 14992.00, 14972.00, 14952.00, '', '', '2024-02-09 15:35:02', '2024-02-09 15:35:02', 1, '15'),
(16, '10:03 AM', 'Gold Petal', '6115', 6195.00, 6275.00, 6355.00, 6035.00, 5955.00, 5875.00, '', '', '2024-02-09 15:33:52', '2024-02-09 15:33:52', 1, '16'),
(31, '10:04 AM', 'LEAD MINI', '176.20', 177.20, 178.20, 179.20, 175.20, 174.20, 173.20, '', '', '2024-02-09 15:34:28', '2024-02-09 15:34:28', 1, '31'),
(32, '10:07 AM', 'ZINC MINI', '209.35', 210.35, 211.35, 212.35, 208.35, 207.35, 206.35, '', '', '2024-02-09 15:37:01', '2024-02-09 15:37:01', 1, '32'),
(33, '10:03 AM', 'CRUDE MINI', '6324', 6374.00, 6424.00, 6474.00, 6274.00, 6224.00, 6174.00, '', '', '2024-02-09 15:33:02', '2024-02-09 15:33:02', 1, '33'),
(34, '10:05 AM', 'NATGAS MINI', '156.2', 158.20, 160.20, 162.20, 154.20, 152.20, 150.20, '', '', '2024-02-09 15:35:32', '2024-02-09 15:35:32', 1, '34'),
(37, '10:03 AM', 'GOLD MINI', '62240', 62320.00, 62400.00, 62480.00, 62160.00, 62080.00, 62000.00, '', '', '2024-02-09 15:33:35', '2024-02-09 15:33:35', 1, '37'),
(59, '9:14:26 PM', 'COPPER', '123', 124.20, 124.20, 124.20, 121.80, 121.80, 121.80, '', '', '2024-04-28 09:14:26 PM', NULL, 1, NULL),
(60, '9:15:37 PM', 'ALUMINIUM', '192.5', 193.00, 193.00, 193.00, 192.00, 192.00, 192.00, '', '', '2024-04-28 09:15:37 PM', NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `login_activity`
--

CREATE TABLE `login_activity` (
  `id` int(11) NOT NULL,
  `UserEmail` varchar(255) NOT NULL,
  `Token` text NOT NULL,
  `TimeStamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_activity`
--

INSERT INTO `login_activity` (`id`, `UserEmail`, `Token`, `TimeStamp`) VALUES
(1, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTkzNDk0NSwiZXhwIjoxNzExOTM4NTQ1fQ.0S-qetSOOzz_JZF5ETfcfEgt9cSItnYlNRLCc62Z8Ns', '2024-04-01 01:29:05'),
(2, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTkzNTAzNCwiZXhwIjoxNzExOTM4NjM0fQ.9sPp7yG2Ki9IhyB9-Une_1VqDh9fH1jrql6RkTjxbNc', '2024-04-01 01:30:34'),
(3, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk0OTQ1MSwiZXhwIjoxNzExOTUzMDUxfQ.TSmDD1y7VgDmuPZhgjWWx6gKfkTLXzJ8JIvd8EMVUUw', '2024-04-01 05:30:51'),
(4, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk0OTUyMiwiZXhwIjoxNzExOTUzMTIyfQ.sWrEb_AkpXove6ORlHSWGOxHknEeqno3NAuPxSmvEdE', '2024-04-01 05:32:02'),
(5, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk0OTYxNiwiZXhwIjoxNzExOTUzMjE2fQ.-xKpTa5q7AwZy6MLs3BKyqH7DkqIDASH64qiAOSkJdI', '2024-04-01 05:33:36'),
(6, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk0OTY3NSwiZXhwIjoxNzExOTUzMjc1fQ.2MdhA9Q4YKovz3uLDf8MzldnFUtN54BG12ci54NBXls', '2024-04-01 05:34:35'),
(7, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk1MDc4MCwiZXhwIjoxNzExOTUwODQwfQ.5aU_t78TPBK9dZxJhKepGs6b2rUwacEengl6phb0Zdc', '2024-04-01 05:53:00'),
(8, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk1OTIyOCwiZXhwIjoxNzExOTYyODI4fQ.jgSGFmGLVqeN_WaMOmF70Jd7ukZn_1O4y7l2tTUKh4I', '2024-04-01 08:13:48'),
(9, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk2MTkyOCwiZXhwIjoxNzExOTY1NTI4fQ.QuA5kIk7ahII_j0jDxVSjOWB66KRJyo6plOBOmlED8M', '2024-04-01 08:58:48'),
(10, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk3ODQ2OCwiZXhwIjoxNzExOTgyMDY4fQ.5UjzxLRls3niBoULsVKTnmUQgKaPyYNmqFWzIEnnF_w', '2024-04-01 13:34:28'),
(11, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk3ODczMCwiZXhwIjoxNzExOTgyMzMwfQ.9hipUxNOa9o-pDKktKZ1lU98NlqRxWJynj59POSKNLI', '2024-04-01 13:38:50'),
(12, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk3ODc2NCwiZXhwIjoxNzExOTgyMzY0fQ.CDrAe8z72Xqqo13IeJ_fpb2g6SpU_QlATSWh_Gw0k74', '2024-04-01 13:39:24'),
(13, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk3ODgxNiwiZXhwIjoxNzExOTgyNDE2fQ.nHifqHntYsvzRU2Yb6flSgR8SHTJ_Abh-hy9LeCe2yQ', '2024-04-01 13:40:16'),
(14, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk3OTI0MSwiZXhwIjoxNzExOTgyODQxfQ.pMuSpHGKq150lbT-c_tnCUmds6XTGYkEhYr5aq_We2Q', '2024-04-01 13:47:21'),
(15, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk3OTI0OCwiZXhwIjoxNzExOTgyODQ4fQ.I7sf0_mpkz-ejsCTHeH8JQYKExbsQjUWYRpgm_oqCCs', '2024-04-01 13:47:28'),
(16, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk4MDA4NSwiZXhwIjoxNzExOTgzNjg1fQ.ViTMyJRD71NRiM2k-eKhxtOcP575gqht95migiwQJv0', '2024-04-01 14:01:25'),
(17, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk4NTM0MCwiZXhwIjoxNzExOTg4OTQwfQ.kKlibAfI1HeKjMbQh0txhE1LFypBh93A4aqbh3UMwq4', '2024-04-01 15:29:00'),
(18, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk4NzY5NSwiZXhwIjoxNzExOTkxMjk1fQ.Ga5OrDWIevaXAITqyiNa7rZlglkTnCpKEmnLrQGl61M', '2024-04-01 16:08:15'),
(19, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk4ODcwOSwiZXhwIjoxNzExOTkyMzA5fQ.XBHu4IGOo627WVyT5nPbfRjZOYrFpEyluO_NhILaifY', '2024-04-01 16:25:09'),
(20, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMTk5MzI3NiwiZXhwIjoxNzExOTk2ODc2fQ.u0ulxppmMnUOh3MukWp3Pr98z502DzyxrFCXleBqhjc', '2024-04-01 17:41:16'),
(21, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAwOTQzOSwiZXhwIjoxNzEyMDEzMDM5fQ.suHDb4crItIw0S28s8ej3k-jWnrTZpO03QcayOrFwFk', '2024-04-01 22:10:39'),
(22, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAwOTU0MCwiZXhwIjoxNzEyMDEzMTQwfQ.dtugRTC-hZp5dl_FWWCP429X5uk-C5KWjJ94ap4QuxI', '2024-04-01 22:12:20'),
(23, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAwOTY4NSwiZXhwIjoxNzEyMDEzMjg1fQ.U-XD6I5XDXgK_VfdmLYXfxJNHmQli48XCT632L9HmIw', '2024-04-01 22:14:45'),
(24, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAxMDU4NSwiZXhwIjoxNzEyMDE0MTg1fQ.sXbzbLHV7z6YRhI41TxLc86wGUtcBgRFuOyb5wduAEo', '2024-04-01 22:29:45'),
(25, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAxMTAxMSwiZXhwIjoxNzEyMDE0NjExfQ.GY2g3ZS2_V0L1EzNyWaniZKKeFx9u0VMKPy7in8EGe8', '2024-04-01 22:36:51'),
(26, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAxMjIzOCwiZXhwIjoxNzEyMDE1ODM4fQ.kZ4tWrksQOSaWOE0UxEdbesBM_PFnuySz0Z254Dk-3w', '2024-04-01 22:57:18'),
(27, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAxMjk0MywiZXhwIjoxNzEyMDE2NTQzfQ.el0kh9vd6wCbhV-qZ1ea-5FDP5ALsDT3VvC0TviGQAU', '2024-04-01 23:09:03'),
(28, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAxNDQ1NCwiZXhwIjoxNzEyMDE4MDU0fQ.osOQCgZ7ee31CUQvgbhHP-aEAjRRSaxBHSscH782V0Q', '2024-04-01 23:34:14'),
(29, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAxNTAxNCwiZXhwIjoxNzEyMDE4NjE0fQ.KrYh-xsBN8P7dakNCsXD5EwUOqTSfmS2mB8x6eVVRRw', '2024-04-01 23:43:34'),
(30, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAxNTM0NCwiZXhwIjoxNzEyMDE4OTQ0fQ.oXxqs-XRVOPbZpIgOiknYnh_QT5-I-ilEjoYYmrljgQ', '2024-04-01 23:49:04'),
(31, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAxNTg0MywiZXhwIjoxNzEyMDE5NDQzfQ.U2N9G5HR2RtIWJD8A-gS4FMRV14f38HLcwq227LpA_c', '2024-04-01 23:57:23'),
(32, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAyMjM3NCwiZXhwIjoxNzEyMDI1OTc0fQ.Iqx_ZStGFSv2B_IqFZ-mU2HOURDDuAt2vTk7PnfR5F4', '2024-04-02 01:46:14'),
(33, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAyMzA5MCwiZXhwIjoxNzEyMDI2NjkwfQ.zeLkgifZxrrk1IOWFpmccDRkDTPkTsXGGI95dVcz8ro', '2024-04-02 01:58:10'),
(34, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAzMTMxMiwiZXhwIjoxNzEyMDM0OTEyfQ.zgg9hE5Ir03HctfIvXYo_ecG26BKOCDNjabZh8M0290', '2024-04-02 04:15:12'),
(35, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAzMjExMCwiZXhwIjoxNzEyMDM1NzEwfQ.hs4gPVJVbilBEkLohypTTioOTLlFmq8NTl4WXcgCxzg', '2024-04-02 04:28:30'),
(36, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAzMjM4NiwiZXhwIjoxNzEyMDM1OTg2fQ.zN1gwvjFePYWgDc4idLvb7Tt-xBKSJGTHfP7fb62bro', '2024-04-02 04:33:06'),
(37, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjAzMjkxMywiZXhwIjoxNzEyMDM2NTEzfQ.eZI7dWMUaVkiKy2kOV8-H85pbXMkqsO14LJd5YwIhQw', '2024-04-02 04:41:53'),
(38, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxMTU0MCwiZXhwIjoxNzEyMjE1MTQwfQ.ya8Cy-jw4uc_rihWGgMHOIai6WB6691UxqFurKWxlrY', '2024-04-04 06:19:00'),
(39, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxMzkwMiwiZXhwIjoxNzEyMjE3NTAyfQ.cLNadMyTfzS8-GZ40ZRmrga3wOY0kpcToicRu1gye6U', '2024-04-04 06:58:22'),
(40, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxMzkwOCwiZXhwIjoxNzEyMjE3NTA4fQ.LQ2NpytcF8TYq8JI0atkeqbZqIMTiI6Jw0P1vcJAvDI', '2024-04-04 06:58:28'),
(41, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxMzk1NCwiZXhwIjoxNzEyMjE3NTU0fQ.p1jKEYwhGtq4GsP2iBGLZDGTucz77qPikX1GvGggnyo', '2024-04-04 06:59:14'),
(42, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxNDY1MCwiZXhwIjoxNzEyMjE4MjUwfQ.M22xhG-d0o_3M64iA8Gs268_ESmp48mhmIoKJZ5SOIs', '2024-04-04 07:10:50'),
(43, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxNTI4MiwiZXhwIjoxNzEyMjE4ODgyfQ.UA-qqVdeI907O4tjbcKBjiBWhIr2HPazbguaOXl2Vos', '2024-04-04 07:21:22'),
(44, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxNjA1NiwiZXhwIjoxNzEyMjE5NjU2fQ.EtBrim6cal2Cf1OpgYwMeX9s2QC_ORbVA5zyRiDtDn4', '2024-04-04 07:34:16'),
(45, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxNjYzMiwiZXhwIjoxNzEyMjIwMjMyfQ.RAYzEKLXJi0T3D4BgcVc47ntGbXoePFfhxlG044RNFQ', '2024-04-04 07:43:52'),
(46, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxNjgyNiwiZXhwIjoxNzEyMjIwNDI2fQ.5Qm1Ym9ycKuXxzB7oGGYoq2tr8RTCSM2xuK31cb0ETw', '2024-04-04 07:47:06'),
(47, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxNjg2NCwiZXhwIjoxNzEyMjIwNDY0fQ.AD7gPlxj36LFkjt5uquUUYqph-iJKaVkUIOg8lNXlLY', '2024-04-04 07:47:44'),
(48, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxNzIyOCwiZXhwIjoxNzEyMjIwODI4fQ.7OwH26CRVo25fcKi-204uhdGKgNDsw9Z4GmjhtGbur8', '2024-04-04 07:53:48'),
(49, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxNzMxMSwiZXhwIjoxNzEyMjIwOTExfQ.RQVG2uGba9tS0YEH7XLV-IRRJgbjC1nRdDL-3JMn2AU', '2024-04-04 07:55:11'),
(50, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxNzY0MywiZXhwIjoxNzEyMjIxMjQzfQ.Q1orC3YPmeBgt10M7r77Yq9tIBCn9XO_5K-xxas825M', '2024-04-04 08:00:43'),
(51, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxNzc0MCwiZXhwIjoxNzEyMjIxMzQwfQ.K9kK0j7GO3SLHox9LbaZUvDe1MuLEICGaUZKW-qryf0', '2024-04-04 08:02:20'),
(52, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxNzg4MSwiZXhwIjoxNzEyMjIxNDgxfQ.bMsIwhKfBQLQTJ5DHAk_aVb8V9cygYwclrtFqByFQVI', '2024-04-04 08:04:41'),
(53, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxODI2MSwiZXhwIjoxNzEyMjIxODYxfQ.UbnoidchJXmA2URichd0oAoKgFtV8mE8mQOYnv6JL9E', '2024-04-04 08:11:01'),
(54, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxOTE4NSwiZXhwIjoxNzEyMjIyNzg1fQ.dynIQ9-ww9ZQ4v5B8317y-xR3eJAVUAcWfGARA9CUkY', '2024-04-04 08:26:25'),
(55, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxOTMxOSwiZXhwIjoxNzEyMjIyOTE5fQ.rTVJVsNhbVpIoR4uDB08oLf5oagDryoitmk_V-ELi5A', '2024-04-04 08:28:39'),
(56, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIxOTQ4MSwiZXhwIjoxNzEyMjIzMDgxfQ.i6oUZ5VXSom02Q7_Xys3i-LFCArgZlNFbpqWl2aZ_70', '2024-04-04 08:31:21'),
(57, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyMDA0MSwiZXhwIjoxNzEyMjIzNjQxfQ.7evdw6RDU-AsR8XGZRglwsDLJrGtRCt3_Zwtip0v9y8', '2024-04-04 08:40:41'),
(58, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyMDg2NiwiZXhwIjoxNzEyMjI0NDY2fQ.5YUKQIu9Bg7SJlXvhAwpeF6nhqto09ouDlR-1cVs8TA', '2024-04-04 08:54:26'),
(59, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyMDkyNSwiZXhwIjoxNzEyMjI0NTI1fQ.oXJhCrq81ETYsApKZubT3HwSJul7JNqjSa2sxbGggPg', '2024-04-04 08:55:25'),
(60, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyMDkzOCwiZXhwIjoxNzEyMjI0NTM4fQ.LneHwhTzY-zPeTcnnmMGguUGNEA93qVhMLLBG09volE', '2024-04-04 08:55:38'),
(61, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyMDk2NSwiZXhwIjoxNzEyMjI0NTY1fQ.x6CJxexqSFe7cFSvPIourQjcC1KYGGpRn563fCNZeHs', '2024-04-04 08:56:05'),
(62, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyODI4OSwiZXhwIjoxNzEyMjMxODg5fQ.BTNX2Mu86JpZqdx-ZIpPQLxS5SdO8mIshRvtILbNfk8', '2024-04-04 10:58:09'),
(63, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyODYwMiwiZXhwIjoxNzEyMjMyMjAyfQ.Nft1DBj5K_oOHIEuE9VgkSlyDrJN8PXf3nys1TVbgjU', '2024-04-04 11:03:22'),
(64, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyODYyNiwiZXhwIjoxNzEyMjMyMjI2fQ.ruVK_qtSyCYb0RcwaWhCaOCgKAAR1dK1G5NWgHosz-U', '2024-04-04 11:03:46'),
(65, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyOTQ5OCwiZXhwIjoxNzEyMjMzMDk4fQ.xdmStyYmsmAIpmz60JBt1EwzSNsEG4SWDtnwtO9Bc9A', '2024-04-04 11:18:18'),
(66, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyOTYzNSwiZXhwIjoxNzEyMjMzMjM1fQ.JodIYMgXqvbaVTWLYT4CunHgBhs9GdpqL-4GkUW-iaQ', '2024-04-04 11:20:35'),
(67, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyOTY1MSwiZXhwIjoxNzEyMjMzMjUxfQ.M91LenU8Tn4tK35uRaJqOXESj28nXWsa2hnPzuAGK2c', '2024-04-04 11:20:51'),
(68, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIzMDg1NSwiZXhwIjoxNzEyMjM0NDU1fQ.-ZGu83cCPJijVfzik2xEhVsV_wP4PEL5Jo6gXDpJ42I', '2024-04-04 11:40:55'),
(69, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIzMDg2OSwiZXhwIjoxNzEyMjM0NDY5fQ.r59j60JnAU41NqrTzBM3OAw-oWN70IORSMu9U7OY-fQ', '2024-04-04 11:41:09'),
(70, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIzMDk2MywiZXhwIjoxNzEyMjM0NTYzfQ.qSRg3LLIIxE7Altts1RlE--8y0tAjxGWdzQn0XsDhAM', '2024-04-04 11:42:43'),
(71, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIzODU4MCwiZXhwIjoxNzEyMjQyMTgwfQ.txll8-cnQVS0M_aG5PzdBZdQGITh75jwGY4QqFWtyUg', '2024-04-04 13:49:40'),
(72, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIzODc3MSwiZXhwIjoxNzEyMjQyMzcxfQ.bTtG241XepMWbi4d-D6ZHUPqpciqa9wPhE4DWb4y8GA', '2024-04-04 13:52:51'),
(73, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIzOTAwMCwiZXhwIjoxNzEyMjQyNjAwfQ.wrzRa3d878PqapGEgM3yoUS7RetuJk8r6gJ0X9Maslw', '2024-04-04 13:56:40'),
(74, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjI0NjUwOCwiZXhwIjoxNzEyMjUwMTA4fQ.16Dx6MRPTO1SKrLwmDCpftvuVHfMTa8EHNRIv_6UcHQ', '2024-04-04 16:01:48'),
(75, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjI4NTkyMiwiZXhwIjoxNzEyMjg5NTIyfQ.l_kf09CoJTTnJC7DlnMOs0iqc-BqU1gnJjmHEceGWAY', '2024-04-05 02:58:42'),
(76, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjMyMjg3MywiZXhwIjoxNzEyMzI2NDczfQ.nwJkfSCXrdyROvbXQP4UBr5_AL_-S3w-aGHb_WKdLyE', '2024-04-05 13:14:33'),
(77, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjMyMzM0NCwiZXhwIjoxNzEyMzI2OTQ0fQ.gjkRqWltoUBRN6LVrlxMuN92icT-Z84twCrodNCFXY4', '2024-04-05 13:22:24'),
(78, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjMyMzU4NywiZXhwIjoxNzEyMzI3MTg3fQ.leVxr91Mxzc52_JbB77jjcQqjTLhcUGATo3VYrJmBjQ', '2024-04-05 13:26:27'),
(79, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjMyMzg2MywiZXhwIjoxNzEyMzI3NDYzfQ.-BvwseMSV8mIHBIJoQZF8D6kK68S_nAFWSeUscuGOwk', '2024-04-05 13:31:03'),
(80, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjMyODU2NiwiZXhwIjoxNzEyMzMyMTY2fQ.oZMaUXS3n3QXI5M_JeLI_WRw1CX1H0UJ3kZ2Ur2Bqs4', '2024-04-05 14:49:26'),
(81, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY4OTk3MiwiZXhwIjoxNzEyNjkzNTcyfQ.gBoo1lhpR0cMYoBJYO9egNfJ7ON50L-H3oU_42__LvY', '2024-04-09 19:12:52'),
(82, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5MDg2NiwiZXhwIjoxNzEyNjk0NDY2fQ.yPTFp1926xYu93a0L1sBzkUNrJuXDj8J3I6IgNv9BLg', '2024-04-09 19:27:46'),
(83, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5MDkxOSwiZXhwIjoxNzEyNjk0NTE5fQ.lrI9_IM2C3IanbtLOOZk3_5gSvNx5iYfaUbQ59ju5qk', '2024-04-09 19:28:39'),
(84, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5MjA0OSwiZXhwIjoxNzEyNjk1NjQ5fQ.NNKjt_E2eXTMM7ruy1gybLCRptJqQQyXvhLfx1F4XLw', '2024-04-09 19:47:29'),
(85, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5MjI4MCwiZXhwIjoxNzEyNjk1ODgwfQ.245EXtyQneD-xvBOfH3tU3L28coUdhlEdyiE_StYiqc', '2024-04-09 19:51:20'),
(86, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5MjM3MSwiZXhwIjoxNzEyNjk1OTcxfQ.CxvFcHvSMHsWz0Zo_gjBYj5CcahQhlFcSKo9YEmoMow', '2024-04-09 19:52:51'),
(87, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5Mzg0NSwiZXhwIjoxNzEyNjk3NDQ1fQ.p4GAl0qv8KazYKQXapaIFyFM2B9ovzJ8dH7JDK7f6oo', '2024-04-09 20:17:25'),
(88, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5Mzk2MCwiZXhwIjoxNzEyNjk3NTYwfQ.mCIlPSluDarSXPKADM5xIEiA1pVtI9lg2zw4ZCsncPM', '2024-04-09 20:19:20'),
(89, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5NDI1NCwiZXhwIjoxNzEyNjk3ODU0fQ.pBQZnhr4UC8_L7JOSMtwEtgz9YSrhTRROuilm6tCsao', '2024-04-09 20:24:14'),
(90, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5NDM2MiwiZXhwIjoxNzEyNjk3OTYyfQ.KookXkstL1wiPa1pGrtidRNY-Skcld4V01DIWEDCL3c', '2024-04-09 20:26:02'),
(91, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5NDc5MywiZXhwIjoxNzEyNjk4MzkzfQ.LjAUWIIbKdCA74Oykae-PkFaMRfdYoe1_er_S7VJwLQ', '2024-04-09 20:33:13'),
(92, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5NTEzMiwiZXhwIjoxNzEyNjk4NzMyfQ.tzJ98A3fvtF9zWA4kj_joJRSNZC72MwfnGx77kkHHaQ', '2024-04-09 20:38:52'),
(93, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5NTIyMSwiZXhwIjoxNzEyNjk4ODIxfQ.tllE1z1ivD4jPgsYF5DnXIaW_0YxBjvIqHobWJ7DCfc', '2024-04-09 20:40:21'),
(94, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5NTI1NiwiZXhwIjoxNzEyNjk4ODU2fQ.UDdEI5pBfnDKjmCX1-5mBO-V8TNKT2fOsQ1SRu5-fw8', '2024-04-09 20:40:56'),
(95, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5NTc0NSwiZXhwIjoxNzEyNjk5MzQ1fQ.vAo8ybH7fhaD-SgHVNgCLgwkiR86MUXxIFoNLaJgNhQ', '2024-04-09 20:49:05'),
(96, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5NjAzMSwiZXhwIjoxNzEyNjk5NjMxfQ.IX8LkYk7ci_pcZTqUXZUTzcecBylng-kdp8lZMuuvFA', '2024-04-09 20:53:51'),
(97, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY5NjQzMCwiZXhwIjoxNzEyNzAwMDMwfQ.6rtv03Jzdzr2AavOF9Z8aHjoG5JZo5_Y9tTtZpNK5Yc', '2024-04-09 21:00:30'),
(98, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzAwMTU4MCwiZXhwIjoxNzEzMDA1MTgwfQ.n4y_CJtI50AhQMJ7VEKpoHVbwp33C457JA_JOnGacR4', '2024-04-13 09:46:20'),
(99, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzAwMTYxNywiZXhwIjoxNzEzMDA1MjE3fQ.CT2hMaHs-5WFXSH6Stw8g5R3DNEUAPIytKwIIzfJuDs', '2024-04-13 09:46:57'),
(100, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzAyNzY3OSwiZXhwIjoxNzEzMDMxMjc5fQ.hb7Tl-vcVQlUaPeCH2YOG3t1JN3gLu-Vidwa2aBDeFQ', '2024-04-13 17:01:19'),
(101, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzAyODQ4MSwiZXhwIjoxNzEzMDMyMDgxfQ.9IM0EK-B3tTGSsuk9HT_V45oDG2aypsEDTltevWXyTA', '2024-04-13 17:14:41'),
(102, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzAyODUzMywiZXhwIjoxNzEzMDMyMTMzfQ.bLAwwJyMnH46d1Y1aUfvBPD-GTzQzLzlzrY7yuZt_F0', '2024-04-13 17:15:33'),
(103, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzAyODc1MiwiZXhwIjoxNzEzMDMyMzUyfQ.8IvpTbPUYgEPmDt-nZyeFIC-X-NhyGuYGSBbrtcQQ7E', '2024-04-13 17:19:12'),
(104, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzAzMTQ2OCwiZXhwIjoxNzEzMDM1MDY4fQ.LIEdMRODDIXtHUH8y2dXhxe3yVIY5rKiCwUpzkqPv-0', '2024-04-13 18:04:28'),
(105, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzA4ODA2OCwiZXhwIjoxNzEzMDkxNjY4fQ.O7_6g6ElhzAVxhUXcFhtrEVy9vBgQyJFaOmf7X3jAGw', '2024-04-14 09:47:48'),
(106, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzA4ODcxNiwiZXhwIjoxNzEzMDkyMzE2fQ.W5enYKI6vF0mdfFFdMKZDW5W7V3WG_gPLeIRwVSGRVM', '2024-04-14 09:58:36'),
(107, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzA4ODc2MSwiZXhwIjoxNzEzMDkyMzYxfQ.gsvrpf16IhU1zaTidxtrAyEEtRvZ3A6bgKcX-MrlS1s', '2024-04-14 09:59:21'),
(108, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzA5MDUzMSwiZXhwIjoxNzEzMDk0MTMxfQ.k49gY-MPUK-ldIonwE9bFwvtpPfYWEGbWuzD4YdzShc', '2024-04-14 10:28:51'),
(109, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzExMTM1NiwiZXhwIjoxNzEzMTE0OTU2fQ.Q2cW7HrPB6LiuZaZuuhGPtzUwMBnyUGVpyYUrk6Pbm0', '2024-04-14 16:15:56'),
(110, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzE2NDkzMywiZXhwIjoxNzEzMTY4NTMzfQ.XOYhPOAJ1TF-bCuoKigqTJBM8RG99CSLctrSnL2_ccU', '2024-04-15 07:08:53'),
(111, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzE4NzM3MCwiZXhwIjoxNzEzMTkwOTcwfQ.1py8Zqj260IfesDI3ZpEkx0JXGtPPvT4VcaD-drG-0k', '2024-04-15 13:22:50'),
(112, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzE4ODQyMSwiZXhwIjoxNzEzMTkyMDIxfQ.B6qkPQn80OxBW3nsBhM2AYhZNG8AC8514nE1P5cX7gY', '2024-04-15 13:40:21'),
(113, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzE5NjU0MywiZXhwIjoxNzEzMjAwMTQzfQ.Qpevk3vNIj7BW7S5g1LuCT3wfel8ySX8vDlN9uxgk6o', '2024-04-15 15:55:43'),
(114, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0MDExOCwiZXhwIjoxNzEzMjQzNzE4fQ.HrgFcpaw-cYZiifyUscymUqxi-wRJoYvTbjsiEnrFn4', '2024-04-16 04:01:58'),
(115, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0MjMwOCwiZXhwIjoxNzEzMjQ1OTA4fQ.9eXV27kIiyzfSsF2nBRuhQwCvrXm1kMW_cgX78tcKrc', '2024-04-16 04:38:28'),
(116, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0Mzk3NywiZXhwIjoxNzEzMjQ3NTc3fQ.wI-PjOt65mgr8cm0U4hyzCIellZEJXNHcXz7cQu5kYA', '2024-04-16 05:06:17'),
(117, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0Mzk3OSwiZXhwIjoxNzEzMjQ3NTc5fQ.Av8fWuFyt_yza6tqtveKtzVUD8FdjP0ViQLtTytYtEA', '2024-04-16 05:06:19'),
(118, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0Mzk4MCwiZXhwIjoxNzEzMjQ3NTgwfQ.wE16SQ-23gwchN7ol5G4xUkJXecGQrt2c8-d4HMvPMA', '2024-04-16 05:06:20'),
(119, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0Mzk4MCwiZXhwIjoxNzEzMjQ3NTgwfQ.wE16SQ-23gwchN7ol5G4xUkJXecGQrt2c8-d4HMvPMA', '2024-04-16 05:06:20'),
(120, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0Mzk4MSwiZXhwIjoxNzEzMjQ3NTgxfQ.QiUOkDXq3w-TMDq4BajpGzvsRUSIc5g2GN1gQoYz_hE', '2024-04-16 05:06:21'),
(121, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0Mzk4MiwiZXhwIjoxNzEzMjQ3NTgyfQ.2d-PYr03GGUWLc1vtMs912TswPQKG1Std5SKlduDeFk', '2024-04-16 05:06:22'),
(122, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0Mzk4MywiZXhwIjoxNzEzMjQ3NTgzfQ.MqMHI90Z4yoYc5cIsnj3bnLo6QKizv5oSJHns1s2Jrg', '2024-04-16 05:06:23'),
(123, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0Mzk4MywiZXhwIjoxNzEzMjQ3NTgzfQ.MqMHI90Z4yoYc5cIsnj3bnLo6QKizv5oSJHns1s2Jrg', '2024-04-16 05:06:23'),
(124, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0NDAwNSwiZXhwIjoxNzEzMjQ3NjA1fQ.04a5QLtpQ0h5Z_sy3Oeic4Cc2rlPirdagyPX-85NZZc', '2024-04-16 05:06:45'),
(125, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0NDE2NCwiZXhwIjoxNzEzMjQ3NzY0fQ.eKgPS-DQ9Nlsu4NZWtR8TND8OizXDmxGzlvZlbXAeYU', '2024-04-16 05:09:24'),
(126, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0NDgyMywiZXhwIjoxNzEzMjQ4NDIzfQ.-U5H__V9tjvGxRU6emtALFqmPysY4PtwmmPglaBCqQQ', '2024-04-16 05:20:23'),
(127, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0NDg2MywiZXhwIjoxNzEzMjQ4NDYzfQ.xLQOQpEWassfNA7c9P_xrvNAul3CFlY1izPD6l9HZDc', '2024-04-16 05:21:03'),
(128, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0NTU3NiwiZXhwIjoxNzEzMjQ5MTc2fQ.O77pEn1oCD7OWyFLrrlsrv--jKtjwoTZgihMJGnFBbI', '2024-04-16 05:32:56'),
(129, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0NTYxNCwiZXhwIjoxNzEzMjQ5MjE0fQ.DcHWWkwVySY6dpUGs9KkCVPfISH_qsX3PuCOTJUVqak', '2024-04-16 05:33:34'),
(130, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0NjUxMSwiZXhwIjoxNzEzMjUwMTExfQ.0_Gviao8N9xwYZM3bJcX2HticSPD2Zt3ohOukA3mCEA', '2024-04-16 05:48:31'),
(131, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0NjY1MSwiZXhwIjoxNzEzMjUwMjUxfQ.RhmE7n08d5o_dHyYlZKN5gCp7gwRJMjF9aA5sOuUDik', '2024-04-16 05:50:51'),
(132, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0NjcyNCwiZXhwIjoxNzEzMjUwMzI0fQ.PArk59aXPgNiDCn4_sfkbXoxvlIasp3PhC9iLuAenh4', '2024-04-16 05:52:04'),
(133, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0OTI2MywiZXhwIjoxNzEzMjUyODYzfQ.XXYsK3b8_vJU5Pb0pY6bzZiOULgI4fIucaXOjWvpefg', '2024-04-16 06:34:23'),
(134, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI0OTQxNCwiZXhwIjoxNzEzMjUzMDE0fQ.JHtkYnbvyxVYbchGr1Vici7TZCmp4EjxCt1z3bonM8U', '2024-04-16 06:36:54'),
(135, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI1MDgyNiwiZXhwIjoxNzEzMjU0NDI2fQ.kMBABQGm6gBtQaWyu1UreqDrA84287sLSmoImtmmL5w', '2024-04-16 07:00:26'),
(136, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI1MDg2NCwiZXhwIjoxNzEzMjU0NDY0fQ.SNgfvXm1NZ-MWJo9r14lFASeUAj9bxB_wkaoZxZv6h4', '2024-04-16 07:01:04'),
(137, 'abc@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJhYmNAZ21haWwuY29tIiwiaWF0IjoxNzEzMjUxMTczLCJleHAiOjE3MTMyNTQ3NzN9.LC-0mcTtjS8_mMw5N4HhVstMZBBV1wTQGT1WyhDSymg', '2024-04-16 07:06:13'),
(138, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI1MTI3NywiZXhwIjoxNzEzMjU0ODc3fQ.dsyTcI1TN6tCVqo46BzdxULuVhzofGDFohJGJuANZ90', '2024-04-16 07:07:57'),
(139, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI1MTMwNSwiZXhwIjoxNzEzMjU0OTA1fQ.osahD-92ZaGGNA2gMRe1bCb51E5eWKiFH0bL_aCuv9M', '2024-04-16 07:08:25'),
(140, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI1MTMyNiwiZXhwIjoxNzEzMjU0OTI2fQ.py3MqMqgyW-hu1uEUa2KXJ_0QeQU2RXJgLsCf4Dxa0A', '2024-04-16 07:08:46'),
(141, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI1NDU4MywiZXhwIjoxNzEzMjU4MTgzfQ.Hu9C8pIe0w54xRj4_3cnshNAybDxqhvvUffvHEzxa_Q', '2024-04-16 08:03:03'),
(142, 'abc@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJhYmNAZ21haWwuY29tIiwiaWF0IjoxNzEzMjU0NjE5LCJleHAiOjE3MTMyNTgyMTl9.zvUKeUbcn45FF1A3m5kRFd5486RHZBwmfmvQlyn4Ifo', '2024-04-16 08:03:39'),
(143, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzI1NTA4NCwiZXhwIjoxNzEzMjU4Njg0fQ.v26Q3vt-mtpvz0izPJZZU_8aeFMZPSCXJhWbgBNxZCQ', '2024-04-16 08:11:24'),
(144, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzMzNTI1MCwiZXhwIjoxNzEzMzM4ODUwfQ.Uh-Vdq-wEz9g8d9NpTmTHnbocVD7ZIgbgCOe7iOIulM', '2024-04-17 06:27:30'),
(145, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxMzMzNTMzOSwiZXhwIjoxNzEzMzM4OTM5fQ.wmBUkSIReDFvuOHdtz0L4L_ZfcLkQGja32Ux4kCCApE', '2024-04-17 06:28:59'),
(146, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDIwNDMyMCwiZXhwIjoxNzE0MjA2MTIwfQ.X2n6p81GwA5G8zbUnOCj4BIzH1tVyfoWL25eOG_Hfww', '2024-04-27 07:52:00'),
(147, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDIwNDMyMywiZXhwIjoxNzE0MjA2MTIzfQ.ThN1Y_BNMG1bf_0CNhQDLj1f8zBgwmPxvHhvy6LTSoE', '2024-04-27 07:52:03'),
(148, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDIwNDMyNSwiZXhwIjoxNzE0MjA2MTI1fQ.HN37Yrjs7m1Utw2M9yBTyrl-OgUudztx5GkvYbzvFNQ', '2024-04-27 07:52:05'),
(149, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDIwNDMyNSwiZXhwIjoxNzE0MjA2MTI1fQ.HN37Yrjs7m1Utw2M9yBTyrl-OgUudztx5GkvYbzvFNQ', '2024-04-27 07:52:05'),
(150, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDIwNDMyNiwiZXhwIjoxNzE0MjA2MTI2fQ.F5koKL8SsQuhvpcAFj2RADrFBYxmDuJAy5L1H8QkzIk', '2024-04-27 07:52:06'),
(151, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDIwNDQ4MiwiZXhwIjoxNzE0MjA2MjgyfQ.pnQtcJw2pDG0Y-QYNR6JM95OuQCV7IBVK4_S1gv9o7M', '2024-04-27 07:54:42'),
(152, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDIwNTI0OCwiZXhwIjoxNzE0MjA3MDQ4fQ.-jonRRKLMo3pNDBIeYtebNU6M9dIwA9x2Rn7B_ShlI8', '2024-04-27 08:07:28'),
(153, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDIwNTUxOCwiZXhwIjoxNzE0MjA3MzE4fQ.TgIPevErBjP08r_gp76JDcOiJRO3yd4G2ACyBcCiJMc', '2024-04-27 08:11:58'),
(154, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDIwNTg2OSwiZXhwIjoxNzE0MjA3NjY5fQ.7a_APp4ufSb4OGxOy8OosA19kzd28cAHku6x8KtjMww', '2024-04-27 08:17:49'),
(155, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDIxMTQzNywiZXhwIjoxNzE0MjEzMjM3fQ.bu39nnNP367TShqLtfvoUjnugmL3BqPDLhAst3cycXI', '2024-04-27 09:50:37'),
(156, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDMxNDAxMywiZXhwIjoxNzE0MzE1ODEzfQ.1pJhcfNv0T5p0U-LFqMjD-Qqa9uhgI0osrxjwvcV-Lo', '2024-04-28 14:20:13'),
(157, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDMxNzYwNiwiZXhwIjoxNzE0MzE5NDA2fQ.pZPgndCZmk5lYiqsFkpwPNdm1Lgs6L-y6oYmNvMsjns', '2024-04-28 15:20:06'),
(158, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDMxOTk3OSwiZXhwIjoxNzE0MzIxNzc5fQ.oLxKlDtuGILj-Khk5IqvpSG4A3MrezrjPAkYqbbQpPM', '2024-04-28 15:59:39'),
(159, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDMyMjY0NCwiZXhwIjoxNzE0MzI0NDQ0fQ.W0R1_RMrqtyzox4NKQjkSvhrAi1oQjxW7_pMNG5Z_Zc', '2024-04-28 16:44:04'),
(160, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDMyMjg0OSwiZXhwIjoxNzE0MzI0NjQ5fQ.AL1LAeqX49GqmservcghpGVNdxembRpM7vnspzrH_v0', '2024-04-28 16:47:29'),
(161, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDM1NTkyNywiZXhwIjoxNzE0MzU3NzI3fQ.Zj9qGucw6ES8XSju16ZXonFxKehBFZdbMR1-I8kZsH4', '2024-04-29 01:58:47'),
(162, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDM2NDUyOCwiZXhwIjoxNzE0MzY2MzI4fQ.27muex3ILuwUFLEZdAtvea7aIrkCJxVUFfQXv7kStgA', '2024-04-29 04:22:08'),
(163, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDM2NzMzMCwiZXhwIjoxNzE0MzY5MTMwfQ.aDaJV8HcCrXUsea6Kvapi5QduhE16lyL1_Eog424L7U', '2024-04-29 05:08:50'),
(164, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDM3MDAzOCwiZXhwIjoxNzE0MzcxODM4fQ.Jt1o-JexQJNejla83nTX8kavpWDkhwca6LoOfC2sF3Q', '2024-04-29 05:53:58'),
(165, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDM3MTUwNCwiZXhwIjoxNzE0MzczMzA0fQ.2L6V9fHyWagSu2ofSSIj3fo7YtW_jept7-kO1WZ3ab0', '2024-04-29 06:18:24'),
(166, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDM3MTc4NiwiZXhwIjoxNzE0MzczNTg2fQ.5pMMAaD_MSRsR65QvMoIKJ-n1d6izZBQy0VlSdWVwv8', '2024-04-29 06:23:06'),
(167, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDM3NDkyNywiZXhwIjoxNzE0Mzc0OTg3fQ.cyCFoMpT8TviRJ7AEZevw0QlyMtwtvm1pWEpjEAmi80', '2024-04-29 07:15:27'),
(168, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDM3NTA1MiwiZXhwIjoxNzE0Mzc1MTEyfQ.-kCo3-g_SPVUPRMr6bkqTFS59k2-U32SKzwgf1y9BtM', '2024-04-29 07:17:32'),
(169, 'paulwesly0125@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJwYXVsd2VzbHkwMTI1QGdtYWlsLmNvbSIsImlhdCI6MTcxNDM3NTE3NiwiZXhwIjoxNzE0Mzc2OTc2fQ.0MgF-k1Q0i5vWnK_FqzEobJqJkuN9CzUueOlVr_q-eU', '2024-04-29 07:19:36');

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `id` int(11) NOT NULL,
  `offername` varchar(50) NOT NULL,
  `url` varchar(150) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `starttime` varchar(10) NOT NULL,
  `endtime` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `offer`
--

INSERT INTO `offer` (`id`, `offername`, `url`, `startdate`, `enddate`, `starttime`, `endtime`) VALUES
(1, 'INDEPENDANCE DAY OFFER', 'https://media.giphy.com/media/CgvOX6fk4LyOH7o2gL/giphy.gif', '2021-08-15', '2021-08-22', '09.00 AM', '11.59 AM');

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `SNo` int(30) NOT NULL,
  `message` varchar(100) NOT NULL,
  `Date` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `page`
--

INSERT INTO `page` (`SNo`, `message`, `Date`) VALUES
(1, 'hello to all', '05-03-2023'),
(2, 'hello to all', '05-03-2023'),
(3, 'hello to all friends', '');

-- --------------------------------------------------------

--
-- Table structure for table `paymentlog`
--

CREATE TABLE `paymentlog` (
  `pid` int(11) NOT NULL,
  `amount` varchar(15) NOT NULL,
  `product` varchar(50) NOT NULL,
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `details` varchar(500) NOT NULL,
  `user_id` int(11) NOT NULL,
  `trans_id` varchar(250) NOT NULL,
  `status` enum('success','fail','initiated') NOT NULL DEFAULT 'initiated'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `paymentmode`
--

CREATE TABLE `paymentmode` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` int(11) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `paymentmode`
--

INSERT INTO `paymentmode` (`id`, `name`, `updated_on`, `created_by`, `created_on`) VALUES
(1, 'ICICI Bank', '2015-11-18 09:06:37', 1, '2015-11-18 00:00:00'),
(2, 'HDFC Bank', '2015-11-18 09:06:37', 1, '2015-11-18 00:00:00'),
(3, 'SBI Bank', '2015-11-18 09:07:19', 1, '2015-11-18 00:00:00'),
(4, 'PayUmoney', '2015-11-18 09:07:19', 1, '2015-11-18 00:00:00'),
(6, 'canara bank', '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00'),
(7, 'Bank of india', '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00'),
(8, 'State bank of India', '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00'),
(9, 'Indian Bank', '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00'),
(10, 'STATE BANK OF TRVGRE', '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00'),
(11, 'Google Pay', '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(250) NOT NULL,
  `subscribed_type` enum('subscriber','premium') NOT NULL,
  `premium_group` int(11) NOT NULL,
  `premium_plan` varchar(250) NOT NULL DEFAULT '0',
  `expired_date` datetime NOT NULL,
  `payment_date` datetime NOT NULL,
  `payment_mode` int(11) NOT NULL,
  `payment` decimal(10,2) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `premiumgroups`
--

CREATE TABLE `premiumgroups` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(300) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `premiumgroups`
--

INSERT INTO `premiumgroups` (`id`, `name`, `description`, `created_by`, `updated_on`, `created_on`) VALUES
(1, 'CRUDE', 'ONLY CRUDE CALLS', 2, '2015-11-17 07:18:10', '2015-11-17 07:18:02'),
(2, 'BULLIONS ', 'ONLY GOLD AND SILVER', 2, '2015-11-17 07:18:36', '2015-11-17 07:18:19'),
(3, 'BASE METALS', 'ALL BASE METALS', 2, '2015-11-17 07:19:21', '2015-11-17 07:19:13'),
(4, 'ALL', '', 1, '2020-06-15 06:52:45', '2015-12-10 11:08:44');

-- --------------------------------------------------------

--
-- Table structure for table `premiumusers`
--

CREATE TABLE `premiumusers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `name` varchar(300) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `expired_date` datetime NOT NULL,
  `status` enum('active','hold') NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `premiumusers`
--

INSERT INTO `premiumusers` (`id`, `user_id`, `group_id`, `name`, `mobile`, `expired_date`, `status`, `created_by`, `updated_on`, `created_on`) VALUES
(1, 52259, 1, 'AIWIN', '8675999833', '2015-11-17 00:00:00', 'active', 2, '2015-11-17 07:19:51', '0000-00-00 00:00:00'),
(2, 52286, 1, 'JAMEEN', '8608800122', '2015-11-17 00:00:00', 'active', 1, '2015-11-17 07:29:41', '0000-00-00 00:00:00'),
(3, 53170, 3, 'Amit', '9890802700', '2015-08-10 00:00:00', 'active', 1, '2015-11-25 06:10:02', '0000-00-00 00:00:00'),
(4, 40, 1, 'goldpearl', '8056023691', '2015-11-30 00:00:00', 'active', 1, '2015-11-30 07:47:25', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `sms`
--

CREATE TABLE `sms` (
  `id` int(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `mobileno` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sms`
--

INSERT INTO `sms` (`id`, `username`, `mobileno`) VALUES
(1, 'nila', '+919150450449');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptionprice`
--

CREATE TABLE `subscriptionprice` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `tagname` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `no_of_days` int(11) NOT NULL,
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `plan_description_forapp` text NOT NULL,
  `dollar_rate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `subscriptionprice`
--

INSERT INTO `subscriptionprice` (`id`, `name`, `description`, `tagname`, `price`, `no_of_days`, `updated_on`, `plan_description_forapp`, `dollar_rate`) VALUES
(0, 'NEW YEAR OFFER', '<p><span style=\"\\\"> <b>Validity for 365 days only</b></span></p>\r\n<p>Subscribe our intraday calls in Energy, Base Metals and Bullion for ONE YEAR at just Rs.25000</p>\r\n<p>Daily 2-5 Calls</p>\r\n<p>Pivot Levels</p>\r\n<p>USD/INR Chart</p>\r\n<p>Push Notification</p>\r\n<p>SMS Alert</p>\r\n<p>SAVE(Rs.)5000</p>', 'Offer', 20000, 365, '2023-04-19 10:22:19', '<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css\"\r\n        integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\r\n    <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n    <div class=\"container\">\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>High Accuracy</label></div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\">\r\n            <label>Pivot Levels</label>\r\n        </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Push Notification</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>SMS Alert</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Unlimited Customer Support</label>\r\n        </div>\r\n    </div>\r\n    </div>\r\n</body>\r\n\r\n</html>', 75),
(4, 'One Week', ' <b>Validity for 7 days only</b></span></p>\r\n<p>Daily 2-5 Calls</p>\r\n<p>Pivot Levels</p>\r\n<p>USD/INR Chart</p>\r\n<p>Push Notification</p>\r\n', 'Weekly', 1000, 7, '2023-04-19 12:54:00', '<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css\"\r\n        integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\r\n    <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n    <div class=\"container\">\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Daily 2-5 Calls</label></div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\">\r\n            <label>Pivot Levels</label>\r\n        </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>USD/INR Chart</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Push Notification</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>SMS Alert</label></div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Limited Customer Support</label></div>\r\n    </div>\r\n</body>\r\n\r\n</html>', 26),
(5, '1 Month', '<p><span style=\"\\\"><b>Validity for 31 days only</b></span></p>\r\n<p>Daily 2-5 Calls</p>\r\n<p>Pivot Levels</p>\r\n<p>USD/INR Chart</p>\r\n<p>Push Notification</p>\r\n\r\n', 'Monthly', 3000, 31, '2023-04-19 12:54:00', '<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css\"\r\n        integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\r\n    <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n    <div class=\"container\">\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>High Accuracy</label></div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\">\r\n            <label>Pivot Levels</label>\r\n        </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>SMS Alert</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Push Notification</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Very Good Customer Support</label>\r\n        </div>\r\n    </div>\r\n</body>\r\n\r\n</html>', 66),
(6, '3 Months', '<p><span style=\"\\\"> <b>Validity for 92 days only</b></span></p>\r\n<p>Daily 2-5 Calls</p>\r\n<p>Pivot Levels</p>\r\n<p>USD/INR Chart</p>\r\n<p>Push Notification</p><p>SAVE(Rs.)1500</p>', 'Quarterly', 9000, 92, '2023-04-19 12:54:00', '<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css\"\r\n        integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\r\n    <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n  \r\n    <div class=\"container\">\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Daily 2-5 Calls</label></div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\">\r\n            <label>Pivot Levels</label>\r\n        </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>USD/INR Chart</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Push Notification</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>SMS Alert</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Very Good Customer Support</label>\r\n        </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>(SAVE 2000 Rs)</label>\r\n        </div>\r\n\r\n        </div>\r\n    </div>\r\n</body>\r\n\r\n</html>', 180),
(7, '6 Months', '<p><span style=\"\\\"> <b>Validity for 184 days only</b></span></p>\r\n<p>Daily 2-5 Calls</p>\r\n<p>Pivot Levels</p>\r\n<p>USD/INR Chart</p>\r\n<p>Push Notification</p><p>SAVE(Rs.) 7500</p>', 'Half-yearly', 18000, 184, '2023-04-19 12:54:00', '<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css\"\r\n        integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\r\n    <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n\r\n\r\n\r\n    <div class=\"container\">\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Daily 2-5 Calls</label></div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\">\r\n            <label>Pivot Levels</label>\r\n        </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>USD/INR Chart</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Push Notification</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>SMS Alert</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Limited Customer Support</label>\r\n        </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>(SAVE 2000 Rs)</label>\r\n        </div>\r\n\r\n    </div>\r\n    </div>\r\n</body>\r\n\r\n</html>', 300),
(8, '1 Year', '<p><span style=\"\\\"> <b>Validity for 365 days only</b></span></p>\r\n<p>Daily 2-5 Calls</p>\r\n<p>Pivot Levels</p>\r\n<p>USD/INR Chart</p>\r\n<p>Push Notification</p><p>SAVE(Rs.)18000</p>\r\n', 'Yearly', 30000, 365, '2023-04-19 12:54:00', '<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css\"\r\n        integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\r\n    <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n    <div class=\"container\">\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Daily 2-5 Calls</label></div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\">\r\n            <label>Pivot Levels</label>\r\n        </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>USD/INR Chart</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Push Notification</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>SMS Alert</label> </div>\r\n        <div class=\"row mx-auto align-items-center justify-content-center\"><label>Limited Customer Support</label>\r\n        </div>\r\n    </div>\r\n    </div>\r\n</body>\r\n\r\n</html>', 560);

-- --------------------------------------------------------

--
-- Table structure for table `support`
--

CREATE TABLE `support` (
  `ID` int(11) NOT NULL,
  `Gmail` varchar(100) DEFAULT NULL,
  `MobileNo` varchar(50) DEFAULT NULL,
  `FacebookURL` varchar(100) DEFAULT NULL,
  `TwitterURL` varchar(100) DEFAULT NULL,
  `ShowExpiryDate` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `support`
--

INSERT INTO `support` (`ID`, `Gmail`, `MobileNo`, `FacebookURL`, `TwitterURL`, `ShowExpiryDate`) VALUES
(1, 'contact@intaxseva.com', '9036782332', 'https://www.facebook.com/MCXMarketTracker/?ref=pages_you_manage', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `updates`
--

CREATE TABLE `updates` (
  `id` int(11) NOT NULL,
  `content` varchar(2000) NOT NULL,
  `sms_sent` enum('yes','no') NOT NULL,
  `app_updated` enum('yes','no') NOT NULL,
  `color` enum('green','red','none') NOT NULL DEFAULT 'green',
  `type` enum('market','promo') NOT NULL,
  `created_by` int(11) NOT NULL,
  `date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `updates`
--

INSERT INTO `updates` (`id`, `content`, `sms_sent`, `app_updated`, `color`, `type`, `created_by`, `date`) VALUES
(1, '11:59AM BUY CRUDE NOV FUTURE AT 3052 TGT 3067 SL 3037', 'no', 'yes', 'green', 'market', 1, ''),
(3, '12:04PM BUY COPPER NOV FUTURE AT 336.5 TGT 337.7/338.9 SL 334.5', 'no', 'yes', 'green', 'market', 1, ''),
(4, '11:59AM BUY CRUDE NOV FUTURE AT 3052 TGT 3067 SL 3037', 'yes', 'no', 'green', 'market', 1, ''),
(5, '12:04PM BUY COPPER NOV FUTURE AT 336.7 TGT 337.9/338.1 SL 334.7', 'yes', 'no', 'green', 'market', 1, ''),
(22914, 'good night', 'yes', 'yes', 'green', 'market', 0, '2024-03-04'),
(22915, 'hai buddy ', 'yes', 'yes', 'green', 'market', 0, '2024-03-04'),
(22917, 'good noon', 'yes', 'yes', 'green', 'market', 0, ' 2024-04-1'),
(22918, 'Good evening', 'yes', 'yes', 'green', 'market', 0, ' 2024-04-1'),
(22920, 'hello', 'yes', 'yes', 'green', 'market', 0, ' 2024-04-15 20:09:23'),
(22921, 'Good vibes', 'yes', 'yes', 'green', 'market', 0, ' 2024-04-15 22:36:53'),
(22924, 'helllo', 'yes', 'yes', 'green', 'market', 0, ' 2024-04-15 23:03:27'),
(22941, 'good morning', 'yes', 'yes', 'green', 'market', 0, ' 2024-04-17 11:08:13'),
(22942, 'good morning', 'yes', 'yes', 'green', 'market', 0, ' 2024-04-17 11:08:13'),
(22943, 'hi', 'yes', 'yes', 'green', 'market', 0, ' 2024-04-17 11:08:53'),
(22944, 'hi', 'yes', 'yes', 'green', 'market', 0, ' 2024-04-17 11:08:53'),
(22945, 'hello', 'yes', 'yes', 'green', 'market', 0, '2024-04-17 14:56:28'),
(22946, 'hello', 'yes', 'yes', 'green', 'market', 0, '2024-04-17 14:56:28'),
(22947, 'hello', 'yes', 'yes', 'green', 'market', 0, '2024-04-17 14:56:28'),
(22948, 'hello', 'yes', 'yes', 'green', 'market', 0, '2024-04-17 14:56:28'),
(22949, 'hello', 'yes', 'yes', 'green', 'market', 0, '2024-04-17 14:56:28'),
(22950, 'hai', 'yes', 'yes', 'green', 'market', 0, '2024-04-17 15:05:19'),
(22951, 'hai', 'yes', 'yes', 'green', 'market', 0, '2024-04-17 15:05:19'),
(22952, 'hai', 'yes', 'yes', 'green', 'market', 0, '2024-04-17 15:05:19'),
(22953, 'hello how you always free...', 'yes', 'yes', 'green', 'market', 0, '2024-04-27 15:22:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `DevicePlatform` varchar(100) NOT NULL,
  `DeviceUUID` varchar(150) NOT NULL,
  `FirebaseID` text DEFAULT NULL,
  `DeviceVersion` varchar(50) NOT NULL,
  `AppInstalledDate` varchar(30) DEFAULT NULL,
  `AppExipiredDate` varchar(30) DEFAULT NULL,
  `IsSubscribedUser` enum('0','1') NOT NULL,
  `referralcode` text NOT NULL,
  `UserName` varchar(150) NOT NULL,
  `UserEmail` varchar(150) DEFAULT NULL,
  `UserMobileNo` varchar(15) DEFAULT NULL,
  `UserGeoAddress` varchar(500) NOT NULL,
  `UserWPLoginRegistered` enum('0','1') NOT NULL DEFAULT '0',
  `IsRegistered` enum('0','1') NOT NULL DEFAULT '0',
  `ClientId` varchar(10) NOT NULL,
  `AppLoggedIn` enum('0','1') NOT NULL DEFAULT '0',
  `AppRegisteredDate` datetime NOT NULL,
  `Password` varchar(50) NOT NULL,
  `userlog` enum('yes','no') NOT NULL DEFAULT 'no',
  `LastUpdatedDate` varchar(30) DEFAULT NULL,
  `createdDate` varchar(30) DEFAULT NULL,
  `ExpiredDate` varchar(30) DEFAULT NULL,
  `subscribedDate` varchar(30) DEFAULT NULL,
  `createdBy` enum('0','1') DEFAULT NULL,
  `Expiredate` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `DevicePlatform`, `DeviceUUID`, `FirebaseID`, `DeviceVersion`, `AppInstalledDate`, `AppExipiredDate`, `IsSubscribedUser`, `referralcode`, `UserName`, `UserEmail`, `UserMobileNo`, `UserGeoAddress`, `UserWPLoginRegistered`, `IsRegistered`, `ClientId`, `AppLoggedIn`, `AppRegisteredDate`, `Password`, `userlog`, `LastUpdatedDate`, `createdDate`, `ExpiredDate`, `subscribedDate`, `createdBy`, `Expiredate`) VALUES
(54336, 'Android', '1ba15663bfc824a4', NULL, '5.1', '2016-01-05', '2019-02-03', '1', '', 'hai', 'hitesh_890@yahoo.com', '9825193114', '', '0', '1', '1', '0', '0000-00-00 00:00:00', '', 'no', '2024-04-28', NULL, NULL, NULL, NULL, NULL),
(54338, 'Android', '527e8f31a7a87e2d', NULL, '4.4.4', '2016-01-05', '2019-02-03', '1', '', 'sathis', 'newyorksathis@yahoo.in', '9791625250', '', '0', '1', '1', '0', '0000-00-00 00:00:00', '', 'no', NULL, NULL, NULL, NULL, NULL, NULL),
(54339, 'Android', 'd1bd761927d7ef6b', NULL, '4.4.4', '2016-01-05', '2019-02-03', '0', '', 'sumit', 'sumitjain967@gmail.com', '9898989898', '', '1', '1', '1', '1', '0000-00-00 00:00:00', '', 'no', '2024-03-07', NULL, NULL, NULL, NULL, NULL),
(100349, '', '', NULL, '', NULL, NULL, '0', '', 'vasas', 'vasas@gmail.com', '122334455', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', '2024-03-11', '2024-03-05T16:56:42.622Z', NULL, NULL, NULL, NULL),
(100350, '', '', NULL, '', NULL, NULL, '0', '', 'kuttan', 'kuttan@gmail.com', '9089674523', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', '2024-03-12', '2024-03-05', NULL, NULL, NULL, NULL),
(100351, '', '', NULL, '', NULL, NULL, '0', '', 'ram', 'ram@gmail.com', '9182736452', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', '2024-03-12', '2024-03-05', NULL, NULL, NULL, NULL),
(100352, '', '', NULL, '', NULL, NULL, '0', '', 'nagaraj', 'nagaraj@gmail.com', '7845673423', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', '2024-03-12', '2024-03-05', NULL, NULL, NULL, NULL),
(100353, '', '', NULL, '', NULL, NULL, '0', '', 'gowsy', 'gowsy@gmail.com', '1234554321', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', NULL, '2024-03-07', NULL, NULL, NULL, NULL),
(100356, '', '', NULL, '', NULL, NULL, '0', '', 'check', 'check@gmail.com', '3898938398', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', NULL, '2024-03-07', NULL, NULL, NULL, NULL),
(100357, '', '', NULL, '', NULL, NULL, '0', '', 'hello', 'hello@gmail.com', '6767676767', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', NULL, '2024-03-07', NULL, NULL, NULL, NULL),
(100358, '', '', NULL, '', NULL, NULL, '0', '', 'fund', 'fund@gmail.com', '090909090', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', NULL, '2024-03-07', NULL, NULL, NULL, NULL),
(100359, '', '', NULL, '', NULL, NULL, '0', '', 'prsident', 'president@gmail.com', '1234432123', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', '2024-03-10', '2024-03-10', NULL, NULL, NULL, NULL),
(100360, '', '', NULL, '', NULL, NULL, '0', '', 'joshwa', 'joshwa@gmail.com', '9834563456', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', '2024-03-12', '2024-03-10', NULL, NULL, NULL, NULL),
(100361, '', '', NULL, '', NULL, NULL, '0', '', 'vasanth', 'vasanth@gamil.com', '3434343434', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', NULL, '2024-03-12', NULL, NULL, '1', NULL),
(100362, '', '', NULL, '', NULL, NULL, '0', '', 'guna', 'guna@gmail.com', '9887988777', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', NULL, '2024-03-13', NULL, NULL, '1', '2024-03-13'),
(100363, '', '', NULL, '', NULL, NULL, '0', '', 'SADHANA R', 'bamboo52698@gmail.com', '9578425412', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', NULL, '2024-04-01', NULL, NULL, '1', NULL),
(100364, '', '', NULL, '', NULL, NULL, '0', '', 'alex', 'paulwesly0125@gmail.com', '9789898989', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', NULL, '2024-04-16', NULL, NULL, '1', '2024-04-23'),
(100365, '', '', NULL, '', '2024-04-29', '2024-05-06', '0', '', 'abc', 'abc@gmail.com', '9999999999', '', '0', '0', '', '0', '0000-00-00 00:00:00', '', 'no', NULL, '2024-04-29', NULL, NULL, '1', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `UserEmail_2` (`UserEmail`,`UserMobileNo`);

--
-- Indexes for table `appsettings`
--
ALTER TABLE `appsettings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bankdetails`
--
ALTER TABLE `bankdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `calls`
--
ALTER TABLE `calls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commodities`
--
ALTER TABLE `commodities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commoditiespoint`
--
ALTER TABLE `commoditiespoint`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `holiday`
--
ALTER TABLE `holiday`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `login_activity`
--
ALTER TABLE `login_activity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`SNo`);

--
-- Indexes for table `paymentlog`
--
ALTER TABLE `paymentlog`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `paymentmode`
--
ALTER TABLE `paymentmode`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `premiumgroups`
--
ALTER TABLE `premiumgroups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `premiumusers`
--
ALTER TABLE `premiumusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sms`
--
ALTER TABLE `sms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscriptionprice`
--
ALTER TABLE `subscriptionprice`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tagname` (`tagname`);

--
-- Indexes for table `support`
--
ALTER TABLE `support`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `updates`
--
ALTER TABLE `updates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `UserEmail_2` (`UserEmail`,`UserMobileNo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `appsettings`
--
ALTER TABLE `appsettings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bankdetails`
--
ALTER TABLE `bankdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `calls`
--
ALTER TABLE `calls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8036;

--
-- AUTO_INCREMENT for table `commodities`
--
ALTER TABLE `commodities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `commoditiespoint`
--
ALTER TABLE `commoditiespoint`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `holiday`
--
ALTER TABLE `holiday`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `login_activity`
--
ALTER TABLE `login_activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `SNo` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `paymentlog`
--
ALTER TABLE `paymentlog`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1748;

--
-- AUTO_INCREMENT for table `paymentmode`
--
ALTER TABLE `paymentmode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=837;

--
-- AUTO_INCREMENT for table `premiumgroups`
--
ALTER TABLE `premiumgroups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `premiumusers`
--
ALTER TABLE `premiumusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `sms`
--
ALTER TABLE `sms`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `support`
--
ALTER TABLE `support`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `updates`
--
ALTER TABLE `updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22954;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100366;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
