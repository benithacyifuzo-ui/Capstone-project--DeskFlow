# DeskFlow – Helpdesk Ticket Management System

DeskFlow is a React-based helpdesk ticket management system designed to help users create, track, update, and manage support tickets through a simple and organized interface.

## Project Links

- **Live Demo:** [Open DeskFlow](https://capstone-project-deskflow.onrender.com)
- **GitHub Repository:** [View Source Code](https://github.com/benithacyifuzo-ui/Capstone-project--DeskFlow)

## Project Overview

Managing support requests can become difficult when tickets are not properly organized or tracked. DeskFlow provides a simple interface for managing support tickets, monitoring their progress, and keeping ticket information organized.

The project was developed as a frontend capstone project using React and browser LocalStorage for data persistence.

## Main Features

- **Dashboard:** Displays ticket statistics, including total, pending, in-progress, and resolved tickets.
- **Create Tickets:** Allows users to submit new support tickets.
- **View All Tickets:** Displays available tickets in one place.
- **Search and Filter:** Helps users find tickets by searching and filtering ticket information.
- **Ticket Details:** Allows users to view individual ticket information.
- **Edit Tickets:** Allows ticket information to be updated.
- **Update Ticket Status:** Tickets can be moved between different statuses.
- **Delete Tickets:** Allows tickets to be removed.
- **Settings:** Allows users to manage profile information and application preferences.
- **Theme Support:** Includes light and dark themes.
- **LocalStorage:** Saves application data in the browser so it can remain available after refreshing the page.
- **Staff Management:** Includes a staff management interface that is still being tested and refined.

## Application Screenshots

### Login Screen

![DeskFlow Login](screenshots/login.png)

### Dashboard

![DeskFlow Dashboard](screenshots/dashboard.png)

### All Tickets

![DeskFlow All Tickets](screenshots/all-tickets.png)

### Create Ticket

![DeskFlow Create Ticket](screenshots/create-ticket.png)

### Staff Management

![DeskFlow Staff Management](screenshots/staff-management.png)

### Settings

![DeskFlow Settings](screenshots/settings.png)

## Project Presentation

You can view the capstone presentation below:

[View DeskFlow Capstone Presentation (PDF)](presentation/DeskFlow_Capstone_Presentation.pdf)

## Technologies Used

- **React** – Building the user interface.
- **JavaScript** – Application functionality and logic.
- **HTML5** – Page structure.
- **CSS3** – Styling and responsive layouts.
- **Vite** – Development server and build tool.
- **React Router** – Navigation between application pages.
- **Lucide React** – Icons.
- **LocalStorage API** – Storing application data in the browser.
- **Git and GitHub** – Version control and project hosting.
- **Render** – Deploying the application.

## Pages and Navigation

DeskFlow includes the following main pages:

| Page             | Description                                         |
| ---------------- | --------------------------------------------------- |
| Login            | Provides the application entry screen.              |
| Dashboard        | Displays ticket statistics and recent tickets.      |
| Create Ticket    | Provides a form for creating new tickets.           |
| All Tickets      | Displays and manages available tickets.             |
| Ticket Details   | Shows detailed information about a selected ticket. |
| Settings         | Manages profile information and preferences.        |
| Staff Management | Provides a staff management interface.              |

## React Concepts and Browser APIs Used

During development, I worked with several React concepts and browser features:

- `useState` for managing application state.
- `useEffect` for handling side effects and saving data.
- React Router for navigation between pages.
- Component-based architecture for organizing the application.
- Props for passing information between components.
- LocalStorage for saving and retrieving application data.
- Conditional rendering for displaying different application states.

## Challenges and Solutions

| Challenge                              | Solution                                                         |
| -------------------------------------- | ---------------------------------------------------------------- |
| Managing ticket information            | Used React state to manage ticket data.                          |
| Keeping data after refreshing the page | Implemented LocalStorage to persist application data.            |
| Navigating between pages               | Used React Router to create application routes.                  |
| Managing different ticket statuses     | Added status updates and filtering functionality.                |
| Organizing the application             | Divided the project into reusable components and separate pages. |
| Creating a consistent design           | Used shared CSS styles and a consistent color palette.           |

## Getting Started

To run the project locally:

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

### 3. Open the Application

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## Project Structure

```text
DeskFlow/
│
├── public/
│
├── screenshots/
│   ├── login.png
│   ├── dashboard.png
│   ├── all-tickets.png
│   ├── create-ticket.png
│   ├── staff-management.png
│   └── settings.png
│
├── src/
│   ├── components/
│   │   └── Sidebar.jsx
│   │
│   ├── pages/
│   │   ├── AuthScreen.jsx
│   │   ├── CreateTicket.jsx
│   │   ├── AllTickets.jsx
│   │   ├── TicketDetails.jsx
│   │   ├── Settings.jsx
│   │   └── StaffManagement.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js
```

_Note: This is a simplified overview of the project structure._

## Data Storage and Security

DeskFlow currently uses the browser's LocalStorage API to store application data. This means data is saved in the browser being used and is not shared automatically between different users or devices.

The current authentication is a frontend demonstration. It is not a production-ready authentication system, and sensitive information such as passwords should not be stored in LocalStorage in a real application.

## Future Improvements

Some improvements that could be added in future versions include:

- Connecting the application to a backend API.
- Using a database to store tickets and user information.
- Implementing secure user authentication and authorization.
- Improving staff management functionality.
- Adding email notifications for ticket updates.
- Supporting multiple users and shared ticket management.
- Improving deployment and direct-route refresh support.

## Project Status

DeskFlow is a frontend capstone project. Its main ticket management features, dashboard, settings, and browser-based data persistence have been implemented. Some areas, including staff management and deployment routing, still require further testing and refinement.

## Author

Developed as a frontend development capstone project using React, JavaScript, HTML, and CSS.

## Acknowledgements

Thanks to the instructors and everyone who provided guidance and support throughout the development of this project.
