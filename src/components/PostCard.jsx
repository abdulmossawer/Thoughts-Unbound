import { Link } from "react-router-dom";
import  appwriteService  from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block">
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700 p-4 transition-transform transform hover:scale-105">
      <div className="w-full flex justify-center mb-4">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>
      <h2 className="text-2xl font-semibold  text-gray-900 dark:text-white">
        {title }
      </h2>
    </div>
  </Link>
  
  );
}

export default PostCard;
