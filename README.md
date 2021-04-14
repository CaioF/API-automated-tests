# Integration tests
Battery of automated tests for the CRUD endpoints of the LifeGuard API
> Tested on Ubuntu 20.04

### Requirements 
1.    PostgreSQL 13.2
2.    Node 14.16

### Usage
1.    `git clone git@lab.qoollo.com:lifeguard/backend/integration-tests.git`
2.    `cd integration-tests/`
3.    `git checkout feature/LGS-177-hippie-API-tests`
4.    `npm install`
5.    download api server and rename it to `/test_server/api_test_server`
6.    `./init.bash`

> When running the `init.bash` script for the first time, it might fail due to the fact that the database migration takes longer during the first initialization

### TODO
1.    Server (`/test_server/api_test_server`) needs to be manually downloaded/renamed with every change pushed to the [API's master repository](https://lab.qoollo.com/lifeguard/backend/api/-/tree/master_v2).
This could be automated via a workflow.
2.    Swagger parser was removed due to [this error](https://github.com/ajv-validator/ajv/issues/461). A new swagger parser needs to be added.
3.    Finish adding the tests described on [this spreadsheet](https://docs.google.com/spreadsheets/d/17hh7UODqE6ab2o93NhpY_IglIwGZ4VBC39dRmwiyji0/edit?usp=sharing)