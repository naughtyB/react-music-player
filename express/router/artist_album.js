/**
 * Created by Administrator on 2017/9/17.
 */
const { createWebAPIRequest } = require('../util/util');

module.exports = (req, res) => {
    const cookie = req.get('Cookie') ? req.get('Cookie') : '';
    const id = req.body.id;
    const data = {
        offset: req.body.offset || 0,
        total: true,
        limit: req.body.limit || 30,
        csrf_token: ''
    };
    createWebAPIRequest(
        'music.163.com',
        `/weapi/artist/albums/${id}`,
        'POST',
        data,
        cookie,
        music_req => res.send(music_req),
        err => res.status(502).send('fetch error')
    )
};