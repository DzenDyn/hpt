# Hipath Tariffication Service
The service allows you to collect information about calls, record it into a database and provides a convenient user interface.

Project contains 3 modules:
1. Backend – NodeJs+Express RESTful API
2. Collector – NodeJS application that connects to the PBX reads the tariffication lines and transmits them to the backend via RESTful API
3. Frontend – React Application