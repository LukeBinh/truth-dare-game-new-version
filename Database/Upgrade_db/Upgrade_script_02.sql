IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('GetTruthQuestionPaging'))
   exec('CREATE PROCEDURE GetTruthQuestionPaging AS BEGIN SET NOCOUNT ON; END')
GO

ALTER PROCEDURE GetTruthQuestionPaging
 @PageSize INT = 10  
 ,@PageIndex INT = 0  
AS  
BEGIN  
 DECLARE @TruthQuestionTBLPaging TABLE (  
  Id INT  
  ,Question NVARCHAR(MAX)  
  ,RowNumber INT  
 )  
  
 INSERT INTO @TruthQuestionTBLPaging  
 SELECT Id  
    ,Question  
    ,ROW_NUMBER() OVER (ORDER BY dareTbl.Id ASC) as RowNum  
 FROM TruthDareGame_DB.dbo.DareQuestion dareTbl  
  
 SELECT Id, Question  
 FROM @TruthQuestionTBLPaging  
 WHERE (RowNumber > @PageIndex * @PageSize) AND (RowNumber <= (@PageIndex + 1) * @PageSize)  
  
 SELECT COUNT(*) total  
 FROM @TruthQuestionTBLPaging  
END  
GO