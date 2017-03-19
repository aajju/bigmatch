/**
 * Created by prChoe on 2016-08-16.
 */
var mysql = require('mysql');

var pool = mysql.createPool({
    host: '13.124.88.242',
    port: 3306,
    user: 'aajju',
    password: '@@123456789a',
    database: 'big_match',
    connectionLimit: 10,
    waitForConnections: true,
    supportBigNumbers: true,
    bigNumberStrings: true
});

exports.pool = pool;