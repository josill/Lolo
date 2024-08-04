import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white text-3xl font-extrabold" href="/">
          Lolo
        </Link>
        <div>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className="text-white hover:text-gray-100 font-medium transition duration-300 ease-in-out"
              >
                Posts
              </Link>
            </li>
            <li>
              <Link
                href="/feeds"
                className="text-white hover:text-gray-100 font-medium transition duration-300 ease-in-out"
              >
                Feeds
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
