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

- [User login and registration](#Login-and-registration)
- [Explore and filter projects](#Explore-and-filter-projects)
- [Creating a project](#Creating-a-project)
- [Editing a profile](#Editing-a-profile)
- [Uploading photos](#Uploading-photos)
- [Connecting a stripe account](#Connecting-a-Stripe-account)
- [Creating a stripe payment method](#Creating-a-Stripe-payment-method)
- [Funding a project](#Funding-a-project)
- [Paying out a project](#Paying-out-a-project)

#### Login and registration

Registration creates a new user - password encryption provided by bcrypt - and logs them in. Certain routes on both the front-end and back-end are protected. On the backend, a logged in user stores an HTTP-only JWT cookie, which is sent to the backend on every request. The JWT stores a user id claim for quick verification. The frontend has an "isAuthenticated" state which is set by calling the backend and having it verify a user is logged in.

![Register an account](./gifs/registration.gif)

#### Explore and filter projects

Allows a user to explore all the live projects, ready to be perused and funded. Explore allows filtering by industry, location, or deadline. These are sent to the backend and used to query the Postgres database, making use of SQLAlchemy's query filters.

![Explore page](./gifs/explore-page.gif)

#### Creating a project

Creating a project brings the user first through a quick-start form, and then to the edit page where the project can be fully customized. Project owners can fill out information such as title, subtitle, industries, location, and can specify logistical details such as their funding deadline, funding goal, and equity offered. Projects can be pushed "live" once the information is completed, allowing it to be viewable to other users, and to begin receiving funding.

![Creating a project](./gifs/create-project.gif)

![Editing a project](./gifs/edit-project.gif)

#### Editing a profile

Once a user has registered, they can fill out more details about their profile. They can upload profile photos, add a location, description, areas of expertise, and links to their Linkedin/Angelco profiles. If a user is viewing their own profile page, they will see an edit profile option that opens up a dialog where they can edit their information.

![Editing a profile](./gifs/edit-profile.gif)

#### Uploading photos

![Uploading a photo](./gifs/upload-photo.gif)

#### Connecting a Stripe account

Before pushing a project "live", the user must connect a Stripe account to the project. Investments are transferred to this account if the project reaches its funding goal. Users are redirected from the app to a Stripe page where they can fill in their information and create a connected account. The backend listens for webhooks from the Stripe API, and saves the created account to the database on success.

![Connecting a Stripe account](./gifs/connect-account.gif)

#### Creating a Stripe payment method

To fund a project, a user must first register a payment method (e.g. credit card). Users may register multiple payment methods to use, and each method is validated by Stripe and connected to their customer id. Similar to connecting a Stripe account, users are redirected to a Stripe page to register a payment method, and the backend listens for a webhook to process and save the payment method on success.

![Creating a Stripe payment method](./gifs/payment-method.gif)

#### Funding a project

When a user finds a project they would like to fund, they can choose one of their payment methods and decide on an amount. Upon successful funding, the fund details are added to the database, but the payment is not yet processed. Payments are only processed after the project's funding deadline if their funding goal was reached.

![Funding a project](/gifs/fund-project.gif)

#### Paying out a project

After the project funding deadline, if the funding goal was reached then all of the saved funds for the project are processed. They are fetched from the database and sent to Stripe for collection. Each payment is checked for success, and the amount successfully collected is compared against the total funding.

This feature is currently handled by a backend route as a proof-of-concept, however this will eventually be implemented with a task scheduler (i.e. Celery) and executed on a separate container. Upon creation of a project, a task will be added to the queue based on its funding deadline. It will check if the funding goal was met, and if so, process all of the project's funds. The project owner will be notified of successful payment collection via email, and the investors will receive an electronic share certificate corresponding to the amount of equity they have purchased.

## Planned Features

#### Messaging

Users will be able to privately message other users through their profile, and ask for more details about a project, investments, etc. This will be implemented with Socket.io.

#### WYSIWYG editor for project description

In order to give project owners more control over the presentation of their project landing page, the project description will provide a WYSIWYG editor from Draft.js.

#### Google Maps API integration for location

Profile and project locations will be selectable via an interactive map provided by the Google Maps API. Projects will be filterable on the explore page via distance from a given location.
