* mysql -u root -p 
* create database learn; 
* use learn;  
* source learn.sql：source /db/learn.sql;


```javascript
config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'learn',
    username: '', 
    password: '', 
    operatorsAliases: false
};
```

* cd service
* npm install
* npm run dev


* cd client
* npm install
* npm start
