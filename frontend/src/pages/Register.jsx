import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

const Register = () => {
    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try{
            const response = await api.post("/auth/register", formdata);
            alert(response.data.message);
            navigate("/login")
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed. please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-icon">
                    <UserPlus size={30} />
                </div>

                <h1>Craete Passenger Account</h1>
                <p>Register to start yout journey with SkyBook.</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name</label>
                            <input 
                            type="text"
                            name="firstName"
                            placeholder="Enter a first Name"
                            value={formdata.firstName}
                            onChange={handleChange}
                            required 
                            />
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input 
                            type="text" 
                            name="lastName"
                            placeholder="Enter the Last Name"
                            value={formdata.lastName}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input 
                            type="email"
                            name="email"
                            placeholder="example@email.com"
                            value={formdata.email}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input 
                            type="tel" 
                            name="phone"
                            placeholder="0771223346"
                            value={formdata.phone}
                            onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input 
                            type="password" 
                            name="password"
                            placeholder="Minimum 8 Characters"
                            value={formdata.password}
                            onChange={handleChange}
                            minLength={8}
                            required
                            />
                        </div>

                        <button 
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading ? "Creating Account ...": "Creae Account"}
                        </button>
                    </div>
                </form>

                <p className="auth-switch">
                    Already have account? <Link to= "/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;