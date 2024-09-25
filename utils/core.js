const db = require("./db");
const api = require("./apis")
const tool = require("./tools")
const nt = require('nostr-tools')
async function getRecord(uname)
{
    var ret = await db.getDomainByName(uname);
    if(ret && ret.length > 0)
    {
        console.log(ret[0])
        return ret[0].forward.http
    }else{
        return false;
    }
}

async function newRecord(uid,uname,path)
{
    var domain = await db.verfiDomainOwning(uid,uname);
    if(domain)
    {
        var forward = domain.forward;
        forward['http'] = path
        await db.updateDomainForward(domain._id,forward);
        return true;
    }
    return false;
}

async function getNip05(uname)
{
    var ret = await db.getDomainByName(uname);
    if(ret && ret.length > 0)
    {
        ret[0].forward.nostr.raw = Buffer.from(ret[0].forward.nostr.raw,"base64").toString("utf-8")
        ret[0].forward.nostr.raw = JSON.parse(ret[0].forward.nostr.raw)
        return ret[0].forward.nostr
    }else{
        return false;
    }
}

async function newNip05(uid,uname,ln)
{
    var domain = await db.verfiDomainOwning(uid,uname);
    if(domain)
    {
        var forward = domain.forward;
        var nip05Data = {
            names:{
            }
        }
        nip05Data['names'][uname] = nt.nip19.decode(ln).data
        var data = 
        {
            uname:uname,
            link:ln,
            raw:Buffer.from(JSON.stringify(
                nip05Data
            )).toString("base64")
        }
        forward['nostr'] = data
        // console.log(data)
        if(data.raw)
        {
            await db.updateDomainForward(domain._id,forward);
            return true;
        }
    }
    return false;
}
module.exports = {
    getRecord,
    newRecord,
    getNip05,
    newNip05
}