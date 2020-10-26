let  createPool = require('promise-mysql').createPool;

const mysqlPool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'paycol123',
    database: 'paycol',
    connectionLimit: 5000
});

module.exports = {
    connectionPool: mysqlPool
};
