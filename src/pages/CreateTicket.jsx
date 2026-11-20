
import { useState } from "react";

function CreateTicket({ onCreateTicket }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState(() => {
        return localStorage.getItem("deskflow-default-priority") || "Medium";
    });
    const [success, setSuccess] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const newTicket = {
            id: crypto.randomUUID(),
            title,
            description,
            category,
            priority,
            status: "Pending",
            createdAt: new Date().toISOString()
        };

        onCreateTicket(newTicket);

        setTitle("");
        setDescription("");
        setCategory("");

        setPriority(
            localStorage.getItem("deskflow-default-priority") || "Medium"
        );

        setSuccess("Ticket created successfully!");
    }

    return (
        <div className="create-ticket">
            <h1>Create a New Ticket</h1>
            <p>Fill in the details below to submit a support request.</p>

            {success && <p>{success}</p>}

            <form onSubmit={handleSubmit}>
                <label>Ticket Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Enter ticket title"
                    required
                />

                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Describe your issue..."
                    rows="5"
                    required
                />

                <label>Category</label>
                <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    required
                >
                    <option value="">Select category</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Account Issues">Account Issues</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Other">Other</option>
                </select>

                <label>Priority</label>
                <select
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                    required
                >
                    <option value="">Select priority</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Critical">Critical</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <button type="submit">Submit Ticket</button>
            </form>
        </div>
    );
}

export default CreateTicket;
