var express = require('express');
var router = express.Router();
var MatchDao = require('../models/MatchDao');
var Match = require('../models/Match');

router.use(function (req, res, next) {
    if (!req.session.isLogin) {
        res.send('<script> alert("잘못된 접근입니다!"); location.href="/" </script>');
    }

    next();
});

/* GET home page. */
router.get('/', function (req, res) {
    MatchDao.getAllMatches(function (isSuccessful, errorMessage, data) {
        if(!isSuccessful){
            return res.send('<script>alert("메인 페이지를 불러오는데 오류가 발생하였습니다"); history.back(); </script>');
        } else if (data == null) {
            return res.send('<script>alert("DB가 비어 있습니다"); history.back(); </script>');
        } else {
            res.render('main', {data: data, title: '빅매치 관리자 페이지'});
        }
    })
});

router.get('/delete/:id', function (req, res) {
    let id = req.params.id;

    if (!id) {
        return res.send('<script>alert("매치 아이디 값이 넘어오지 않았습니다!"); history.back(); </script>');
    }

    MatchDao.deleteMatch(id, function (errorMessage, data) {
        if (errorMessage) {
            return res.send('<script>alert("매치 삭제 도중 에러가 발생했습니다~"); history.back(); </script>');
        }

        res.send('<script> alert("삭제되었습니다."); location.href="/main" </script>');
    })
});

// 수정 페이지 띄워주는 URL
router.get('/modify/:id', function (req, res) {
    let id = req.params.id;

    if (!id) {
        return res.send('<script>alert("매치 아이디 값이 넘어오지 않았습니다!"); history.back(); </script>');
    }

    MatchDao.findMatchById(id, function (isSuccessful, errorMessage, data) {
        if (!isSuccessful) {
            return res.send('<script>alert("아이디에 해당하는 값이 없습니다!"); history.back(); </script>');
        }

        res.render('form', {title: '매치 수정 폼', data: data})
    })
});

router.post('/modify', function (req, res) {
    let id = req.body.id;
    let category = req.body.category;
    let match_day = req.body.match_day;
    let match_time = req.body.match_time;
    let home_team = req.body.home_team;
    let away_team = req.body.away_team;
    let url = req.body.url;
    let small_category = req.body.small_category;
    let comments = req.body.comments;


    MatchDao.updateMatch(new Match(id, category, match_day, match_time, home_team, away_team, url, small_category, comments), function (errorMessage, data) {
        console.log(errorMessage);
        if (errorMessage) {
            return res.send('<script>alert("수정에 실패함"); history.back(); </script>');
        }

        res.send('<script> alert("수정되었습니다."); location.href="/main" </script>');
    })
});

router.get('/add', function (req, res) {
    res.render('addForm', {title: '매치 추가 폼'});
});

router.post('/add', function (req, res) {
    let category = req.body.category;
    let match_day = req.body.match_day;
    let match_time = req.body.match_time;
    let home_team = req.body.home_team;
    let away_team = req.body.away_team;
    let url = req.body.url;
    let small_category = req.body.small_category;
    let comments = req.body.comments;

    MatchDao.insertMatch(new Match(0, category, match_day, match_time, home_team, away_team, url, small_category, comments), function (errorMessage, data) {
        console.log(errorMessage);
        if (errorMessage) {
            return res.send('<script>alert("추가에 실패하였습니다!"); history.back(); </script>');
        }

        res.send('<script> alert("추가되었습니다."); location.href="/main" </script>');
    })
});


module.exports = router;
