FROM python:3.7

WORKDIR /usr/src/app

COPY . .

RUN pip3 install pipenv
RUN pipenv install


CMD pipenv run flask db init && \
    pipenv run flask db migrate && \
    pipenv run flask db upgrade && \ 
    pipenv run flask run --host=0.0.0.0