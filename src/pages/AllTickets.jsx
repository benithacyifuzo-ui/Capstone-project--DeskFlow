
import { useNavigate } from "react-router";
import { useState } from "react";

function AllTickets({
    tickets,
    onUpdateStatus,
    onDeleteTicket,
    onUpdateTicket,
}) {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [editingTicket, setEditingTicket] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        priority: "Medium",
    });

    const filteredTickets = tickets.filter((ticket) => {
        const matchesSearch =
            (ticket.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (ticket.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (ticket.category || "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || ticket.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    function handleEdit(ticket) {
        setEditingTicket(ticket.id);

        setFormData({
            title: ticket.title || "",
            description: ticket.description || "",
            category: ticket.category || "",
            priority: ticket.priority || "Medium",
        });
    }

    function handleFormChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    }

    function handleSave(event) {
        event.preventDefault();

        if (!formData.title.trim() || !formData.description.trim()) {
            return;
        }

        onUpdateTicket(editingTicket, {
            ...formData,
            title: formData.title.trim(),
            description: formData.description.trim(),
            category: formData.category.trim(),
        });

        setEditingTicket(null);
    }

    function handleCancel() {
        setEditingTicket(null);
    }

    return (
        <div className="all-tickets">
            <h1>All Tickets</h1>
            <p>View and manage all submitted support requests.</p>

            <div className="filter-container">
                <label>Filter by status: </label>

                <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                >
                    <option value="All">All Tickets</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </div>

            {tickets.length === 0 ? (
                <div className="empty-state">
                    <h3>No tickets yet</h3>
                    <p>Your submitted tickets will appear here.</p>
                </div>
            ) : (
                <div className="ticket-list">
                    {filteredTickets.length === 0 && (
                        <p className="no-results">
                            No tickets match your search.
                        </p>
                    )}

                    {filteredTickets.map((ticket) => (
                        <div className="ticket-item" key={ticket.id}>
                            <div className="ticket-item-content">
                                <h3>
                                    <button
                                        className="ticket-title-button"
                                        onClick={() => navigate(`/tickets/${ticket.id}`)}
                                    >
                                        {ticket.title}
                                    </button>
                                </h3>

                                <p>{ticket.description}</p>

                                <small>
                                    {ticket.category} · {ticket.priority} Priority
                                </small>

                                <p>
                                    Created:{" "}
                                    {new Date(ticket.createdAt).toLocaleDateString()}
                                </p>

                                <label>Status: </label>

                                <select
                                    value={ticket.status}
                                    onChange={(event) =>
                                        onUpdateStatus(ticket.id, event.target.value)
                                    }
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>

                                <div className="ticket-actions">
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEdit(ticket)}
                                    >
                                        Edit Ticket
                                    </button>

                                    <button
                                        className="delete-button"
                                        onClick={() => onDeleteTicket(ticket.id)}
                                    >
                                        Delete Ticket
                                    </button>
                                </div>

                                {editingTicket === ticket.id && (
                                    <form className="edit-ticket-form" onSubmit={handleSave}>
                                        <h3>Edit Ticket</h3>

                                        <label>Ticket Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleFormChange}
                                            required
                                        />

                                        <label>Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleFormChange}
                                            required
                                        />

                                        <label>Category</label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleFormChange}
                                            required
                                        />

                                        <label>Priority</label>
                                        <select
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleFormChange}
                                        >
                                            <option value="Urgent">Urgent</option>
                                            <option value="Critical">Critical</option>
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>

                                        <div className="ticket-actions">
                                            <button type="submit" className="edit-button">
                                                Save Changes
                                            </button>

                                            <button
                                                type="button"
                                                className="cancel-edit-button"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>

                            <span className="ticket-status">{ticket.status}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AllTickets;
