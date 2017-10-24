const { createWebAPIRequest } = require('../util/util');

module.exports = (req, res)=> {
    const cookie = "MUSIC_U=cee3f4696655e8269b09d611e16e347542f3f4afc6fee4589b1af9203373679b8e53350f7fd9eae136f8b2127dc6e3dec26025343d5dddac165a01459c57e6992c82fdc20da7ba58bf122d59fa1ed6a2";
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


