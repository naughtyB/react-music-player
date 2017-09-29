/**
 * Created by Administrator on 2017/9/27.
 */
const { createWebAPIRequest } = require('../util/util');


module.exports = (req, res) => {
    const cookie = req.get('Cookie') ? req.get('Cookie') : '';
    const id = parseInt(req.body.ids);
    const data = {
        // "id": id,
        c: JSON.stringify([{ id: id }]),
        ids: '[' + id + ']',
        csrf_token: ''
    };
    createWebAPIRequest(
        'music.163.com',
        '/weapi/v3/song/detail',
        'POST',
        data,
        cookie,
        music_req => {
            res.send(music_req)
        },
        err => res.status(502).send('fetch error')
    )
};
