const text = [
    {
        "mainMenu":[
`👻 Tonshort BOT 👻

You can shorter your link 

or set 301 redirect to your \`.ton\` / \`.adnl\` domain here. 

`,
`*Your Domain : *`,
`
{You don't have any domain yet}`
        ],
        "register":[
            `is now avable`
        ],
        "domain":[
            `Domain management`,
            `Path`,
            `Ln Address`,
            `Nostr Address`,
            `Redirect address`,
            `Registed Time`,
            `🍺Update success !`
        ],
        "domainList":[
            `My Domains`,
            `⚠️ Please confirm this delete action`,
            `This action will wipe`,
            `from hiddenproxy`,
            `You will be no longer own the subdomain/path `,
            `Deleted success !`

        ],
        "placeHolder":[
            `Please input the subdomain/path you want to register . Eg : rubin `,
            `Name already exsit`,
            `Please input your lighting network address by your wallet . Eg : xxx@getalby.com`,
            `Please input your redirect address . Support \`.adnl\` / \`.ron\` / IPV4 / IPV6 or anyother Http-address  Eg : abcdehelloworld.adnl`,
            `Please input link of your twitter or site .`,
            `Please input the domain you want to delete`
        ],
        'building':[
            `⚙ Function`,
            `is under building ...`,
            `Hiddenproxy is a open-source project , You can visit [github](https://github.com/Tonspay/Hiddenproxy-back-end)`
        ]
    }
]

const btn = [
    {
        "mainMenu":[
            `Register domain`,
            `Domain manager`,
            `Address book`
        ],
        "register":[
            `confirm registe`
        ],
        "domain":[
            `⚙Edit Ln Address`,
            `⚙Edit Nostr Address`,
            `⚙Edit Redirect`,
            `🛠Delete Domain`,
            `⚠️ Confirm Delete`
        ],
        "backAndClose":
        [
            `🏡 Menu`,
            `❎ Close`
        ]
    }
]

function backAndClose(lan)
{
    var raw = getBtn(lan);
    return [
        {
            "text":raw.backAndClose[0],
            "callback_data":"/menu"
        },
        {
            "text":raw.backAndClose[1],
            "callback_data":"/close"
        }
    ]
}

function mainMenuButton(lan)
{
    var raw = getBtn(lan)
    return [
        [
            {
                "text":raw.mainMenu[0],
                "callback_data":"/register_domain"
            },
        ],
        [
            {
                "text":raw.mainMenu[1],
                "callback_data":"/manage_domain"
            },
        ],
        [
            {
                "text":raw.mainMenu[2],
                "callback_data":"/address_book"
            },
        ],
        backAndClose(lan)
    ]
}

function registerConfirm(name,lan)
{
    var raw = getBtn(lan)
    return [
        [
            {
                "text":raw.register[0],
                "callback_data":`/register_confirm ${name}`
            },
        ],
        backAndClose(lan)
    ]
}

function domainManage(name,lan)
{
    var raw = getBtn(lan)
    return [
        [
            {
                "text":raw.domain[2],
                "callback_data":`/domain_edit_path ${name}`
            },
        ],
        [
            {
                "text":raw['domain'][3],
                "callback_data":`/deleted_domain ${name}`
            },
        ],
        backAndClose(lan)
    ]
}

function domainSelect(domains,lan)
{
    var raw = getBtn(lan)
    var ret =[];
    domains.forEach(d => {
        ret.push(
            [
                {
                    "text":d.name,
                    "callback_data":`/manage_domain ${d.name}`
                },
            ],
        )
    });
    ret.push(
        [
            {
                "text":raw['domain'][3],
                "callback_data":`/deleted_domain`
            },
        ],
    )
    ret.push(backAndClose(lan))
    return ret;
}


function domainDeleted(name,lan)
{
    var raw = getBtn(lan)
    return [
        [
            {
                "text":raw['domain'][4],
                "callback_data":`/deleted_domain_confirm ${name}`
            },
        ],
        backAndClose(lan)
    ]
}
function getText(lan)
{
    return text[0];
}

function getBtn(lan)
{
    return btn[0];
}

module.exports = {
    getText,
    getBtn,
    mainMenuButton,
    backAndClose,
    registerConfirm,
    domainManage,
    domainSelect,
    domainDeleted
}