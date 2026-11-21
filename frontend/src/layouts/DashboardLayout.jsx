import { Link, Outlet } from "react-router-dom";
import { LayoutDashboard, Search, Ticket, User } from "lucide-react";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
    return (
        <>
            <Navbar />

            <div className="dashboard-layout">
                <aside className="dashboard-sidebar">
                    <h3>Passenger Menu</h3>

                    <Link to = "/passenger/dashboard">
                        <LayoutDashboard size={19} />
                        Dashboard
                    </Link>

                    <Link to = "/flights">
                        <Search size={19} />
                        Search Flights
                    </Link>

                    <Link to= "/passenger/bookings" className="disable-linked">
                        <Ticket size={19} />
                        My Bookings
                    </Link>

                    <Link to = "/passenger/profile" className="disabled-linked">
                        <User size={19} />
                        My Profile 
                        <span className="coming-soon">Soon</span>
                    </Link>
                </aside>

                <section className="disboard-content">
                    <Outlet />
                </section>
            </div>
        </>
    );
}

export default DashboardLayout;