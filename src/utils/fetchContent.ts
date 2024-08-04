const fetchContent = async (link: string) => {
  try {
    const res = await fetch(`/api/fetchPost?url=${encodeURIComponent(link)}`);
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return undefined;
  }
};

export default fetchContent;
