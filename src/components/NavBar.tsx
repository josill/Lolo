import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-white text-3xl font-extrabold" href="/">
          Lolo
        </a>
        <div>
          <ul className="flex space-x-6">
            <li>
              <a
                href="/"
                className="text-white hover:text-gray-100 font-medium transition duration-300 ease-in-out"
              >
                Posts
              </a>
            </li>
            <li>
              <a
                href="/feeds"
                className="text-white hover:text-gray-100 font-medium transition duration-300 ease-in-out"
              >
                Feeds
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
