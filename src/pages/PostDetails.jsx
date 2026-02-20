import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  // Fetch post and current user
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        setError("Failed to load post");
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setCurrentUser(data);
      } catch (error) {
        console.log("User not logged in");
      }
    };

    fetchPost();
    fetchCurrentUser();
  }, [id]);

  // ✅ HANDLE DELETE MUST BE INSIDE COMPONENT, HERE
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/posts/${id}`);
      navigate("/"); // Redirect to home after deletion
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete post");
    }
  };

  if (error) return <p>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <h4>{post.subtitle}</h4>

      {post.imageUrl && (
        <img
          src={`http://localhost:5000/${post.imageUrl}`}
          alt={post.title}
          width="300"
        />
      )}

      <p>{post.content}</p>
      <p><strong>Author:</strong> {post.author?.username}</p>

      {currentUser && post.author?._id === currentUser._id && (
        <div>
          <button onClick={() => navigate(`/posts/${post._id}/edit`)}>
            Edit
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
