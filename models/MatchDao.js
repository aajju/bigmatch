/**
 * Created by massivcode on 2017. 3. 8..
 */
const pool = require('../config/DatabaseConfiguration').pool;
const Match = require('./Match');

module.exports.insertMatch = function (match, callback) {
    const sql = "INSERT INTO big_match.match (category, match_day, match_time, home_team, away_team, url) VALUES(?, ?, ?, ?, ?, ?)";

    pool.getConnection(function (err, connection) {
        if (err) {
            callback("DbError", null);
            connection.release();
        } else {
            connection.query(sql, [match.category, match.match_day, match.match_time, match.home_team, match.away_team, match.url], function (err, rows) {
                if (err) {
                    console.log(err);
                    callback("SqlError", null);
                    connection.release();
                } else {
                    callback(null, true);
                    connection.release();
                }
            })
        }
    })
};

module.exports.updateMatch = function (match, callback) {
    const sql = 'UPDATE big_match.match SET category = ?, match_day = ?, match_time = ?, home_team = ?, away_team = ?, url = ? WHERE id = ?';

    pool.getConnection(function (err, connection) {
        if (err) {
            callback("DbError", null);
            connection.release();
        } else {
            connection.query(sql, [match.category, match.match_day, match.match_time, match.home_team, match.away_team, match.url, match.id], function (err, rows) {
                if (err) {
                    console.log(err);
                    callback("SqlError", null);
                    connection.release();
                } else {
                    callback(null, true);
                    connection.release();
                }
            })
        }
    })
};

module.exports.findMatchById = function (id, callback) {
    const sql = "SELECT * FROM big_match.match WHERE id = ?";

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            return callback(false, "DbError", null);
        }

        connection.query(sql, [id], function (err, rows) {
            if (err) {
                connection.release();
                return callback(false, "SqlError", null);
            }

            if (rows.length == 0 || rows == null) {
                connection.release();
                return callback(true, "Empty", null);
            }

            let each = rows[0];

            connection.release();
            return callback(true, null, new Match(each.id, each.category, each.match_day, each.match_time, each.home_team, each.away_team, each.url));
        })

    })
};

module.exports.getAllMatches = function (callback) {
    const sql = "SELECT * FROM big_match.match";

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            return callback(false, "DbError", null);
        }

        connection.query(sql, function (err, rows) {
            if (err) {
                connection.release();
                return callback(false, "SqlError", null);
            }

            if (rows.length == 0 || rows == null) {
                connection.release();
                return callback(true, "Empty", null);
            }

            let resultList = [];

            for (let i = 0; i < rows.length; i++) {
                let each = rows[i];
                resultList.push(new Match(each.id, each.category, each.match_day, each.match_time, each.home_team, each.away_team, each.url));
            }

            connection.release();
            return callback(true, null, resultList);
        })

    })
};

module.exports.deleteMatch = function (id, callback) {
    const sql = "DELETE FROM big_match.match WHERE id = ?";

    pool.getConnection(function (err, connection) {
        if (err) {
            callback("DbError", null);
            connection.release();
        } else {
            connection.query(sql, [id], function (err, rows) {
                if (err) {
                    callback("SqlError", null);
                    connection.release();
                } else {
                    callback(null, true);
                    connection.release();
                }
            })
        }
    })
};


module.exports.getMatches = function (category, match_day, callback) {
    const sql = "SELECT * FROM big_match.match WHERE category = ? AND match_day = ?";

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            return callback(false, "DbError", null);
        }

        connection.query(sql, [category, match_day], function (err, rows) {
            if (err) {
                connection.release();
                return callback(false, "SqlError", null);
            }

            if (rows.length == 0 || rows == null) {
                connection.release();
                return callback(true, "Empty", null);
            }

            let resultList = [];

            for (let i = 0; i < rows.length; i++) {
                let each = rows[i];
                resultList.push(new Match(each.id, each.category, each.match_day, each.match_time, each.home_team, each.away_team, each.url));
            }

            connection.release();
            return callback(true, null, resultList);
        })

    })
};