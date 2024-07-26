import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import PostCard from "../components/PostCard";

const UserPostPage = () => {
    const { userId } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await appwriteService.getPostByUser(userId);
            if (response) {
                setPosts(response.documents);
            }
        };

        fetchPosts();
    }, [userId]);

    return (
        <div className="w-full py-8">
            <Container>
                <h1 className="text-2xl text-white font-bold mb-8">User's Posts</h1>
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
};

export default UserPostPage;
