const db = require("../../../utils/db");
const tg = require("../../../utils/tg");
const lan = require("../../../utils/lan")
const auth = require("../../../modules/auth/index")

async function menu(bot, uid, req, raw) {
    var text = lan.getText()

    const keys = await auth.getAuthKeyByUid(uid);
    var keyText = ``
    keys.forEach(e => {
        keyText += `\`${e.key}\`
`
    });

    var finalText = `${text['setting'][0]}

${text['setting'][6]} :

${keyText}
`;
    return await tg.tryBotSendMessage(bot, uid, finalText, {
        parse_mode: 'MarkDown',
        disable_web_page_preview: "true",
        reply_markup: JSON.stringify({
            inline_keyboard: lan.settingMenu()
        })
    });
}

async function newKeygen(bot, uid, req, raw) {
    var text = lan.getText()
    var newkey = await auth.newAuthKey(uid);
    if (newkey) {
        var finalText = `${text['keygenAlter'][0]} :
        
\`${newkey}\`

${text['keygenAlter'][1]}`
        return await tg.tryBotSendMessage(bot, uid, finalText, {
            parse_mode: 'MarkDown',
            disable_web_page_preview: "true",
            reply_markup: JSON.stringify({
                inline_keyboard: [lan.backAndClose()]
            })
        });
    } else {
        var finalText = `${text['keygenAlter'][2]}`
        return await tg.tryBotSendMessage(bot, uid, finalText, {
            parse_mode: 'MarkDown',
            disable_web_page_preview: "true",
            reply_markup: JSON.stringify({
                inline_keyboard: [lan.backAndClose()]
            })
        });
    }

}

module.exports = {
    menu,
    newKeygen
}