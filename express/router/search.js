const { createWebAPIRequest } = require('../util/util');

module.exports = (req, res)=> {
    const cookie = req.get('Cookie') ? req.get('Cookie') : '';
    const keywords = req.body.keywords;
    const type = req.body.type || 1;
    const limit = req.body.limit || 30;
    const offset = req.body.offset || 0;
    // *(type)* 搜索单曲(1)，歌手(100)，专辑(10)，歌单(1000)，用户(1002)
    const data = {
        csrf_token: '',
        limit,
        type,
        offset,
        s: keywords
    };

    createWebAPIRequest(
        'music.163.com',
        '/weapi/search/get',
        'POST',
        data,
        cookie,
        music_req => res.send(music_req),
        err => res.status(502).send('fetch error')
    )
};


