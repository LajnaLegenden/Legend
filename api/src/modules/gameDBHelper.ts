const secret = "uq20a3369v4ba8h9lkrc4irsircdvd";
const clientID = "n6kfevm9xdaoju8x8i0tzz6dqts3q7";

import axios from 'axios'

export async function getTwitchAccessToken() {
    let res = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${secret}&grant_type=client_credentials`);
    return res.data;
}