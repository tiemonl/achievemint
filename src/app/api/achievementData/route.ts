export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const url = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001?${searchParams.toString()}`;
    const data = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return Response.json(await data.json());
}