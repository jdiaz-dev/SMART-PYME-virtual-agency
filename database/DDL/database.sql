drop table [db_virtualagency].[FeePaymentQueries]
drop table [db_virtualagency].[CustomerCreditQueries]
drop table [db_virtualagency].[CreditPaymentFees]
drop table [db_virtualagency].[StatusFees]
drop table [db_virtualagency].[CreditFeeInfo]
drop table [db_virtualagency].[Credits]
drop table [db_virtualagency].[Customers]

drop table [db_virtualagency].[QueryTypes]
drop table [db_virtualagency].[ArticleVotes]
drop table [db_virtualagency].[WorkStreamAudits]


CREATE TABLE [db_virtualagency].[Customers] (
  [CustomerId] int identity(1,1) NOT NULL,
  [CustomerGUID] uniqueidentifier NOT NULL,
  [CustomerCode] varchar(18) NOT NULL,
  [Name] varchar(50) NULL,
  [Lastname] varchar(50) NULL,
  [BusinessName] varchar(50) NULL,
  [DocumentType] varchar(30) NOT NULL,
  [DocumentNumber] varchar(11) NOT NULL,
  [Phone] varchar(11) NOT NULL,
  [Email] varchar(50) NOT NULL,
  [Gender] char(9) NULL,
  [Agency] varchar(50) NOT NULL,
  [CreatedBy] varchar(50) NOT NULL,
  [CreatedAt] datetime  NOT NULL,
  PRIMARY KEY ([CustomerId])
);


CREATE TABLE [db_virtualagency].[Credits] (
  [CreditId] int identity(1,1) NOT NULL,
  [CustomerId] int NOT NULL,
  [CreditGUID] uniqueidentifier NOT NULL, 
  [CreditNumber] varchar(18) NOT NULL,
  [ProductName] varchar(50) NOT NULL,
  [Amount] decimal(17,2) NOT NULL,
  [Currency] varchar(11) NOT NULL,  
  [InterestRate] decimal(17,2) NOT NULL,
  [Period] int NOT NULL,
  [Balance] decimal(17,2) NOT NULL,
  [StartDate] datetime,
  [EndDate] datetime,
  [Status] varchar(30) NOT NULL,
  [CreatedAt] datetime  NOT NULL,
  PRIMARY KEY ([CreditId]),
  CONSTRAINT [fk_Credits_Customers] FOREIGN KEY ([CustomerId]) REFERENCES [db_virtualagency].[Customers] ([CustomerId]),
);


CREATE TABLE [db_virtualagency].[CreditFeeInfo](
  [CreditFeeInfoId] int identity(1,1) NOT NULL,
  [CreditId] int NOT NULL,
  [TotalFeesPaid] int NOT NULL,
  [TotalFeesDefeated] int NOT NULL,
  [CurrentFeeAmount] decimal(17,2) NOT NULL,
  [Currency] varchar(11) NOT NULL,
  PRIMARY KEY ([CreditFeeInfoId]),
  CONSTRAINT [fk_CreditFeeInformations_Credits] FOREIGN KEY ([CreditId]) REFERENCES [db_virtualagency].[Credits] ([CreditId]),
);


CREATE TABLE [db_virtualagency].[StatusFees] (
  [StatusFeeId] int identity(1,1) NOT NULL,
  [StatusFeeGUID] uniqueidentifier NOT NULL, 
  [Name] varchar(30)  NOT NULL,
  [Description] varchar(100) NOT NULL,
  [CreatedAt] datetime  NOT NULL,
  PRIMARY KEY ([StatusFeeId]),
);

CREATE TABLE [db_virtualagency].[CreditPaymentFees] (
  [CreditPaymentFeeId] int identity(1,1) NOT NULL,
  [CreditId] int NOT NULL,
  [StatusFeeId] int NOT NULL,
  [CreditPaymentFeeGUID] uniqueidentifier NOT NULL, 
  [Amount] decimal(17,2)  NOT NULL,
  [ExpiryDate] datetime NOT NULL,
  [CreatedAt] datetime  NOT NULL,
  PRIMARY KEY ([CreditPaymentFeeId]),
  CONSTRAINT [fk_CreditPaymentFees_Credits] FOREIGN KEY ([CreditId]) REFERENCES [db_virtualagency].[Credits] ([CreditId]),
  CONSTRAINT [fk_CreditPaymentFees_StatusFees] FOREIGN KEY ([StatusFeeId]) REFERENCES [db_virtualagency].[Statu-sFees] ([StatusFeeId]),
);


CREATE TABLE [db_virtualagency].[QueryTypes] (
  [QueryTypeId] int identity(1,1) NOT NULL,
  [QueryTypeGUID] uniqueidentifier NOT NULL,
  [Name] varchar(30) NOT NULL,
  [Description] varchar(100) NULL,
  [State] varchar(30) NOT NULL,
  PRIMARY KEY ([QueryTypeId]),
);


CREATE TABLE [db_virtualagency].[FeePaymentQueries] (
  [FeePaymentQueryId] int identity(1,1) NOT NULL,
  [CustomerId] int NOT NULL,
  [CreditId] int NOT NULL,
  [FeePaymentQueryGUID] uniqueidentifier NOT NULL,
  [OperatingSystem] varchar(30) NOT NULL,
  [Device] varchar(30) NOT NULL,
  [ModelDevice] varchar(30) NOT NULL,
  [RequestIP] varchar(20) NOT NULL,
  [Date] datetime NOT NULL,
  PRIMARY KEY ([FeePaymentQueryId]),
  CONSTRAINT [fk_FeePaymentQueries_Customers] FOREIGN KEY ([CustomerId]) REFERENCES [db_virtualagency].[Customers] ([CustomerId]),
  CONSTRAINT [fk_FeePaymentQueries_Credits] FOREIGN KEY ([CreditId]) REFERENCES [db_virtualagency].[Credits] ([CreditId])
);


CREATE TABLE [db_virtualagency].[CustomerCreditQueries] (
  [CustomerCreditQueryId] int identity(1,1) NOT NULL,
  [CustomerId] int NOT NULL,
  [CustomerCreditQueryGUID] uniqueidentifier NOT NULL,
  [OperatingSystem] varchar(30) NOT NULL,
  [Device] varchar(30) NOT NULL,
  [ModelDevice] varchar(30) NOT NULL,
  [RequestIP] varchar(20) NOT NULL,
  [Date] datetime NOT NULL,
  PRIMARY KEY ([CustomerCreditQueryId]),
  CONSTRAINT [fk_CustomerCreditQueries_Customers] FOREIGN KEY ([CustomerId]) REFERENCES [db_virtualagency].[Customers] ([CustomerId])
);


CREATE TABLE [db_virtualagency].[WorkStreamAudits] (
  [WorkStreamAuditId] int identity(1,1) NOT NULL,
  [WorkStreamAuditGUID] uniqueidentifier NOT NULL,
  [WorkStream] varchar(200) NOT NULL,
  [Host] varchar(100) NOT NULL,
  [Origin] varchar(100) NOT NULL,
  [RequestJson] varchar(5000) NOT NULL,
  [RequestDate] datetime NOT NULL,
  [ResponseJson] varchar(5000) NULL,
  [ResponseDate] datetime NULL,
  [UserAgent] varchar(150) NOT NULL,
  [RequestIP] varchar(20) NOT NULL,
  PRIMARY KEY ([WorkStreamAuditId])
);


--votes about articles
CREATE TABLE [db_virtualagency].[ArticleVotes](
  [ArticleVoteId] int identity(1,1) NOT NULL,
  [ArticleVoteGUID] uniqueidentifier NOT NULL,
  [Usefull] bit NOT NULL,
  [CreatedAt] datetime,
  PRIMARY KEY ([ArticleVoteId])
)


