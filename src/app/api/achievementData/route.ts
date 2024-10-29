export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);

    const url1 = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001?${searchParams.toString()}&key=${process.env.STEAM_SECRET}`;
    const url2 = `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?${searchParams.toString()}&key=${process.env.STEAM_SECRET}`;

    try {
        const [response1, response2] = await Promise.all([
            fetch(url1, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            fetch(url2, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        ]);

        const data1 = await response1.json();
        const data2 = await response2.json();

        return Response.json({
            response1: data1,
            response2: data2
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return Response.json({ error: 'An error occurred while fetching data' }, { status: 500 });
    }
}