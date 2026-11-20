
import { useParams, useNavigate } from "react-router";

function TicketDetails({ tickets }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const ticket = tickets.find(
        (ticket) => String(ticket.id) === id
    );

    if (!ticket) {
        return (
            <div className="ticket-details">
                <h1>Ticket Not Found</h1>
                <button onClick={() => navigate("/tickets")}>
                    Back to Tickets
                </button>
            </div>
        );
    }

    return (
        <div className="ticket-details">
            <button onClick={() => navigate("/tickets")}>
                ← Back to Tickets
            </button>

            <h1>{ticket.title}</h1>

            <p>{ticket.description}</p>

            <div className="ticket-information">
                <p><strong>Category:</strong> {ticket.category}</p>
                <p><strong>Priority:</strong> {ticket.priority}</p>
                <p><strong>Status:</strong> {ticket.status}</p>
                <p>
                    <strong>Created:</strong>{" "}
                    {new Date(ticket.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}

export default TicketDetails;
