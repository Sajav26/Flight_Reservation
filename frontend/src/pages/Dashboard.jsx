import { Link } from "react-router-dom";
import { 
    Plane,
    Ticket,
    Clock,
    MapPin,
    Search,
    ArrowRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="passenger-dashboard">
            <div className="dashboard-welcome">
                <div>
                    <span className="dashboard-label">PASSENGER PORTAL</span>

                    <h1>
                        Welcome, {user?.lastName || "Passenger"};
                    </h1>

                    <p>
                        Manage your account and prepare for your next journey.
                    </p>
                </div>

                <div className="welcome-icon">
                    <Plane size={55} />
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <Ticket size={25} />
                    <div>
                        <h3>0</h3>
                        <p>Total Bookings</p>
                    </div>
                </div>

                <div className="stat-crad">
                    <Plane size={25} />
                    <div>
                        <h3>0</h3>
                        <p>Upcoming Flights</p>
                    </div>
                </div>

                <div className="stat-card">
                    <Clock size={25} />
                    <div>
                        <h3>0</h3>
                        <p>Completed Triple</p>
                    </div>
                </div>
            </div>

            <section className="dashboard-section">
                <div className="section-title">
                    <div>
                        <h2>Quick Actions</h2>
                        <p>What would you like to do today?</p>
                    </div>
                </div>

                <div className="action-grid">
                    <Link to= "/flights" className="action-car">
                        <div className="action-icon">
                            <Search size={25} />
                        </div>

                        <h3>Search Flights</h3>
                        <p>Find available flights for your journey.</p>

                        <span>
                            Expiore Flights <ArrowRight size={16} />
                        </span>
                    </Link>

                    <div className="action-card unavailable">
                        <div className="action-card">
                            <Ticket size={25} />
                        </div>

                        <h3>My Bookings</h3>
                        <p>View and manage your flight reservations.</p>
                    </div>

                    <div className="action-card unavailable">
                        <div className="action-card">
                            <MapPin size={25} />
                        </div>

                        <h3>My Profile</h3>
                        <p>Manage your personal account information.</p>

                        <span>Coming soon</span>
                    </div>
                </div>
            </section>

            <section className="dashboard-notice">
                <Plane size={25} />
                <div>
                    <h3>Your next adventure is waiting</h3>
                    <p>
                        Flight search and reservation services will be available
                        when the flight management backend is implemented.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;