import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { Container, PostForm } from "../components";

export const  EditPost = () => {
  const [post, setPosts] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};
