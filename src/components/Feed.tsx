import React, { useState } from "react";
import FeedCard from "./FeedCard";
import EditFeedCard from "./EditFeedCard";

interface FeedProps {
  feed: Feed;
  onEdit: (originalLink: string, feed: Feed) => void;
  onDelete: (feed: Feed) => void;
}

function Feed({ feed, onEdit, onDelete }: FeedProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newFeed, setNewFeed] = useState<Feed>({
    name: feed.name,
    link: feed.link,
    color: feed.color,
  });

  if (isEditing)
    return (
      <EditFeedCard
        feed={newFeed}
        setFeed={setNewFeed}
        onCancel={() => setIsEditing(false)}
        onSave={() => {
          onEdit(feed.link, newFeed);
          setIsEditing(false);
        }}
      />
    );
  else
    return (
      <FeedCard
        feed={feed}
        onEdit={() => setIsEditing(true)}
        onDelete={onDelete}
      />
    );
}

export default Feed;
