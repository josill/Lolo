import Category from "@/components/Category";
import ErrorMessage from "@/components/Error";
import Loading from "@/components/Loading";
import Post from "@/components/Post";
import extractUniqueCategories from "@/utils/extractCategories";
import fetchPosts from "@/utils/fetchPosts";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
          {filteredPosts && filteredPosts.length > 0 ? (
            <h1 className="text-xl font-semibold">Today&apos;s cateogries:</h1>
          ) : (
            <h1 className="text-xl font-semibold">
              Add some feeds to start seeing posts
            </h1>
          )}
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
          <Post
            key={index}
            post={post}
            color={findColor(post.source?.url ?? "#000000")}
          />
        ))}
      </div>
    </div>
  );
}
