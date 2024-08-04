import { parseStringPromise } from "xml2js";

export const parseXmlToJson = async (xml: string) => {
  try {
    const result = await parseStringPromise(xml, {
      explicitArray: false,
      mergeAttrs: true,
    });

    const channelItems = result.rss.channel.item;
    if (Array.isArray(channelItems)) {
      channelItems.forEach((item: any) => {
        if (item["media:content"]) {
          item.mediaContent = item["media:content"];
          delete item["media:content"];
        }
      });
    }

    return result;
  } catch (error) {
    console.error("Error parsing XML:", error);
    throw new Error("Failed to parse XML");
  }
};
