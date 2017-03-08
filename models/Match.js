/**
 * Created by massivcode on 2017. 3. 8..
 */
function Match(id, category, match_day, match_time, home_team, away_team, url) {
    this.id = id;
    this.category = category;
    this.match_day = match_day;
    this.match_time = match_time;
    this.home_team = home_team;
    this.away_team = away_team;
    this.url = url;
}

module.exports = Match;