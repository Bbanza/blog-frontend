import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Home.css";
import "./BlogPages.css";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchMyPosts = async () => {
    try {
      const { data } = await api.get("/posts"); // fetch all posts
      const token = localStorage.getItem("token");

      // Filter posts by the logged-in user
      const myPosts = data.filter(
        (post) => post.author?._id === JSON.parse(atob(token.split('.')[1])).id
      );

      setPosts(myPosts);
    } catch (err) {
      console.error("Error fetching my posts:", err);
      setError("Failed to fetch your posts");
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Failed to delete post:", err);
      setError("Failed to delete post");
    }
  };

  return (
    <div>
      <h2>My Posts</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {posts.length === 0 && <p>You haven't created any posts yet.</p>}

      {posts.map((post) => (
        <div
          key={post._id}
          className="post-card"
          style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
        >
          <h3>{post.title}</h3>
          <h4>{post.subtitle}</h4>

          {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} width="200" />
            )}


          <p>{post.content.substring(0, 100)}...</p>

          <div style={{ marginTop: "10px" }}>
            <Link to={`/posts/${post._id}`} style={{ marginRight: "10px" }}>
              View
            </Link>
            <Link to={`/edit-post/${post._id}`} style={{ marginRight: "10px" }}>
              Edit
            </Link>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;