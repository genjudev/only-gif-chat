const tenorApi = new URL(process.env.REACT_APP_TENOR_API_URL || "https://g.tenor.com/v1/"); 
const searchUrl = new URL("/v1/search", tenorApi)
console.log("PROCESSENV", process.env);

export const getTop8 = async () => {
    const params = new URLSearchParams([["q","excited"], ["limit", "8"], ["key", process.env.REACT_APP_TENOR_API_KEY || ""]])
    const url = searchUrl;
    url.search = params.toString();
    const res = await fetch(url);
    if(res.status !== 200) {
        console.error(res.status, "Error while fetching Gifs");
        return;
    }
    return await res.json();
}