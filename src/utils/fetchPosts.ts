interface PostsResponse {
  rss: {
    channel: {
      item: Post[];
    };
  };
}

const fetchPosts = async (urls: string[]): Promise<Post[] | undefined> => {
  try {
    const queryParams = urls
      .map((url) => `urls=${encodeURIComponent(url)}`)
      .join("&");
    const res = await fetch(`/api/fetchPosts?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Network response was not ok");
    const posts: Post[] = [];
    const data: PostsResponse[] = await res.json();
    data.map((feed) => {
      feed.rss.channel.item.map((post) => {
        if (post) posts.push(post);
      });
    });

    posts.sort((a, b) => {
      const dateA = new Date(a.pubDate);
      const dateB = new Date(b.pubDate);

      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        console.warn("Invalid date:", a.pubDate, b.pubDate);
        return 0;
      }

      return dateB.getTime() - dateA.getTime();
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return undefined;
  }
};

export default fetchPosts;
