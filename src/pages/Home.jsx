import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./Home.css"; // <- new CSS file

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get("/posts");
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">All Blog Posts</h2>
      <div className="posts-grid">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            {/* {post.imageUrl && (
              <img
                src={`http://localhost:5000/${post.imageUrl}`}
                alt={post.title}
                className="post-image"
              />
            )} */}
            {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} width="200" />
            )}

            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              {post.subtitle && <h4 className="post-subtitle">{post.subtitle}</h4>}
              <p className="post-text">{post.content.substring(0, 100)}...</p>
              <p className="post-author"><strong>Author:</strong> {post.author?.username}</p>
              <Link to={`/posts/${post._id}`} className="read-more-link">Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
