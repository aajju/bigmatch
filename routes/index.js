var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '로그인'});
});

router.post('/login', function (req, res) {
    let id = req.body.id;

    if (!id) {
        return res.send('<script>alert("아이디를 입력해 주세요!"); history.back(); </script>');
    }

    let password = req.body.password;

    if (!password) {
        return res.send('<script>alert("비밀번호를 입력해 주세요!"); history.back(); </script>');
    }

    if (id == 'admin' && password == '1234') {
        req.session.isLogin = true;
        return res.redirect("/main");
    } else {
        return res.send('<script>alert("아이디 또는 비밀번호가 일치하지 않습니다!"); history.back(); </script>');
    }

});

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect("/");
});


module.exports = router;
