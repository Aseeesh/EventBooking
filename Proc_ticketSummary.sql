-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ashish Rijal>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
alter PROCEDURE [dbo].[Proc_tableDetail]  
	-- Add the parameters for the stored procedure here [Proc_tableDetail] @eventId=1
	@eventId int
	--,@createdBy int =0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
 DROP TABLE IF EXISTS  #tempEventTableDetail 
   declare @startCount int =1, @seatNo int = 0
   set @seatNo = (select   c.[NoOfSeats]  from [dbo].[Events] e 
				   join   [dbo].[EventCategories] c on e.[EventCategoryId] = c.id
				   where e.Id=@eventId)

	CREATE TABLE #tempEventTableDetail ( rowId INT IDENTITY (1,1), seatId  NVARCHAR (20), eventId nvarchar (50), seatStatus  nvarchar (50) )
	
	insert into #tempEventTableDetail select seatId,@eventId,'occupied'  from [dbo].[TicketDetails] where eventDetailId=@eventId

if not exists(select * from [dbo].[TicketDetails]  where EventDetailId  =@eventId)
	 begin
		 while(@startCount <= @seatNo)
		 begin
		  insert into #tempEventTableDetail select @startCount, @eventId,' Avaliable' set @startCount=@startCount+ 1
		   end
	end 

else

begin

--set @startCount-(select count(rowId) from #tempEventTableDetail where eventId=@eventId) 
while(@startCount <=@seatNo)
 begin
  if not exists(select 'X' from #tempEventTableDetail where seatId=@startCount)
   begin insert into #tempEventTableDetail select @startCount, @eventId, 'Avallable:' end

	set @startCount=@startCount+1

end
end
select * from #tempEventTableDetail order by  seatId,rowId

 
END
GO
