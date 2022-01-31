
----------------------------------------------------------------CUSTOMER
--GET CUSTOMER
CREATE PROCEDURE [db_virtualagency].[spGetDetailCustomer](@DocumentNum AS numeric, @Phone AS numeric) 
as
BEGIN 
SELECT
	case when DocumentType = 'RUC' then BusinessName 
			when DocumentType = 'DNI' then CONCAT(Name, ' ',Lastname)
	end as Customer,
		CustomerGUID,
		DocumentType,
		CustomerCode,
		DocumentType,
		DocumentNumber,
		Phone,
		Email,
		Agency
	From Customers
	WHERE DocumentNumber = @DocumentNum AND Phone = @Phone
END;

CREATE PROCEDURE [db_virtualagency].[spGetCustomerAndCreditIds](
	@CustomerGUID as uniqueidentifier,
	@CreditGUID as uniqueidentifier
)
as
begin
	select
		cu.CustomerId,
		cr.CreditId
	from [db_virtualagency].[Customers] cu
	inner join [db_virtualagency].[Credits] cr 
	ON cr.CustomerId = cu.CustomerId
	where cu.CustomerGUID = @CustomerGUID and cr.CreditGUID = @CreditGUID 
END;


CREATE PROCEDURE [db_virtualagency].[spGetCustomerId](
	@CustomerGUID as uniqueidentifier
)
as
begin
	select
		CustomerId
	from [db_virtualagency].[Customers] 
	where CustomerGUID = @CustomerGUID 
END;


----------------------------------------------------------------CREDIT

--get credits
CREATE PROCEDURE [db_virtualagency].[spGetDetailCredits](
	@CustomerGUID as uniqueidentifier
)
as
begin
	select 
		cr.CreditGUID,
		cr.CreditNumber,
		cr.ProductName,
		cr.Amount as AmountCredit,
		cr.Period,
		cr.Balance,
		cr.EndDate,
		cr.Status,
		cfi.TotalFeesPaid,
		cfi.TotalFeesDefeated
	from [db_virtualagency].[Credits] cr WITH (NOLOCK)
	inner join [db_virtualagency].[Customers] cu WITH (NOLOCK) on cu.CustomerId = cr.CustomerId
	inner join [db_virtualagency].[CreditFeeInfo] cfi WITH (NOLOCK) on cfi.CreditId = cr.CreditId 
	where cu.CustomerGUID = @CustomerGUID
END;


----------------------------------------------------------------CREDITS

--get credit
CREATE PROCEDURE [db_virtualagency].[spGetDetailCredit](
	@CustomerGUID as uniqueidentifier,
	@CreditGUID as uniqueidentifier
)
as
begin
	select	
		case when cu.DocumentType = 'RUC' then cu.BusinessName 
			 	 when cu.DocumentType = 'DNI' then CONCAT(cu.Name, ' ',cu.Lastname)
		end as Customer,
		cu.DocumentNumber,
		cu.Phone,
		cu.Email,
		cr.CreditGUID,
		cr.CreditNumber,
		cr.ProductName,
		FORMAT(cr.Amount,'#,000.00') as AmountCredit,
		cr.Currency,
		cr.InterestRate,
		cr.Period,
		FORMAT(cr.Balance,'#,000.00') as Balance,
		cr.StartDate,
		cr.EndDate,
		cr.Status,
		FORMAT(cpy.Amount,'#,000.00') as AmountCurrentFee
	from [db_virtualagency].[Credits] cr
	inner join [db_virtualagency].[Customers] cu
	on cr.CustomerId = cu.CustomerId
	inner join [db_virtualagency].[CreditPaymentFees] cpy
	on cr.CreditId = cpy.CreditId
	where cu.CustomerGUID = @CustomerGUID and cr.CreditGUID = @CreditGUID and cpy.StatusFeeId = 2
END;


----------------------------------------------------------------CREDIT PAYMENT FEES

--get credit payment fees
CREATE PROCEDURE [db_virtualagency].[spGetDetailCreditPaymentFees](
	@CustomerGUID as uniqueidentifier, 
	@CreditGUID as uniqueidentifier,
	@StatusFeeId as int,
	@Size as int
)
as
begin
	select
		cpf.CreditPaymentFeeGUID,
		FORMAT(cpf.Amount,'#,000.00') as Amount,
		cpf.ExpiryDate,
		sf.Name
	from [db_virtualagency].[CreditPaymentFees] cpf
	inner join [db_virtualagency].[Credits] cr on cr.CreditId = cpf.CreditId 
	inner join [db_virtualagency].[Customers] cu on cu.CustomerId = cr.CustomerId
	inner join [db_virtualagency].[StatusFees] sf on sf.StatusFeeId = cpf.StatusFeeId
	where cr.CreditGUID = @CreditGUID 
		and cu.CustomerGUID = @CustomerGUID 
		and sf.StatusFeeId = @StatusFeeId
	order by cpf.ExpiryDate
	OFFSET 0 ROWS FETCH NEXT @Size ROWS ONLY;
END;


--get status fees
CREATE PROCEDURE [db_virtualagency].[spGetStatusFees](
	@CreditGUID as uniqueidentifier
)
as
begin
	select
		cpy.StatusFeeId
	from [db_virtualagency].[CreditPaymentFees] cpy
	inner join [db_virtualagency].[Credits] cr 
	ON cpy.CreditId = cr.CreditId
	where cr.CreditGUID = @CreditGUID 
END;




----------------------------------------------------------------QUERY TYPES 
--insert fee payment query
CREATE PROCEDURE [db_virtualagency].[spInsertFeePaymentQuery](
	@CustomerId as int, 
	@CreditId as int,
	@OperaringSystem as varchar(30),
	@Device as varchar(30),
	@ModelDevice as varchar(30),
	@RequestIp as varchar(30)
)
as
begin
	insert into [db_virtualagency].[FeePaymentQueries] 
	values(
		@CustomerId, 
		@CreditId, 
		NEWID(), 
		@OperaringSystem, 
		@Device, 
		@ModelDevice, 
		@RequestIp, 
		GETUTCDATE()
	)
end;


--insert customer credit query
CREATE PROCEDURE [db_virtualagency].[spInsertCustomerCreditQuery](
	@CustomerId as int, 
	@OperaringSystem as varchar(30),
	@Device as varchar(30),
	@ModelDevice as varchar(30),
	@RequestIp as varchar(30)
)
as
begin
	insert into [db_virtualagency].[CustomerCreditQueries] 
	values(
		@CustomerId, 
		NEWID(), 
		@OperaringSystem, 
		@Device, 
		@ModelDevice, 
		@RequestIp, 
		GETUTCDATE()
	)
end;



--get credit query statistics
CREATE PROCEDURE [db_virtualagency].[spGetFeePaymentQueries](
	@OrderBy as varchar(10),
	@Size as tinyint,
	@offset as tinyint
)
as
begin
	select CASE WHEN LEN(cu.BusinessName) > 0
				   THEN cu.BusinessName
				   ELSE cu.Name
				END AS Customer, 
				cu.CustomerGUID, 
				cu.DocumentNumber,	
				cu.DocumentType,
				cu.Phone, 
				cu.Email,
				fpq.OperatingSystem, 
				fpq.Device, 
				fpq.ModelDevice, 
				fpq.RequestIp, 
				fpq.Date
		
	from [db_virtualagency].[FeePaymentQueries] fpq
	inner join [db_virtualagency].[Customers] cu on cu.CustomerId = fpq.CustomerId  
	order by fpq.Date ASC OFFSET @Offset rows fetch next @Size rows only;
	--issue
	select COUNT(*)  as total from [db_virtualagency].[FeePaymentQueries]
end;


--get operation types
CREATE PROCEDURE [db_virtualagency].[spGetQueryTypes]
as
begin
	select	
		QueryTypeId,
		Name,
		Description,
		State
	from [db_virtualagency].[QueryTypes]
END;

--get customer and fee counted query
CREATE PROCEDURE [db_virtualagency].[spGetQueryFeeAndCustomersAccounting](
	@StartDate as varchar(10), 
	@EndDate as varchar(10)
)
as
begin
	DECLARE @CustomerCreditQueryCount INT,
	@FeePaymentQueryCount INT;
	select @CustomerCreditQueryCount = count(CustomerCreditQueryId)
	from [db_virtualagency].[CustomerCreditQueries]
	where convert(varchar, Date, 23) between @StartDate and @EndDate

	select 
		@FeePaymentQueryCount=count(FeePaymentQueryId) 
	from [db_virtualagency].[FeePaymentQueries]
	where convert(varchar, Date, 23) >= @StartDate 
	and convert(varchar, Date, 23) <= @EndDate 

	select @CustomerCreditQueryCount as 'CustomerCreditQueryCount',@FeePaymentQueryCount as 'FeePaymentQueryCount'
END;



----------------------------------------------------------------WORK STREAM AUDIT

--insert work stream audit
CREATE PROCEDURE [db_virtualagency].[spInsertWorkStreamAudit](
	@WorkStream as varchar(150), 
	@Host as varchar(150),
	@Origin varchar(100),
	@RequestJson varchar(1500),
	@RequestDate datetime,
	@UserAgent varchar(100),
	@RequestIP varchar(20)
	
)
as
begin
	insert into [db_virtualagency].[WorkStreamAudits] 
	output inserted.WorkStreamAuditId 
	values(NEWID(), @WorkStream, @Host, @Origin, @RequestJson, @RequestDate, NULL, NULL, @UserAgent, @RequestIP)
	
END;


--update work stream audit
CREATE PROCEDURE [db_virtualagency].[spUpdateWorkStreamAudit](
	@WorkStreamId as varchar(36), 
	@ResponseJson varchar(1500),
	@ResponseDate datetime 
)
as
begin
	update [db_virtualagency].[WorkStreamAudits] set ResponseJson = @ResponseJson, ResponseDate = @ResponseDate where WorkStreamAuditId = @WorkStreamId
END;



--get fee payment queries counted/accounting
CREATE PROCEDURE [db_virtualagency].[spGetFeePaymentQueriesCounted](
	@StartDate as varchar(10), 
	@EndDate as varchar(10)
)
as
begin
	select 
		count(FeePaymentQueryId) as 'Total'  
	from [db_virtualagency].[FeePaymentQueries]
	where convert(varchar, Date, 23) >= @StartDate 
	and convert(varchar, Date, 23) <= @EndDate 
END;

CREATE PROCEDURE [db_virtualagency].[spGetCustomerCreditQueriesCounted](
	@StartDate as varchar(10), 
	@EndDate as varchar(10)
)
as
begin
	select 
		count(CustomerCreditQueryId) as 'Total'  
	from [db_virtualagency].[CustomerCreditQueries]
	where convert(varchar, Date, 23) between @StartDate and @EndDate
END;


--get query types by grouped by day
CREATE PROCEDURE [db_virtualagency].[spGetQueryTypesGroupedByDay](
	@StartDate as varchar(10), 
	@EndDate as varchar(10)
)
as
begin
select QueryType, Date, count(QueryType) as Total
from (
	select 
		'Consultas de fechas de pago' as QueryType, 
		convert(varchar, Date, 23) as Date 
		from [db_virtualagency].[FeePaymentQueries] where Date between @StartDate and @EndDate
	union all
	select 
		'Trámite de crédito de clientes' as QueryType, 
		convert(varchar, Date, 23) as Date
		from [db_virtualagency].[CustomerCreditQueries] where Date between @StartDate and @EndDate 
	) a
group by QueryType, Date
END;

		


--get operation types by document type
CREATE PROCEDURE [db_virtualagency].[spGetQueryTypesGroupedByDocumentType](
	@StartDate as varchar(10), 
	@EndDate as varchar(10)
)
as
begin
select cu.DocumentType, count(cu.DocumentType) as Total
from (
	select 
		CustomerId
			from [db_virtualagency].[FeePaymentQueries] where Date between @StartDate and @EndDate
	union all
	select 
		CustomerId
		from [db_virtualagency].[CustomerCreditQueries] where Date between @StartDate and @EndDate
	) qt
inner join [db_virtualagency].[Customers] cu ON cu.CustomerId = qt.CustomerId
group by cu.DocumentType
END;



--get query types by device
CREATE PROCEDURE [db_virtualagency].[spGetQueryTypesGroupedByDevice](
	@StartDate as varchar(10), 
	@EndDate as varchar(10)
)
as
begin
select Device, count(Device) as Total
from (
	select 
		Device
			from [db_virtualagency].[FeePaymentQueries] where Date between @StartDate and @EndDate
	union all
	select 
		Device
		from [db_virtualagency].[CustomerCreditQueries] where Date between @StartDate and @EndDate
	) a
group by Device
END;


--article votes
CREATE PROCEDURE [db_virtualagency].[spInsertArticleVote](
	@Usefull as bit
)
as
begin
	insert into [db_virtualagency].[ArticleVotes] 
	values(
		NEWID(), 
		@Usefull, 
		GETUTCDATE()
	)
	OUTPUT Inserted.Usefull
end;

--

