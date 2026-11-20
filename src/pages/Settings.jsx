import { useState } from "react";
import "./Settings.css";

function Settings({ theme, setTheme, tickets, onSaveProfile }) {
    const [profile, setProfile] = useState({
        name: "",
        email: ""
    });

    const [defaultPriority, setDefaultPriority] = useState(() => {
        return localStorage.getItem("deskflow-default-priority") || "Medium";
    });

    const [message, setMessage] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setProfile((previousProfile) => ({
            ...previousProfile,
            [name]: value
        }));
    }

    function handleSave(event) {
        event.preventDefault();

        onSaveProfile(profile);

        setProfile({
            name: "",
            email: ""
        });

        setMessage("Profile saved successfully!");
    }

    function handlePriorityChange(event) {
        const newPriority = event.target.value;

        setDefaultPriority(newPriority);

        localStorage.setItem(
            "deskflow-default-priority",
            newPriority
        );
    }

    return (
        <div className="settings-page">
            <div className="settings-heading">
                <h1>Settings</h1>
                <p>Manage your DeskFlow workspace preferences.</p>
            </div>

            {/* PROFILE SETTINGS */}
            <section className="settings-section">
                <h2>Profile Settings</h2>

                <p className="settings-description">
                    Update your personal workspace information.
                </p>

                <form onSubmit={handleSave}>
                    <div className="settings-field">
                        <label htmlFor="name">Full Name</label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={profile.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <label htmlFor="email">Email Address</label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={profile.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <button type="submit" className="save-settings-btn">
                        Save Changes
                    </button>

                    {message && (
                        <p className="settings-success">{message}</p>
                    )}
                </form>
            </section>

            {/* APPEARANCE SETTINGS */}
            <section className="settings-section appearance-section">
                <h2>Appearance</h2>

                <p className="settings-description">
                    Choose how DeskFlow looks on your screen.
                </p>

                <div className="theme-options">
                    <button
                        type="button"
                        className={`theme-option ${theme === "light" ? "active" : ""}`}
                        onClick={() => setTheme("light")}
                    >
                        <span className="theme-preview light-preview">
                            ☀️
                        </span>
                        <span>Light Mode</span>
                    </button>

                    <button
                        type="button"
                        className={`theme-option ${theme === "dark" ? "active" : ""}`}
                        onClick={() => setTheme("dark")}
                    >
                        <span className="theme-preview dark-preview">
                            🌙
                        </span>
                        <span>Dark Mode</span>
                    </button>
                </div>

                <p className="current-theme">
                    Current theme:{" "}
                    <strong>
                        {theme === "light" ? "Light Mode" : "Dark Mode"}
                    </strong>
                </p>
            </section>

            {/* TICKET PREFERENCES */}
            <section className="settings-section">
                <h2>Ticket Preferences</h2>

                <p className="settings-description">
                    Choose the default priority for new support tickets.
                </p>

                <div className="settings-field">
                    <label htmlFor="defaultPriority">
                        Default Ticket Priority
                    </label>

                    <select
                        id="defaultPriority"
                        value={defaultPriority}
                        onChange={handlePriorityChange}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>

                <p className="settings-success">
                    Your default priority is: {defaultPriority}
                </p>
            </section>
        </div>
    );
}

export default Settings;