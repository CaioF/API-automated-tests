#!/bin/bash
echo 'Start'

# Create user and test database
sudo su postgres <<EOF
psql -c "DROP DATABASE IF EXISTS api_test_db;"
psql -c "DROP USER IF EXISTS api_test_user;"
psql -c "CREATE USER api_test_user WITH ENCRYPTED PASSWORD 'api_test_user_123';"
psql -c "CREATE DATABASE api_test_db;"
psql -c "GRANT ALL PRIVILEGES ON DATABASE api_test_db TO api_test_user;"
EOF

# Create data files
echo 'CREATE DATA FILES'
touch logs/server_report.log
touch logs/tests_report.log
## Create and initialize tokens.json with a blank JSON object
cat > src/tokens.json <<EOF
{

}
EOF
## Create and initialize createdIDs.json with a blank JSON object
cat > src/createdIDs.json <<EOF
{

}
EOF
## Create and initialize config.json with an url to be used by all tests and the default manager login
cat > src/config.json <<EOF
{
  "url": "http://localhost:3000/api/v1",
  "manager": {
    "email": "admin@admin.com",
    "password": "admin123"
  }
}
EOF

# Initiate test server and disown the process, output from the server is redirected to server_report.log
# NOTE: This leaves an errant process, wait for script end to kill it, or run 'killall api_test_server'
echo 'INITIALIZE SERVER'
bash -c 'cd test_server && ./api_test_server &> "../logs/server_report.log" & disown'

# Wait 5 seconds for the database to load
sleep 5

# Run tests, for more options read: https://mochajs.org/api/cli_options.js.html
echo 'RUN TESTS'
# Use the following command for a json-stream into tests_report.log file:
## npx mocha -R json-stream  "src/tests/**/*test.js" > ./logs/tests_report.log
# Use the following command for a formated/colored output into console:
npx mocha "src/tests/**/*test.js" 

# Kill the errant process
echo 'KILL SERVER'
killall api_test_server

exit
