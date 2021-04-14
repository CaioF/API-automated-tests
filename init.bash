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
touch tests/data_files/report.log
cat > tests/data_files/tokens.json <<EOF
{

}
EOF

# Initiate test server and disown the process 
# NOTE: This leaves an errant process, wait for script end to kill it, or run 'killall api_test_server'
echo 'INITIALIZE SERVER'
bash -c 'cd test_server && ./api_test_server </dev/null >/dev/null 2>&1 & disown'

# Wait 5 seconds for the database to load
sleep 5

# Run tests, for more options read: https://mochajs.org/api/cli_options.js.html
echo 'RUN TESTS'
# Use the following command for a json-stream to a report.log file:
# npx mocha -R json-stream  "./tests/**/*test.js" > ./log/report.log
# Use the following command for a formated/colored output to console:
npx mocha "tests/**/*test.js" 

# Kill the errant process
echo 'KILL SERVER'
killall api_test_server

exit
