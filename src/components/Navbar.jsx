import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">BlogSite</Link>
      </div>

      <div className="navbar-right">
        {token ? (
          <>
            <Link to="/create-post" className="navbar-link">Create Post</Link>
            <Link to="/my-posts" className="navbar-link">My Posts</Link>
            <span className="navbar-user">Hello, {username}</span>
            <button className="navbar-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/signup" className="navbar-link">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;