/**
 * This is the core server of .well-known transfer
 */
require('dotenv').config();
var querystring = require('querystring');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const core = require("../../utils/core")
const cors = require('cors');

const auth = require("./middleware/auth");
// app.use(auth.auth);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.listen(process.env.PORT, async function() {
  console.log('https-server start')
})
app.get('/', async function(req, res) {
    res.send({
        "code":200,
        "data":"pong"
    })
})

app.get('/ping', async function(req, res) {
    res.send({
        "code":200,
        "data":"pong"
    })
})

app.get('/:path', async function(req, res) {
    try{
        var s = await core.getRecord(req.params.path)
        res.redirect(s)
    }catch(e)
    {
        console.log(e);
            res.send({
            "code":500,
            "data":"internal error"
        });
    }
})

app.post('/newPath/:path',auth.auth ,async function(req, res) {
    try{
        var s = await core.newRecord(res.locals.auth.uid,req.params.path,req.body.redirect)
        res.send({
            "code":200,
            "data":s
        });
    }catch(e)
    {
        console.log(e);
            res.send({
            "code":500,
            "data":"internal error"
        });
    }
})

async function init()
{

}

module.exports = {
    init
}