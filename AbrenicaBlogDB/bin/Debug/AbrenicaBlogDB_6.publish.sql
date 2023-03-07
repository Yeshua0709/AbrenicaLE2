﻿/*
Deployment script for BlogDB

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "BlogDB"
:setvar DefaultFilePrefix "BlogDB"
:setvar DefaultDataPath "C:\Users\PC\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\"
:setvar DefaultLogPath "C:\Users\PC\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\"

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
PRINT N'The following operation was generated from a refactoring log file b3373796-6f0b-4cf7-af11-291cb4b9815a';

PRINT N'Rename [dbo].[Posts].[Date Created] to DateCreated';


GO
EXECUTE sp_rename @objname = N'[dbo].[Posts].[Date Created]', @newname = N'DateCreated', @objtype = N'COLUMN';


GO
PRINT N'Creating Procedure [dbo].[spPosts_Insert]...';


GO
CREATE PROCEDURE [dbo].[spPosts_Insert]
	@userId int,
	@title nvarchar (150),
	@body text,
	@dateCreated datetime2

AS
begin
	INSERT INTO dbo.Posts
	(UserId,Title, Body, DateCreated)
	VALUES
	(@userId, @title, @body, @dateCreated)

	end
GO
-- Refactoring step to update target server with deployed transaction logs

IF OBJECT_ID(N'dbo.__RefactorLog') IS NULL
BEGIN
    CREATE TABLE [dbo].[__RefactorLog] (OperationKey UNIQUEIDENTIFIER NOT NULL PRIMARY KEY)
    EXEC sp_addextendedproperty N'microsoft_database_tools_support', N'refactoring log', N'schema', N'dbo', N'table', N'__RefactorLog'
END
GO
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'b3373796-6f0b-4cf7-af11-291cb4b9815a')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('b3373796-6f0b-4cf7-af11-291cb4b9815a')

GO

GO
PRINT N'Update complete.';


GO