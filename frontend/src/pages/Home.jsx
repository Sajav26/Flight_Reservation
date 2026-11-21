import { Link } from "react-router-dom";
import {
    Plane,
    Search,
    ShieldCheck,
    Clock,
    Globe
} from "lucide-react";

const Home = () => {
    return(
        <div>
            <section className="hero">
                <div className="hero-content">
                    <span className="hero-label">
                        YOUR JOURNEY STARTS HERE
                    </span>

                    <h1>
                        Explore the World
                        <br />
                        <span>Travel Without Limits.</span>
                    </h1>

                    <p>
                        Discover your next destination with simple and convenient
                        flight reservation experience.
                    </p>

                    <div className="hero-actions">
                        <Link to = "/register" className="primary-btn">
                            Gert Started
                        </Link>
                        
                        <Link to = "/login" className="secondary-btn">
                            Passenger Login
                        </Link>
                    </div>
                </div>
            </section>

            <section className="services-section" id="services">
                <div className="section-heading">
                    <span>OUR SERVICES</span>
                    <h2>Travel Made Simple</h2>
                    <p>Everything you need for a better travel experience.</p>
                </div>

                <div className="feature-grid">
                    <div className="feature-card">
                        <Search size={30} />
                        <h3>Flight Search</h3>
                        <p>Find Flights based on your destination and travel date.</p>
                    </div>

                    <div className="feature-card">
                        <ShieldCheck size={30} />
                        <h3>Secure Booking</h3>
                        <p>Enjoy secure and convenient reservation process.</p>
                    </div>

                    <div className="feature-card">
                        <Clock size={30} />
                        <h3>Easy Management</h3>
                        <p>Manage your travel plans from your passenger account.</p>
                    </div>

                    <div className="feature-card">
                        <Globe size={30} />
                        <h3>Explore Destinations</h3>
                        <p>Discover new destinations and plan your next journey.</p>
                    </div>
                </div>
            </section>

            <section className="about-section" id="about">
                <Plane size={35} />
                <h2>Start Your Journey With SkyBook</h2>
                <p>
                    Craete your passenger account and get ready to explore
                    our flight reservation services.
                </p>
                <Link to = "/register" className="primary-btn">
                    Create Account
                </Link>
            </section>
        </div>
    );
}

export default Home;