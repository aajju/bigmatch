const express = require('express');
const router = express.Router();
const MatchDao = require('../models/MatchDao');


/* GET api listing. */
router.get('/match/:match_day/:category', function (req, res, next) {
    let match_day = req.params.match_day;

    if (!match_day) {
        return res.status(400).json({errorMessage: '매치 데이를 입력하세요!'});
    }

    let category = req.params.category;
    let check = parseInt(category, 10);

    if (!check) {
        return res.status(400).json({errorMessage: '카테고리의 형식이 올바르지 않습니다!'});
    }


    MatchDao.getMatches(category, match_day, function (isSuccessful, errorMessage, result) {
        if (!isSuccessful) {
            return res.status(500).json({errorMessage: errorMessage});
        }

        if (errorMessage) {
            return res.status(404).json({errorMessage: errorMessage});
        }

        return res.status(200).json(result);
    })
});

module.exports = router;
