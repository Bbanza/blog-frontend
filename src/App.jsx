import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreatePost from './pages/CreatePost';
import SinglePost from './pages/SinglePost';
import PostDetails from './pages/PostDetails';
import EditPost from './pages/EditPost';
import MyPosts from './pages/MyPosts';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/edit-post/:id" element={<EditPost />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
