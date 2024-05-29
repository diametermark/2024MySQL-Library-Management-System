import MySQLdb

try:
    connection = MySQLdb.connect(
        host='localhost',
        user='root',
        passwd='root',
        db='lms'
    )
    print("Connection successful")
    # Ensure cursor works in this context
    cur = connection.cursor()
    print(cur)
    cur.execute("SELECT 1")
    cur.close()
    connection.close()
except MySQLdb.Error as e:
    print(f"Error connecting to MySQL: {e}")