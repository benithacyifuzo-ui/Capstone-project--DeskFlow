
import {
    LayoutDashboard,
    Ticket,
    PlusCircle,
    Settings,
    Headset,
    Users,
} from "lucide-react";

import { NavLink } from "react-router";

function Sidebar({ currentUser }) {
    return (
        <aside className="sidebar">
            <div className="logo">
                <Headset size={28} />
                <h2>DeskFlow</h2>
            </div>

            <nav>
                <NavLink to="/">
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>

                <NavLink to="/tickets">
                    <Ticket size={20} />
                    All Tickets
                </NavLink>

                <NavLink to="/create-ticket">
                    <PlusCircle size={20} />
                    Create Ticket
                </NavLink>

                {currentUser?.role === "admin" && (
                    <NavLink to="/staff">
                        <Users size={20} />
                        Staff Management
                    </NavLink>
                )}

                <NavLink to="/settings">
                    <Settings size={20} />
                    Settings
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;
