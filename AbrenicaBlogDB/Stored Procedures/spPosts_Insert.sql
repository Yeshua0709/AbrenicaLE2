CREATE PROCEDURE [dbo].[spPosts_Insert]
	@userId int,
	@title nvarchar (150),
	@body text,
	@DateCreated datetime2

AS
begin
	INSERT INTO dbo.Posts
	(UserId,Title, Body, DateCreated)
	VALUES
	(@userId, @title, @body, @DateCreated)

	end
