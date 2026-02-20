import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./PostForm.css";
import "./BlogPages.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    //const response = await api.post("/posts", formData);
    const response = await api.post("/posts", formData, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
      console.log("Post created:", response.data);
      navigate("/"); // redirect home
    } catch (err) {
      console.error("Failed to create post:", err.response?.data);
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="post-form-container">
      <h2 className="form-title">Create New Post</h2>
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
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button type="submit">Create Post</button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
