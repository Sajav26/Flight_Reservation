import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx"
import { LogIn } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", formData);

            const { token, user } = response.data;

            login(user, token);
            
            navigate("/passenger/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Login failed. Please check your details."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-age">
            <div className="auth-card login-card">
                <div className="auth-icon">
                    <LogIn size = {30} />
                </div>

                <h1>Welcome Back</h1>
                <p>Login to your SkyBook passenger account</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Enter the email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Enter the password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auht-submit"
                        disabled={loading}
                    >
                        {loading ? "Logging In ..." : "Login"}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't you have account? <Link to= "/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;