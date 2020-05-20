# flask-starter

## Starting the server:

1. Open a terminal and go to the server folder. Make sure you have **pipenv** installed (`pip install pipenv`)
2. Install the dependencies with `pipenv install`. This also createa a virtual environment, if there isn't one already
3. Activate the virtual environment and start the app with `pipenv run flask run`

## Running the project in Docker:

1. Make sure you have Docker and Docker-Compose installed on your system. The desktop app is recommended:
   - https://www.docker.com/products/docker-desktop
2. From the root of the folder, build the docker images with the following command:
   - `docker-compose build`
3. Run the containers with:
   - `docker-compose up`

You should now have 3 containers running. One for React, another for Flask, and another for Postgres. Docker is
configured to automatically run any migrations on the database on boot-up. Changes in the client and server folders will be automatically changed in their respective containers via the volumes that are set up. Any database data will currently not persist if the db container is brought down, but a volume can be created for this once there is a need.
