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
        res.redirect(redirectRouter(req,s))
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

function redirectRouter(req,path)
{
    if(!path || !(path?.length > 0))
    {
        return false;
    }
    let adnlCheck = path.split(".adnl");
    let tonCheck = path.split(".ton");
    if(
        (adnlCheck.length == 2 && adnlCheck[1]=='') || 
        (tonCheck.length == 2 && tonCheck[1]=='')
     )
     {

        var deviceAgent = req.headers["user-agent"].toLowerCase();
        var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
        if(agentID){
            // from mobile request . goto "tonsite://"
            return "tonsite://"+path
        }else{
            // from PC . goto "http://"
            return "http://"+path
        } 
     }else{
        return "http://"+path
     }
           
}

async function init()
{

}

module.exports = {
    init
}