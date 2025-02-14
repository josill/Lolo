import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-20 h-20 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
