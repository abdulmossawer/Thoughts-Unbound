import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage, userName }) {
  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700 p-4 transition-transform transform hover:scale-105">
        <div className="flex items-center mb-4">
          {/* <div className="mr-4">
            <img
              src="https://via.placeholder.com/50"
              alt={userName}
              className="rounded-full w-10 h-10"
            />
          // </div> */}
          <div>
            <h3 className="text-md font-semibold text-gray-900 dark:text-white">
              {userName}
            </h3>
          </div>
        </div>
        <div className="w-full flex justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
