import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";

const MERCURY_API_ROUTE =
  "https://uptime-mercury-api.azurewebsites.net/webparser";

const fetchCleanArticleContent = async (url: string): Promise<string> => {
  const response = await fetch(MERCURY_API_ROUTE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch article content: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("data", JSON.stringify(data));
  return data.content;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (typeof url !== "string") {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const cleanedContent = await fetchCleanArticleContent(url);

    res.status(200).json({
      content: cleanedContent,
    });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
