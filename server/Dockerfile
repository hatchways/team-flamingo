FROM python:3.7

WORKDIR /usr/src/app

COPY . .

RUN pip3 install pipenv
RUN pipenv install


CMD if [ ! -d "/user/src/app/migrations"]; then pipenv run flask db init; fi && \
    pipenv run flask db migrate && \
    pipenv run flask db upgrade && \ 
    pipenv run flask run --host=0.0.0.0