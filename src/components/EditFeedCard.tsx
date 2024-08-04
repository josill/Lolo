import React from "react";
import ColorPicker from "./ColorPicker";

interface EditFeedCardProps {
  feed: Feed;
  setFeed: (feed: Feed) => void;
  onCancel: () => void;
  onSave: (feed: Feed) => void;
}

function EditFeedCard({ feed, setFeed, onCancel, onSave }: EditFeedCardProps) {
  const handleColorChange = (color: string) => {
    setFeed({ ...feed, color });
  };

  return (
    <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg shadow p-4 transition-transform transform hover:scale-105">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(feed);
        }}
        className="w-full flex justify-between items-center"
      >
        <div className="flex flex-col gap-y-4 w-2/3">
          <input
            type="text"
            value={feed.name}
            onChange={(e) => setFeed({ ...feed, name: e.target.value })}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="url"
            value={feed.link}
            onChange={(e) => setFeed({ ...feed, link: e.target.value })}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <ColorPicker color={feed.color} onChange={handleColorChange} />
        </div>
        <div className="flex flex-col gap-y-4">
          <button
            type="submit"
            className="bg-green-500 text-white rounded-full py-2 px-4 hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            type="button"
            className="text-red-500 border-2 border-red-500 rounded-full py-2 px-4 hover:bg-red-500 hover:text-black"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditFeedCard;
