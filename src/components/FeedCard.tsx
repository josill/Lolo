import truncateText from "@/utils/truncateText";
import React from "react";

interface FeedCardProps {
  feed: Feed;
  onEdit: (feed: Feed) => void;
  onDelete: (feed: Feed) => void;
}

function FeedCard({ feed, onEdit, onDelete }: FeedCardProps) {
  return (
    <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg shadow p-4 transition-transform transform hover:scale-105">
      <div className="flex items-center justify-start gap-x-4">
        <div
          className={`rounded-full h-4 w-4`}
          style={{ backgroundColor: feed.color }}
        ></div>
        <div className="flex flex-col">
          <strong className="block text-lg font-semibold">
            {truncateText(feed.name, 50)}
          </strong>
          <a
            href={feed.link}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            {truncateText(feed.link, 75)}
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onEdit(feed)}
          className="text-yellow-500 border-2 border-yellow-500 rounded-full py-2 px-4 hover:bg-yellow-500 hover:text-black"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(feed)}
          className="text-red-500 border-2 border-red-500 rounded-full py-2 px-4 hover:bg-red-500 hover:text-black"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default FeedCard;
