import { Link, useNavigate } from "react-router-dom";
import { Plane, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <Plane size={27} />
        <span>SkyBook</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="/#about">About</a>
        <a href="/#services">Services</a>

        {isAuthenticated ? (
          <>
            <Link to="/passenger/dashboard">
              Dashboard
            </Link>

            <span className="nav-user">
              <UserCircle size={18} />
              {user?.firstName}
            </span>

            <button className="nav-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="nav-register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;