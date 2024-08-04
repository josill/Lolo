import EditFeedCard from "@/components/EditFeedCard";
import Feed from "@/components/Feed";
import React, { useEffect, useState } from "react";

function Feeds() {
  const [feedFormOpen, setFeedFormOpen] = useState(false);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [newFeed, setNewFeed] = useState<Feed>({
    name: "",
    link: "",
    color: "",
  });

  useEffect(() => {
    const savedFeeds = JSON.parse(localStorage.getItem("feeds") || "[]");
    setFeeds(savedFeeds);
  }, []);

  const addFeed = (newFeed: Feed) => {
    if (feeds.find((feed) => feed.link === newFeed.link)) {
      alert("Feed already exists");
      return;
    }

    const updatedFeeds = [...feeds, newFeed];
    setFeeds(updatedFeeds);
    localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
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
          onSave={() => {
            addFeed(newFeed);
            setFeedFormOpen(false);
            setNewFeed({ name: "", link: "", color: "" });
          }}
          onCancel={() => {
            setFeedFormOpen(false);
            setNewFeed({ name: "", link: "", color: "" });
          }}
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
