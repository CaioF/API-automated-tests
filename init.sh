#!/bin/bash

# Create user and test database
sudo su postgres <<EOF
psql -c "DROP DATABASE IF EXISTS api_test_db;"
psql -c "DROP USER IF EXISTS api_test_user;"
psql -c "CREATE USER api_test_user WITH ENCRYPTED PASSWORD 'api_test_user_123';"
psql -c "CREATE DATABASE api_test_db;"
psql -c "GRANT ALL PRIVILEGES ON DATABASE api_test_db TO api_test_user;"
EOF

# Initiate test server and disown the process (this leaves an errant process)
./api_test_server </dev/null >/dev/null 2>&1 & disown

# Wait 10 seconds for the database to load and run tests
sleep 10
npx mocha index.js

# Wait 10 seconds and kill the errant process
sleep 10
killall api_test_server

exit
