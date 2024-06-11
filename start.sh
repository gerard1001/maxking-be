#!/bin/bash

if [ -z "$DB_HOST" ] || [ "$DB_HOST" = "127.0.0.1" ] || [ "$DB_HOST" = "localhost" ]
then

    # If the DEV_DB_* variables are not set, we will use the default values
    if [ -z "$DB_NAME_DEV" ]
    then
        export DB_NAME_DEV="mki"
        echo "DB_NAME_DEV is not set. Using default value: $DB_NAME_DEV"
    fi
    if [ -z "$DB_USER" ]
    then
        export DB_USER="postgres"
        echo "DB_USER is not set. Using default value: $DB_USER"
    fi
    if [ -z "$DB_PASSWORD" ]
    then
        export DB_PASSWORD="postgres"
        echo "DB_PASSWORD is not set. Using default value: $DB_PASSWORD"
    fi

    service postgresql start
    service postgresql status

    su - postgres -c "createdb $DB_NAME_DEV"
    su - postgres -c "psql -c \"ALTER USER $DB_USER PASSWORD '$DB_PASSWORD';\""
fi

npm run migrate:all
npm run start:node