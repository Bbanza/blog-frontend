import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/api/posts");
        console.log("API RESPONSE:", response.data);
        console.log("TYPE OF DATA:", typeof response.data);

        // Ensure posts is an array before setting
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else if (Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
        } else {
          console.warn("Backend returned unexpected data format", response.data);
          setError("Posts are not available or backend returned wrong data format.");
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <h2>Loading posts...</h2>;

  if (error) return <h2>{error}</h2>;

  if (!Array.isArray(posts) || posts.length === 0)
    return <h2>No posts available.</h2>;

  return (
    <div className="home-container">
      <h2 className="home-title">All Blog Posts</h2>
      <div className="posts-grid">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} width="200" />
            )}
            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              {post.subtitle && <h4 className="post-subtitle">{post.subtitle}</h4>}
              <p className="post-text">{post.content?.substring(0, 100)}...</p>
              <p className="post-author">
                <strong>Author:</strong> {post.author?.username || "Unknown"}
              </p>
              <Link to={`/posts/${post._id}`} className="read-more-link">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;