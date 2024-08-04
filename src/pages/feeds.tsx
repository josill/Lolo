import EditFeedCard from "@/components/EditFeedCard";
import Feed from "@/components/Feed";
import fetchPosts from "@/utils/fetchPosts";
import React, { useEffect, useState } from "react";

function Feeds() {
  const [feedFormOpen, setFeedFormOpen] = useState(false);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [newFeed, setNewFeed] = useState<Feed>({
    name: "",
    link: "",
    color: "#000000",
  });

  useEffect(() => {
    const savedFeeds = JSON.parse(localStorage.getItem("feeds") || "[]");
    setFeeds(savedFeeds);
  }, []);

  const addFeed = async (newFeed: Feed): Promise<boolean> => {
    const res = await fetchPosts([newFeed.link]);
    if (!res) {
      alert("Invalid feed link");
      return false;
    }

    if (
      feeds.find(
        (feed) => feed.link === newFeed.link || feed.color === newFeed.color
      )
    ) {
      alert("Feed with same color or link already exists");
      return false;
    }

    const updatedFeeds = [...feeds, newFeed];
    setFeeds(updatedFeeds);
    localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
    return true;
  };

  const editFeed = (originalLink: string, editedFeed: Feed) => {
    const updatedFeeds = feeds.map((feed) =>
      feed.link === originalLink ? editedFeed : feed
    );

    setFeeds(updatedFeeds);
    localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
  };

  const deleteFeed = (feedToDelete: Feed) => {
    const updatedFeeds = feeds.filter(
      (feed) => feed.link !== feedToDelete.link
    );
    setFeeds(updatedFeeds);
    localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
  };

  const handleSave = async () => {
    const success = await addFeed(newFeed);
    if (!success) return;
    setFeedFormOpen(false);
    setNewFeed({ name: "", link: "", color: "" });
  };

  const handleCancel = () => {
    setFeedFormOpen(false);
    setNewFeed({ name: "", link: "", color: "" });
  };

  return (
    <div className="px-8">
      <div className="flex items-center justify-between my-8">
        <p className="text-lg font-semibold mb-4">Your feeds:</p>
        {!feedFormOpen && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
            onClick={() => setFeedFormOpen(true)}
          >
            Add Feed
          </button>
        )}
      </div>
      {feedFormOpen && (
        <EditFeedCard
          feed={newFeed}
          setFeed={setNewFeed}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <ul className="flex flex-col gap-y-4 mt-4">
        {feeds.map((feed) => (
          <Feed
            key={feed.link}
            feed={feed}
            onEdit={editFeed}
            onDelete={deleteFeed}
          />
        ))}
      </ul>
    </div>
  );
}

export default Feeds;
