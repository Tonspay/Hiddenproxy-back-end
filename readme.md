# Hiddenproxy .ton shortener 301 redirect system

This repo frok from [LNID-Router](https://github.com/LNIDprotocol/LNID-Router)

This repo is to build a simple URL redirect router for `.ton` domain system . Support both `.adnl` redirect and public `IPV4/V6` redirect.

You can try this system via [Tonshort Bot](https://t.me/tonshort_bot) . Or visit `hiddenproxy.ton` to try ths product

## More Details

Hiddenproxy currently support different functions :

- Anonymous link shorter
    - Website support (Recapture antiBot)
    - Random 8-world length subdomain or path

- Telegram Bot link shorter 
    - Telegram Bot support 
    - Restful Api support
    - Any length sudomain or path

- Request header response 
    - Desktop/Browser : `http://${redirect_path}`
    - Mobile : `tonsite://${redirect_path}`
    - Restful Request (Fetch/Wget) : `${redirect_path}` 