import type { NextApiRequest, NextApiResponse } from "next";
import { parseXmlToJson } from "@/utils/xmlParser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
    const urlArray = Array.isArray(req.query.urls)
      ? req.query.urls
      : [req.query.urls as string];

    if (urlArray.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid request, urls query parameter required" });
    }

    const fetchAndParse = async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}`);
        }
        const xmlData = await response.text();
        return await parseXmlToJson(xmlData);
      } catch (error) {
        console.error(error);
        return { error: `Failed to fetch data from ${url}` };
      }
    };

    const jsonResults = await Promise.all(urlArray.map(fetchAndParse));

    res.status(200).json(jsonResults);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
