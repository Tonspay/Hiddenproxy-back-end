const db = require("../../utils/db");

const MAX_KEY_LENGTH = 5;

const md5 = require('js-md5');

const uuid = require('uuid');

const VIPApiKeyStruct = {
    uid: "",
    key: "", //RandomKey :: APIKEY:UID+timestamp+Random(6) toString(36)
    createTime: 0,
}

/**
 * VIP auth system
 */

function keygen(uid) {
    return md5("AK" + uid.toString(36) + Date.now().toString(36) + (Number((Math.random() * Math.pow(10, 6)).toFixed(0))).toString(36));
}

async function keyLengthCheck(uid) {
    if ((await getAuthKeyByUid(uid)).length >= MAX_KEY_LENGTH) {
        return false;
    } else {
        return true;
    }
}

async function newAuthKey(uid) {
    if (await keyLengthCheck(uid)) {
        const key = keygen(uid)
        await db.newVIPApiKey(uid, key)
        return key;
    }
}

async function getAuthKeyByKey(key) {
    return db.getApiKeyVIP(key)
}

async function getAuthKeyByUid(uid) {
    return db.getVIPApiKey(uid)
}



module.exports = {
    keygen,
    newAuthKey,
    getAuthKeyByKey,
    getAuthKeyByUid,

}