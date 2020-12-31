import { SteamApi } from './steamApi'

export async function getSteamProfileFromId(id: string) {
    return await SteamApi.getPlayerSummaries(id)
}