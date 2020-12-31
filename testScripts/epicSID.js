const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const { promisify } = require('util');
const got = require('got');
const { CookieJar } = require('tough-cookie');




let user_basic = '34a02cf8f4414e29b15921876da36f9a'
let pw_basic = 'daafbccc737745039dffe53d94fc76cf'

const sid = "aabc42ed2072436cb50e38ee7533bd74"

const searchParams = new URLSearchParams([
    ['sid', sid]
]);

(async() => {
    try {
        const cookieJar = new CookieJar();
        const setCookie = promisify(cookieJar.setCookie.bind(cookieJar));

        let res = await got('https://www.epicgames.com/id/api/set-sid', { cookieJar, searchParams });

        let res2 = await got('https://www.epicgames.com/id/api/csrf', { cookieJar });

        console.log(cookieJar)

        let cookies = await cookieJar.getCookies("https://www.epicgames.com/id/api/exchange/generate", { allPaths: false });
        console.log(cookies)
        let xsrf = "";
        for (let c of cookies) {
            if (c.key == "XSRF-TOKEN") xsrf = c.value;
        }

        let res3 = await got("https://www.epicgames.com/id/api/exchange/generate", { method: "POST", headers: { "X-XSRF-TOKEN": xsrf } })
    } catch (error) {
        console.error(error)
    }

})();