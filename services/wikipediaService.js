import axios from "axios";
import * as cheerio from "cheerio";

async function searchWikipedia(query, maxLines = 5) {
  try {
    const apiURL = "https://en.wikipedia.org/w/api.php";

    const response = await axios.get(apiURL, {
      params: {
        action: "query",
        list: "search",
        srsearch: query,
        format: "json",
      },
    });

    if(!response.data.query.search.length) {
        throw new Error("No results found");
    }

    const title = response.data.query.search[0].title;
    const pageURL = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

    const pageResponse = await axios.get(pageURL);

    const $ = cheerio.load(pageResponse.data);

    const fullText = $("p").text();

    const lines = fullText.split("\n").slice(0, maxLines);

    return {
        content: lines.join("\n"),
    }

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default searchWikipedia
