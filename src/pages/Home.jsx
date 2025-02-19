import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-12 bg-white dark:bg-gray-900 text-center">
  <Container>
    <div className="flex flex-wrap justify-center">
      <div className="p-6 w-full max-w-3xl">
        <h1 className="text-8xl font-bold text-gray-900 dark:text-white hover:text-gray-800 dark:hover:text-gray-300 transition duration-300">
          Login to read posts
        </h1>
      </div>
    </div>
  </Container>
</div>

    
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
