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
        const rawMedia = item["media:content"];
        if (rawMedia) {
          if (Array.isArray(rawMedia)) {
            item.mediaContent = rawMedia[0];
          } else {
            item.mediaContent = rawMedia;
          }

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
