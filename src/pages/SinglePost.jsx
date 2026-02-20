import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const SinglePost = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <h3>{post.subtitle}</h3>

      {post.imageUrl && (
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          style={{ width: '300px', marginTop: '10px' }}
        />
      )}

      <p style={{ marginTop: '20px' }}>{post.content}</p>
    </div>
  );
};

export default SinglePost;
