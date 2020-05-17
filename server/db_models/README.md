## Database setup

1. The postgreSQL server is running, and the database you want to use is ready.
2. Environment variable DB_CONNECTION_STRING is set to the connect string for your postgres server. See default string in config.py for an example.
3. Environment variable FLASK_APP is set to access app.py. 
    - Other environment variables are set appropriately.
4. (optional) Do a check with previous basic routes: 
    - start the app (`flask run`)
    - localhost:5000/v1/welcome
    - `curl -X POST -H 'Content-Type: application/json' -d '{"teamName": "sally"}' http://localhost:5000/v1/ping`
    - stop the app
5. Ensure FLASK-SQLAlchemy, FLASK-Migrate and psycopg2 are installed in your virtual environment.
6. Open a terminal and go to the server directory. Type `flask db init`. This will create a migrations directory. You only need to do this the **first time** using FLASK-Migrate for a database.
7. Type `flask db migrate`. FLASK-Migrate will check the database against your models, and generate scripts (in versions directory) to upgrade the database (and to undo the actions with downgrade).
8. Once you are satisfied that the script will make the intended changes, type `flask db upgrade`. This will actually make the changes to the database.
9. If more changes are made to your models, repeat steps 7 and 8.
10. These steps assume you are starting with a fresh database or using the same database to do migrations. 
	- Mixing databases and scripts can get tricky. 
11. References: 
    <br> https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database
    <br> https://flask-migrate.readthedocs.io/en/latest/
