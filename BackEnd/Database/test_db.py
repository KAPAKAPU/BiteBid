from database import test_database_connection

try:
    database_name = test_database_connection()
    print(f"Successfully connected to database: {database_name}")
except Exception as error:
    print(f"Database connection failed: {error}")