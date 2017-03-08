/**
 * Created by massivcode on 2017. 3. 8..
 */
const pool = require('../config/DatabaseConfiguration').pool;
const Match = require('./Match');

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