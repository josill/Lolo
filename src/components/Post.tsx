import truncateText from "@/utils/truncateText";
import formatDate from "@/utils/formatDate";
import { useRouter } from "next/router";
import React from "react";

interface PostProps {
  post: Post;
  color: string;
}

function Post({ post, color }: PostProps) {
  const encodedLink = encodeURIComponent(post.link);

  return (
    <a
      key={post.link}
      className="rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
      href={`/posts/${encodedLink}`}
      target="_blank"
    >
      <img
        src={
          post.mediaContent?.url ||
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
        }
        width={300}
        height={200}
        alt={post.title}
        className="w-full h-auto object-cover mb-2"
      />
      <div className="flex flex-col items-start justify-center gap-y-2 p-2">
        <h2 className="text-lg font-semibold mb-2">
          {truncateText(post.title, 50)}
        </h2>
        <div className="flex items-center gap-x-2">
          <div
            className={`rounded-full h-4 w-4`}
            style={{ backgroundColor: color }}
          ></div>
          <p>
            {/* {post.pubDate.split(" ")[1]}.{post.pubDate.split(" ")[2]}{" "}
            {post.pubDate.split(" ")[3]} */}
            {formatDate(post.pubDate)}
          </p>
        </div>
        {post.author && (
          <p>
            <span className="font-semibold">By: </span>
            {post.author}
          </p>
        )}
      </div>
    </a>
  );
}

export default Post;
