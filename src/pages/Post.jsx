import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Post() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.authSlice.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          fetchComments(post.$id);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const fetchComments = async (postId) => {
    const result = await appwriteService.getCommentsByPost(postId);
    if (result) {
      setComments(result.documents);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      await appwriteService.createComment({
        postId: post.$id,
        userId: userData.$id,
        content: newComment,
        userName: userData.name, // Assuming userData has the userName
      });
      setNewComment(""); // Clear the input field
      fetchComments(post.$id); // Refresh comments list
      toast.success('Comment added successfully')
    } catch (error) {
        toast.error('Failed to comment')
    //   console.error("Failed to create comment", error);
    }
  };

  const deletePost = async () => {
    try {
      await appwriteService.deletePost(post.$id);
      appwriteService.deleteFile(post.featuredImage);
      navigate("/");
      toast.success('Post deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl text-white font-bold">{post.title}</h1>
        </div>
        <div className="browser-css text-white">{parse(post.content)}</div>
        
        <div className="mt-6">
          <h2 className="text-xl text-white font-semibold">Comments</h2>
          <div className="mt-4">
            {comments.map((comment) => (
              <div key={comment.$id} className="mb-4 p-4 border rounded-lg bg-gray-800">
                <h3 className="text-md text-white font-semibold">{comment.userName}</h3>
                <p className="text-white">{comment.content}</p>
              </div>
            ))}
          </div>
          {userData && (
            <div className="mt-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows="4"
                placeholder="Add a comment..."
              />
              <Button onClick={handleCommentSubmit} bgColor="bg-blue-500" className="mt-2">
                Post Comment
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}
