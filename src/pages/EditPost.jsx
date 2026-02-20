import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import "./PostForm.css"; 
import "./BlogPages.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setTitle(data.title);
        setSubtitle(data.subtitle);
        setContent(data.content);
        setExistingImage(data.imageUrl || "");
      } catch (err) {
        setError("Failed to load post");
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("content", content);
      if (imageFile) formData.append("image", imageFile);

      await api.put(`/posts/${id}`, formData);

      navigate(`/posts/${id}`); // redirect to post details
    } catch (err) {
      console.error("Failed to update post:", err.response?.data);
      setError(err.response?.data?.message || "Failed to update post");
    }
  };

  return (
    <div className="post-form-container">
      <h2 className="form-title">Edit Post</h2>
      <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Subtitle (optional)"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {existingImage && (
          <div style={{ marginBottom: "10px" }}>
            <p>Existing Image:</p>
            <img
              src={`http://localhost:5000/${existingImage}`}
              alt="Existing"
              width="200"
            />
          </div>
        )}
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button type="submit">Update Post</button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  );
};

export default EditPost;
