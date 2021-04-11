#!/bin/bash

# Create user and test database
sudo su postgres <<EOF
psql -c "DROP DATABASE IF EXISTS api_test_db;"
psql -c "DROP USER IF EXISTS api_test_user;"
psql -c "CREATE USER api_test_user WITH ENCRYPTED PASSWORD 'api_test_user_123';"
psql -c "CREATE DATABASE api_test_db;"
psql -c "GRANT ALL PRIVILEGES ON DATABASE api_test_db TO api_test_user;"
EOF

# Initiate test server and disowna the process 
# NOTE: This leaves an errant process, wait for script completion to kill it
# Or run 'killall api_test_server'
echo 'INITIALIZE SERVER'
bash -c 'cd test_server && ./api_test_server </dev/null >/dev/null 2>&1 & disown'

# Wait 5 seconds for the database to load and run tests
sleep 5
echo 'RUN TESTS'
npx mocha index.js

# Kill the errant process
echo 'KILL SERVER'
killall api_test_server

echo 'EXIT'
exit
