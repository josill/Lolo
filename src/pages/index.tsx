import Category from "@/components/Category";
import ErrorMessage from "@/components/Error";
import Loading from "@/components/Loading";
import Post from "@/components/Post";
import extractUniqueCategories from "@/utils/extractCategories";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface PostsResponse {
  rss: {
    channel: {
      item: Post[];
    };
  };
}

// * It is not beautiful to keep this function here and usually this would be in the api folder but since I didn't want to spend too much time solving cors errors i just used the built in nextJs api folder to fetch the data * //
const fetchPosts = async (urls: string[]): Promise<Post[] | undefined> => {
  try {
    const queryParams = urls
      .map((url) => `urls=${encodeURIComponent(url)}`)
      .join("&");
    console.log("query params", queryParams);
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
        console.log(post);
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

export default function Home() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", urls],
    queryFn: () => fetchPosts(urls),
    staleTime: 1000 * 60 * 5,
    enabled: urls.length > 0,
  });

  useEffect(() => {
    const savedFeeds = JSON.parse(localStorage.getItem("feeds") || "[]");
    setFeeds(savedFeeds);
    setUrls(savedFeeds.map((feed: Feed) => feed.link));
  }, []);

  useEffect(() => {
    if (data && urls.length > 0) {
      const uniqueCategories = extractUniqueCategories(data);
      setCategories(uniqueCategories);
    }
  }, [data]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const filteredPosts = data?.filter(
    (post) =>
      selectedCategories.length === 0 ||
      (post.category &&
        post.category.some((cat) => selectedCategories.includes(cat._)))
  );

  const findColor = (link: string) => {
    return feeds.find((f) => f.link.split(".rss")[0] === link)?.color || "gray";
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage />;

  return (
    <div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Today's cateogries:</h1>
        </div>
        <div className="flex flex-wrap justify-start gap-2">
          {categories.map((category, index) => (
            <Category
              key={category}
              category={category}
              isSelected={selectedCategories.includes(category)}
              onClick={toggleCategory}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {filteredPosts?.map((post, index) => (
          <Post key={index} post={post} color={findColor(post.source.url)} />
        ))}
      </div>
    </div>
  );
}
