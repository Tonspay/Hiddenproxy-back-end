var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
//DB name
const mainDB = "hiddenproxy"

//Sheet name
const sUser = "users";
const sDomain = "domain";
const sPath = "path"
const sDns = "nameserver";
const sVIPApiKey = "vip_apikey"

//DB struct
const accountStruct = {
    id: 0,
    is_bot: false,
    first_name: '',
    last_name: '',
    username: '',
    language_code: '',
    createTime:0,
}

const domainStruct = {
    uid:0,
    name:"",
    tld:"",
    visit:"",
    forward:{
        ln:{},
        nostr:{},
        http:""
    },
    createTime:0,
}

function unique(arr) {
    var obj = {};
    return arr.filter(function(item, index, arr){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}

//working logic
async function newAccount(data)
{
    if((await getAccountById(data.id)).length > 0 )
    {
        return false;
    }
    const pool =  await MongoClient.connect(process.env.DB_HOST)
    var db =pool.db(mainDB);
    var ret = await db.collection(sUser).insertOne(data);
    await pool.close();
    return ret;
}
async function getAccountById(uid)
{
    const pool =  await MongoClient.connect(process.env.DB_HOST)
    var db =pool.db(mainDB);
    var ret = await db.collection(sUser).find({
        id:uid
    }).project({}).toArray();
    await pool.close();
    return ret;
}
async function newDomain(data)
{
    if((await getDomainByName(data.name)).length > 0 )
    {
        return false;
    }
    const pool =  await MongoClient.connect(process.env.DB_HOST)
    var db =pool.db(mainDB);
    var ret = await db.collection(sDomain).insertOne(data);
    await pool.close();
    return ret;
}
async function getDomain()
{
    const pool =  await MongoClient.connect(process.env.DB_HOST)
    var db =pool.db(mainDB);
    var ret = await db.collection(sDomain).find().project({}).toArray();
    await pool.close();
    return ret;
}
async function getDomainByName(name)
{
    const pool =  await MongoClient.connect(process.env.DB_HOST)
    var db =pool.db(mainDB);
    var ret = await db.collection(sDomain).find({
        name:name
    }).project({}).toArray();
    await pool.close();
    return ret;
}

async function getDomainByUid(uid)
{
    const pool =  await MongoClient.connect(process.env.DB_HOST)
    var db =pool.db(mainDB);
    var ret = await db.collection(sDomain).find({
        uid:uid
    }).project({}).toArray();
    await pool.close();
    return ret;
}

async function updateDomainForward(_id,data)
{
    const pool =  await MongoClient.connect(process.env.DB_HOST)
    var seed = pool.db(mainDB);
    var set = {
        forward:data
    }
    var ret = await seed.collection(sDomain).updateMany(
        {
            _id:_id
        },
        {
            "$set": set
        }
    );

    await pool.close();
    return ret;

}

async function verfiDomainOwning(uid,name)
{
    const pool =  await MongoClient.connect(process.env.DB_HOST)
    var db =pool.db(mainDB);
    var ret = await db.collection(sDomain).find({
        uid:uid,
        name:name
    }).project({}).toArray();
    await pool.close();
    if(ret.length>0)
    {
        return ret[0];
    }
    return false;
}

async function delDomain(name,uid)
{
    const pool =  await MongoClient.connect(process.env.DB_HOST)
    var seed = pool.db(mainDB);
    await seed.collection(sDomain).deleteMany({uid:uid.toString(),name:name});
    await pool.close();
    return true;

}


/**
 * Auth system for VIP-api-key
 * 
 * Authkey :: RandomKey :: APIKEY:UID+timestamp+Random(6) toString(36)
 */

async function getVIPApiKey(uid) {
    const pool = await MongoClient.connect(process.env.DB_HOST)
    var db = pool.db(mainDB);
    var ret = await db.collection(sVIPApiKey).find({
        uid: uid.toString()
    }).project({}).toArray();
    await pool.close();
    return ret;
}

async function getApiKeyVIP(key) {
    const pool = await MongoClient.connect(process.env.DB_HOST)
    var db = pool.db(mainDB);
    var ret = await db.collection(sVIPApiKey).find({
        key: key
    }).project({}).toArray();
    await pool.close();
    if (ret.length > 0) {
        return ret[0];
    } else {
        return false;
    }

}


async function newVIPApiKey(uid, data) {
    const pool = await MongoClient.connect(process.env.DB_HOST)
    var db = pool.db(mainDB);
    await db.collection(sVIPApiKey).insertOne({
        uid: uid.toString(),
        key: data,
        createTime: Date.now()
    });
    await pool.close();
    return true;
}

module.exports = {
    newAccount,
    getAccountById,
    newDomain,
    getDomainByName,
    getDomainByUid,
    unique,
    delDomain,
    getDomain,
    verfiDomainOwning,
    updateDomainForward,


    getVIPApiKey,
    getApiKeyVIP,
    newVIPApiKey
}

