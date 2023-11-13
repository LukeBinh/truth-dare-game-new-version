IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.MyProc'))
   exec('CREATE PROCEDURE [dbo].[MyProc] AS BEGIN SET NOCOUNT ON; END')
GO

ALTER PROCEDURE GetDareQuestionPaging
 @PageSize INT = 10  
 ,@PageIndex INT = 0  
AS  
BEGIN  
 DECLARE @DareQuestionTBLPaging TABLE (  
  Id INT  
  ,Question NVARCHAR(MAX)  
  ,RowNumber INT  
 )  
  
 INSERT INTO @DareQuestionTBLPaging  
 SELECT Id  
    ,Question  
    ,ROW_NUMBER() OVER (ORDER BY dareTbl.Id ASC) as RowNum  
 FROM TruthDareGame_DB.dbo.DareQuestion dareTbl  
  
 SELECT Id, Question  
 FROM @DareQuestionTBLPaging  
 WHERE (RowNumber > @PageIndex * @PageSize) AND (RowNumber <= (@PageIndex + 1) * @PageSize)  
  
 SELECT COUNT(*) total  
 FROM @DareQuestionTBLPaging  
END  
GO