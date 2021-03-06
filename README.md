# Integration tests
Battery of automated tests for the CRUD endpoints of the LifeGuard API
> Tested on Ubuntu 20.04

### Requirements 
1.    PostgreSQL 13.2    
    a.    psql
2.    Node 14.16    
    a.    npm    
    b.    npx


### Usage
1.    `git clone git@github.com:CaioF/API-automated-tests.git`
2.    `cd API-automated-tests/`
3.    `npm install`
4.    download api server and rename it to `/test_server/api_test_server`
5.    make sure you have PostgreSQL service running, but not connected to the test database
6.    `./init.bash`

> When running the `init.bash` script for the first time, it might fail due to the fact that the database migration takes longer during the first initialization

### TODO
1.    Server (`/test_server/api_test_server`) needs to be manually downloaded/renamed with every change pushed to the [API's master repository](https://lab.qoollo.com/lifeguard/backend/api/-/tree/master_v2).
This could be automated via a workflow.
2.    Swagger parser was removed due to [this error](https://github.com/ajv-validator/ajv/issues/461). A new swagger parser needs to be added.
3.    Finish adding the tests described on [this spreadsheet](https://docs.google.com/spreadsheets/d/17hh7UODqE6ab2o93NhpY_IglIwGZ4VBC39dRmwiyji0/edit?usp=sharing)
