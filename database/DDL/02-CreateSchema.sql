IF (NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'db_virtualagency')) 
BEGIN
    EXEC ('CREATE SCHEMA db_virtualagency')
END
