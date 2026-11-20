
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { LogOut, Ticket } from "lucide-react";

import Sidebar from "./components/Sidebar";
import AuthScreen from "./pages/AuthScreen";
import CreateTicket from "./pages/CreateTicket";
import AllTickets from "./pages/AllTickets";
import TicketDetails from "./pages/TicketDetails";
import Settings from "./pages/Settings";
import StaffManagement from "./pages/StaffManagement";

import "./App.css";

/* ===== DASHBOARD ===== */

function Dashboard({ tickets, profile }) {
  const total = tickets.length;

  const pending = tickets.filter(
    (ticket) => ticket.status === "Pending"
  ).length;

  const inProgress = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolved = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  const recentTickets = [...tickets].reverse().slice(0, 5);

  return (
    <div className="dashboard-page">
      <section className="welcome-banner">
        <div>
          <span className="welcome-label">YOUR WORKSPACE</span>
          <h1>
            Welcome back{profile.name ? `, ${profile.name}` : ""}!
          </h1>
          <p>Keep everything organized. Let's make support simple.</p>
        </div>

        <div className="welcome-icon">
          <Ticket size={52} strokeWidth={1.8} />
        </div>
      </section>

      {profile.name && profile.email && (
        <section className="dashboard-profile">
          <div className="profile-avatar">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3>{profile.name}</h3>
            <p>{profile.email}</p>
          </div>

          <a href="/settings" className="profile-edit-link">
            Edit profile
          </a>
        </section>
      )}

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Dashboard Overview</h2>
            <p>Here's what's happening in your workspace.</p>
          </div>
        </div>

        <div className="ticket-cards">
          <div className="ticket-card stat-total">
            <div className="stat-top">
              <span>Total Tickets</span>
              <div className="stat-icon">🎟️</div>
            </div>
            <p>{total}</p>
            <small>All submitted tickets</small>
          </div>

          <div className="ticket-card stat-pending">
            <div className="stat-top">
              <span>Pending</span>
              <div className="stat-icon">🕒</div>
            </div>
            <p>{pending}</p>
            <small>Waiting for attention</small>
          </div>

          <div className="ticket-card stat-progress">
            <div className="stat-top">
              <span>In Progress</span>
              <div className="stat-icon">📋</div>
            </div>
            <p>{inProgress}</p>
            <small>Currently being handled</small>
          </div>

          <div className="ticket-card stat-resolved">
            <div className="stat-top">
              <span>Resolved</span>
              <div className="stat-icon">✓</div>
            </div>
            <p>{resolved}</p>
            <small>Successfully completed</small>
          </div>
        </div>
      </section>

      <section className="quick-actions">
        <div>
          <h2>Quick Actions</h2>
          <p>What would you like to do today?</p>
        </div>

        <div className="quick-action-buttons">
          <a href="/create-ticket" className="action-primary">
            + Create New Ticket
          </a>

          <a href="/tickets" className="action-secondary">
            View All Tickets
          </a>
        </div>
      </section>

      <section className="recent-tickets">
        <div className="recent-heading">
          <div>
            <h2>Recent Tickets</h2>
            <p>Your latest submitted support requests.</p>
          </div>

          <a href="/tickets" className="view-all-link">
            View all →
          </a>
        </div>

        {recentTickets.length === 0 ? (
          <div className="dashboard-empty">
            <div className="empty-icon">🎟️</div>
            <h3>No tickets yet</h3>
            <p>
              Your workspace is ready. Create your first ticket to get started.
            </p>
            <a href="/create-ticket" className="action-primary">
              + Create your first ticket
            </a>
          </div>
        ) : (
          <div className="recent-ticket-list">
            {recentTickets.map((ticket) => (
              <a
                href={`/tickets/${ticket.id}`}
                className="recent-ticket-item"
                key={ticket.id}
              >
                <div className="recent-ticket-icon">🎟️</div>

                <div className="recent-ticket-info">
                  <h3>
                    {ticket.title || ticket.subject || "Untitled ticket"}
                  </h3>
                  <p>{ticket.category || "General support"}</p>
                </div>

                <span
                  className={`recent-status ${ticket.status
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {ticket.status}
                </span>

                <span className="recent-arrow">→</span>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ===== MAIN APP ===== */

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("deskflow-theme") || "light";
  });

  const [tickets, setTickets] = useState(() => {
    const savedTickets = localStorage.getItem("deskflow-tickets");
    return savedTickets ? JSON.parse(savedTickets) : [];
  });

  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("deskflow-profile");

    return savedProfile
      ? JSON.parse(savedProfile)
      : { name: "", email: "" };
  });


  const [accounts, setAccounts] = useState(() => {
    try {
      const savedAccounts = localStorage.getItem("deskflow-accounts");

      if (savedAccounts) {
        return JSON.parse(savedAccounts);
      }

      // Preserve an older account when upgrading the app.
      const oldAccount = localStorage.getItem("deskflow-demo-account");

      if (oldAccount) {
        const account = JSON.parse(oldAccount);

        const migratedAccount = {
          ...account,
          id: account.id || "admin-legacy",
          role: "admin",
          active: true,
        };

        localStorage.setItem(
          "deskflow-accounts",
          JSON.stringify([migratedAccount])
        );

        return [migratedAccount];
      }

      return [];
    } catch {
      return [];
    }
  });

  // Load the current user, or preserve an existing logged-in session.
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("deskflow-current-user");

    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }

    const wasAuthenticated =
      localStorage.getItem("deskflow-authenticated") === "true";

    if (wasAuthenticated) {
      const savedProfile = localStorage.getItem("deskflow-profile");
      const oldProfile = savedProfile
        ? JSON.parse(savedProfile)
        : { name: "", email: "" };

      return {
        ...oldProfile,
        id: "admin-legacy",
        role: "admin",
        active: true,
      };
    }

    return null;
  });

  useEffect(() => {
    localStorage.setItem("deskflow-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("deskflow-tickets", JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem("deskflow-accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "deskflow-current-user",
        JSON.stringify(currentUser)
      );
    }
  }, [currentUser]);

  function handleAuthenticated(user) {
    const loggedInUser = {
      ...user,
      role: user.role || "admin",
    };

    setCurrentUser(loggedInUser);
    try {
      const savedAccounts = JSON.parse(
        localStorage.getItem("deskflow-accounts") || "[]"
      );

      setAccounts(savedAccounts);
    } catch {
      setAccounts([]);
    }

    const userProfile = {
      name: loggedInUser.name,
      email: loggedInUser.email,
    };

    setProfile(userProfile);

    localStorage.setItem(
      "deskflow-profile",
      JSON.stringify(userProfile)
    );

    localStorage.setItem("deskflow-authenticated", "true");
  }

  function handleLogout() {
    localStorage.removeItem("deskflow-authenticated");
    localStorage.removeItem("deskflow-current-user");

    setCurrentUser(null);
    window.history.replaceState(null, "", "/");
  }

  function handleCreateTicket(newTicket) {
    setTickets((previousTickets) => [
      ...previousTickets,
      newTicket,
    ]);
  }

  function handleUpdateStatus(ticketId, newStatus) {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus }
          : ticket
      )
    );
  }

  function handleUpdateTicket(ticketId, updatedFields) {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, ...updatedFields }
          : ticket
      )
    );
  }

  function handleDeleteTicket(ticketId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmed) return;

    setTickets((previousTickets) =>
      previousTickets.filter((ticket) => ticket.id !== ticketId)
    );
  }

  function handleSaveProfile(newProfile) {
    setProfile(newProfile);

    localStorage.setItem(
      "deskflow-profile",
      JSON.stringify(newProfile)
    );

    setCurrentUser((previousUser) => {
      if (!previousUser) return previousUser;

      return {
        ...previousUser,
        name: newProfile.name,
        email: newProfile.email,
      };
    });
  }

  function handleAddStaff(newStaff) {
    const emailExists = accounts.some(
      (account) =>
        account.email.toLowerCase() === newStaff.email.toLowerCase()
    );

    if (emailExists) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const staffAccount = {
      id: `staff-${Date.now()}`,
      name: newStaff.name.trim(),
      email: newStaff.email.trim().toLowerCase(),
      password: newStaff.password,
      role: "staff",
      active: true,
    };

    setAccounts((previousAccounts) => [
      ...previousAccounts,
      staffAccount,
    ]);

    return { success: true };
  }

  function handleToggleStaff(staffId) {
    setAccounts((previousAccounts) =>
      previousAccounts.map((account) =>
        account.id === staffId && account.role === "staff"
          ? { ...account, active: !account.active }
          : account
      )
    );
  }

  return (
    <BrowserRouter>
      {!currentUser ? (
        <AuthScreen onAuthenticated={handleAuthenticated} />
      ) : (
        <div className="app-layout" data-theme={theme}>
          <Sidebar currentUser={currentUser} />

          <main className="main-content">
            <div className="workspace-topbar">
              <span>
                Signed in as{" "}
                <strong>
                  {currentUser.name || currentUser.email}
                </strong>
                {" · "}
                <strong>
                  {currentUser.role === "admin"
                    ? "Administrator"
                    : "Staff"}
                </strong>
              </span>

              <button
                onClick={handleLogout}
                className="logout-button"
              >
                <LogOut size={17} />
                Log out
              </button>
            </div>

            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    tickets={tickets}
                    profile={profile}
                  />
                }
              />

              <Route
                path="/create-ticket"
                element={
                  <CreateTicket onCreateTicket={handleCreateTicket} />
                }
              />

              <Route
                path="/tickets"
                element={
                  <AllTickets
                    tickets={tickets}
                    onUpdateStatus={handleUpdateStatus}
                    onDeleteTicket={handleDeleteTicket}
                    onUpdateTicket={handleUpdateTicket}
                  />
                }
              />

              <Route
                path="/tickets/:id"
                element={<TicketDetails tickets={tickets} />}
              />

              <Route
                path="/settings"
                element={
                  <Settings
                    theme={theme}
                    setTheme={setTheme}
                    tickets={tickets}
                    onSaveProfile={handleSaveProfile}
                  />
                }
              />

              <Route
                path="/staff"
                element={
                  currentUser.role === "admin" ? (
                    <StaffManagement
                      accounts={accounts}
                      onAddStaff={handleAddStaff}
                      onToggleStaff={handleToggleStaff}
                    />
                  ) : (
                    <div className="staff-access-denied">
                      <h2>Access restricted</h2>
                      <p>Only administrators can manage staff accounts.</p>
                    </div>
                  )
                }
              />
            </Routes>
          </main>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
