# Product Launch

Product Launch is a web app that provides a marketplace for entrepreneurs to showcase their startups and raise funding from investors.

## Contributors

[Malcolm Gilbert](https://github.com/MalcolmAG), [Taylor McLean](https://github.com/tmclean15)

## Tech stack

- JavaScript/React
- Material-UI
- Python/Flask
- PostgreSQL with SQLAlchemy middleware
- Amazon S3
- Stripe
- JWT
- Bcrypt
- Axios

## Installing and running locally

It is suggested to run this app with Docker Compose as the project already contains the necessary configuration
for easy setup.

### Running the project in Docker:

1. Make sure you have Docker and Docker-Compose installed on your system. The desktop app is recommended:
   - https://www.docker.com/products/docker-desktop
2. From the root of the project, build the docker images with the following command:
   - `docker-compose build`
3. Run the containers with:
   - `docker-compose up`

You should now have 3 containers running. One for Node that is serving the React client, another for the Flask server, and another for the Postgres database. Changes in the client and server folders will be automatically be reflected in their respective containers via the volumes that are set up. There is one exception, which is the migrations folder. To manually run migrations, you will need to SSH into the server container's shell. To do this you will first need the container id or name:

- `docker ps`
  Then to SSH into the shell:
- `docker exec -it <container_id_or_name> bash`

Run the following commands in sequence to manually run migrations:

1.  `pipenv shell`
2.  `flask db init`
3.  `flask db migrate`
4.  `flask db upgrade`

Docker will create a volume on your machine that will allow the database data to persist if the container is brought down.

By now the React client can be accessed on [port 3000](http://localhost:3000), and the Flask API can be accessed on [port 5000](http://localhost:5000).

### Adding API key dependencies

This project has features that use Amazon S3 and Stripe, both of which will require API keys to function. Go to [AWS](https://aws.amazon.com/) and [Stripe](https://stripe.com/) to create accounts on the respective platforms. Create a `.env` in both the client and server directories, matching the key-value pairs in `.env.template`.

## Features

### Contents

- [User login and registration](####Login-and-registration)
- [Explore and filter projects](####Explore-and-filter-projects)
- [Creating a project](####Creating-a-project)
- [Editing a profile](####Editing-a-profile)
- [Uploading photos](####Uploading-photos)
- [Connecting a stripe account](####Connecting-a-stripe-account)
- [Creating a stripe payment method](####Creating-a-stripe-payment-method)
- [Funding a project](####Funding-a-project)

#### Login and registration

Registration creates a new user - password encryption provided by bcrypt - and logs them in. Certain routes on both the front-end and back-end are protected. On the backend, a logged in user stores an HTTP-only JWT cookie, which is sent to the backend on every request. The JWT stores a user id claim for quick verification. The frontend has an "isAuthenticated" state which is set by calling the backend and having it verify a user is logged in. 

#### Explore and filter projects

Allows a user to explore all the live projects, ready to be perused and funded. Explore allows filtering by industry, location, or deadline. These are sent to the backend and used to query the Postgres database, making use of SQLAlchemy's query filters. 

#### Creating a project

<!-- Content -->

#### Editing a profile

<!-- Content -->

#### Uploading photos

Product Launch allows you to upload your own photos, which are saved in an S3 bucket. The photo names are stored as a random uuid and are publically available. Currently, photo data is routed through the backend server, however AWS pre-signed URLs are a must-have for scalability.  

#### Connecting a stripe account

<!-- Content -->

#### Creating a stripe payment method

<!-- Content -->

#### Funding a project

<!-- Content -->
