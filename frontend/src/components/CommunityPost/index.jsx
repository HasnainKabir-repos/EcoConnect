import React from "react";

const Post = ({ community, user, text, createdAt }) => {
  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  };

  return (
    <>
      <div className="bg-white shadow-md rounded mb-4 p-4">
        <div className="flex flex-row items-center">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${getRandomColor()}`}
          ></div>
          <div className="text-teal-600 font-semibold text-lg">{community}</div>
        </div>

        <div className="flex flex-row items-center text-gray-700 text-sm mb-2">
          <div className="mr-2 font-bold">{user}</div>
          <div className="text-gray-500 text-sm ml-auto font-bold">
            {createdAt}
          </div>
        </div>

        <div className="text-gray-900">{text}</div>
      </div>
    </>
  );
};

export default Post;
