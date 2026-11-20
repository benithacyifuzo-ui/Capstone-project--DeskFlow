
import { useState } from "react";
import { UserPlus, Users, UserCheck, UserX } from "lucide-react";
import "./StaffManagement.css";

function StaffManagement({ accounts, onAddStaff, onToggleStaff }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const staffMembers = accounts.filter(
        (account) => account.role === "staff"
    );

    const activeStaff = staffMembers.filter(
        (staff) => staff.active !== false
    ).length;

    function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

        if (!name.trim() || !email.trim() || !password.trim()) {
            setMessage("Please complete all fields.");
            return;
        }

        if (password.length < 6) {
            setMessage("Password must contain at least 6 characters.");
            return;
        }

        const result = onAddStaff({ name, email, password });

        if (!result.success) {
            setMessage(result.message);
            return;
        }

        setName("");
        setEmail("");
        setPassword("");
        setMessage("Staff account created successfully!");
    }

    return (
        <div className="staff-page">
            <div className="staff-heading">
                <div>
                    <span className="staff-eyebrow">WORKSPACE ADMINISTRATION</span>
                    <h1>Staff Management</h1>
                    <p>Add and manage the people who support your customers.</p>
                </div>

                <div className="staff-heading-icon">
                    <Users size={30} />
                </div>
            </div>

            <div className="staff-stats">
                <div className="staff-stat-card">
                    <div className="staff-stat-icon">
                        <Users size={22} />
                    </div>
                    <div>
                        <span>Total Staff</span>
                        <h2>{staffMembers.length}</h2>
                    </div>
                </div>

                <div className="staff-stat-card">
                    <div className="staff-stat-icon active">
                        <UserCheck size={22} />
                    </div>
                    <div>
                        <span>Active Staff</span>
                        <h2>{activeStaff}</h2>
                    </div>
                </div>

                <div className="staff-stat-card">
                    <div className="staff-stat-icon inactive">
                        <UserX size={22} />
                    </div>
                    <div>
                        <span>Inactive Staff</span>
                        <h2>{staffMembers.length - activeStaff}</h2>
                    </div>
                </div>
            </div>

            <section className="staff-form-card">
                <div className="staff-card-heading">
                    <div className="staff-form-icon">
                        <UserPlus size={22} />
                    </div>
                    <div>
                        <h2>Add a Staff Member</h2>
                        <p>Create a login account for a new team member.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="staff-form">
                    <div className="staff-input-group">
                        <label htmlFor="staff-name">Full name</label>
                        <input
                            id="staff-name"
                            type="text"
                            placeholder="Enter staff member's name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div className="staff-input-group">
                        <label htmlFor="staff-email">Email address</label>
                        <input
                            id="staff-email"
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="staff-input-group">
                        <label htmlFor="staff-password">Temporary password</label>
                        <input
                            id="staff-password"
                            type="password"
                            placeholder="At least 6 characters"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <button type="submit" className="staff-add-button">
                        <UserPlus size={18} />
                        Add Staff Member
                    </button>
                </form>

                {message && (
                    <p className="staff-message" role="status">
                        {message}
                    </p>
                )}
            </section>

            <section className="staff-list-card">
                <div className="staff-list-heading">
                    <div>
                        <h2>Our Team</h2>
                        <p>Manage the accounts registered in your workspace.</p>
                    </div>
                    <span className="staff-count">{staffMembers.length} members</span>
                </div>

                {staffMembers.length === 0 ? (
                    <div className="staff-empty">
                        <Users size={38} />
                        <h3>No staff members yet</h3>
                        <p>Add your first staff member using the form above.</p>
                    </div>
                ) : (
                    <div className="staff-table-wrapper">
                        <table className="staff-table">
                            <thead>
                                <tr>
                                    <th>Staff Member</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {staffMembers.map((staff) => (
                                    <tr key={staff.id}>
                                        <td>
                                            <div className="staff-person">
                                                <div className="staff-avatar">
                                                    {staff.name.charAt(0).toUpperCase()}
                                                </div>
                                                <strong>{staff.name}</strong>
                                            </div>
                                        </td>

                                        <td>{staff.email}</td>

                                        <td>
                                            <span
                                                className={`staff-status ${staff.active === false ? "inactive" : "active"
                                                    }`}
                                            >
                                                {staff.active === false ? "Inactive" : "Active"}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className={`staff-toggle-button ${staff.active === false ? "activate" : "deactivate"
                                                    }`}
                                                onClick={() => onToggleStaff(staff.id)}
                                            >
                                                {staff.active === false ? "Activate" : "Deactivate"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}

export default StaffManagement;
