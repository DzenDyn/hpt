# Hipath Tariffication Service
The service allows you to collect information about calls, record it into a database and provides a convenient user interface.

Project contains 3 modules:
1. Backend – NodeJs+Express RESTful API
2. Collector – NodeJS application that connects to the PBX reads the tariffication lines and transmits them to the backend via RESTful API
3. Frontend – React Application



Amo commands to configure HiPath to default cdr format:
```
ADD-FTBL:1,B,FORM,1,N,"#@.#@.#@@@ #@:#@:#@ #@:#@:#@ #@@@@@@@@@ #@@@@@@@@@";
ADD-FTBL:1,B,FORM,2,N,"@@@@@@@@@@@@ #@@ #@@ #";
ADD-FTBL:1,B,CTRL,3,N,CR;
ADD-FTBL:1,B,CTRL,4,Y,LF;
ADD-FTBL:1,B,FIELD,1,STDAY,CHAR,"0",R;
ADD-FTBL:1,B,FIELD,2,STMONTH,CHAR,"0",R;
ADD-FTBL:1,B,FIELD,3,STYEAR,CHAR,"0",R;
ADD-FTBL:1,B,FIELD,4,STHOUR,CHAR,"0",R;
ADD-FTBL:1,B,FIELD,5,STMIN,CHAR,"0",R;
ADD-FTBL:1,B,FIELD,6,STSEC,CHAR,"0",R;
ADD-FTBL:1,B,FIELD,7,CONHOUR,CHAR,"0",R;
ADD-FTBL:1,B,FIELD,8,CONMIN,CHAR,"0",R;
ADD-FTBL:1,B,FIELD,9,CONSEC,CHAR,"0",R;
ADD-FTBL:1,B,FIELD,10,CHRGEE,CHAR," ",R;
ADD-FTBL:1,B,FIELD,11,DESTPTY,CHAR," ",L;
ADD-FTBL:1,B,FIELD,12,TKNOLIST,CHAR," ",R;
ADD-FTBL:1,B,FIELD,13,CONNTYPE,CHAR," ",R;
ADD-FTBL:1,B,FIELD,14,ROUTCN,CHAR," ",R;
```