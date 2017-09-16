/**
 * Created by Administrator on 2017/9/17.
 */
const { createWebAPIRequest } = require('../util/util');

module.exports = (req, res) => {
    const cookie = req.get('Cookie') ? req.get('Cookie') : '';
    const data = {
        csrf_token: ''
    };
    const id = req.body.id;
    const offset = req.body.offset || 0;
    const limit = req.body.limit || 50;
    createWebAPIRequest(
        'music.163.com',
        `/weapi/v1/artist/${id}?offset=${offset}&limit=${limit}`,
        'POST',
        data,
        cookie,
        music_req => res.send(music_req),
        err => res.status(502).send('fetch error')
    )
};