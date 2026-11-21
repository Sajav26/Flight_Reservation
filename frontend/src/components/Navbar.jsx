import { Link, useNavigate} from "react-router-dom";
import { Plane, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="brand">
                <Plane size={25} />
                <span>SkyBook</span>
            </Link>

            <div className="nav-links">
                <Link to = "/">Home</Link>
                <a href="#services">Services</a>
                <a href="#about">About</a>
            </div>

            <div className="nav-actions">
                {isAuthenticated ? (
                    <>
                        <Link to = "/passenger/dashboard" className="nav-user">
                            <UserRound size={18} />
                            {user?.firstNmae}
                        </Link>

                        <button className="btn-outline" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to = "/login" className="nav-login">
                            Login
                        </Link>

                        <Link to = "register" className="btn-primary">
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;