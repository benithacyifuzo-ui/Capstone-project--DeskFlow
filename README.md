# DeskFlow – Helpdesk Ticket Management System

## 1. Project Overview

DeskFlow is a web-based Helpdesk Ticket Management System developed using React. It is designed to help organizations manage support requests, track ticket progress, and organize support activities through a simple and user-friendly interface.

The application allows users to create, view, edit, search, and manage support tickets. It also includes dashboard statistics, user authentication, profile settings, and appearance preferences.

The current version is a frontend application that uses browser LocalStorage to store data.

## 2. Project Objectives

The main objectives of DeskFlow are to:

- Simplify the process of creating and managing support tickets.
- Make it easier to monitor ticket progress and status.
- Provide a dashboard for viewing important ticket statistics.
- Allow users to manage their profiles and preferences.
- Provide an organized and user-friendly interface.
- Explore role-based access and staff management.

## 3. Technologies Used

| Technology   | Purpose                                |
| ------------ | -------------------------------------- |
| React.js     | Building the user interface            |
| JavaScript   | Application functionality and logic    |
| HTML5        | Structuring the application            |
| CSS3         | Styling and responsive design          |
| React Router | Navigation between application pages   |
| Lucide React | Icons                                  |
| Vite         | Development environment and build tool |
| LocalStorage | Saving application data in the browser |

## 4. Features Implemented

### Dashboard

- Displays total tickets.
- Shows pending, in-progress, and resolved tickets.
- Displays recent tickets.
- Provides quick navigation to important actions.

### Ticket Management

- Create new support tickets.
- View all available tickets.
- View individual ticket details.
- Edit ticket information.
- Update ticket status.
- Delete tickets with confirmation.
- Search tickets by title, description, and category.
- Filter tickets by status.

### User Authentication

- Welcome screen.
- User registration.
- User login.
- Logout functionality.
- Basic administrator and staff role handling.

### Settings

- Update profile information.
- Change between light and dark themes.
- Save preferences.
- Set a default ticket priority.

### Staff Management

- Staff account management interface.
- Add staff accounts.
- View staff accounts.
- Activate and deactivate staff accounts.

_Note: Staff management is part of the current development work and should be tested before being considered fully complete._

## 5. Application Pages

DeskFlow includes the following main pages:

- **Dashboard:** Displays ticket statistics and recent activities.
- **Create Ticket:** Allows users to submit new support requests.
- **All Tickets:** Displays and manages support tickets.
- **Ticket Details:** Shows individual ticket information and allows updates.
- **Settings:** Allows users to manage their profile and application preferences.
- **Staff Management:** Provides an interface for managing staff accounts.
- **Authentication Screen:** Handles registration and login.

## 6. APIs and React Concepts Used

### Browser LocalStorage API

LocalStorage is used to store application data in the browser, including:

- Ticket information.
- User profile information.
- Registered accounts.
- Theme preferences.
- Application settings.

This allows saved data to remain available after refreshing the page.

### React Hooks

- `useState`: Manages application state, including tickets, profiles, and themes.
- `useEffect`: Handles side effects such as saving data to LocalStorage.

### React Router

Used to navigate between different pages without reloading the entire application.

**Important:** The current version does not use an external backend API. LocalStorage is a browser storage API, not a server-side database.

## 7. Challenges and Solutions

During development, several challenges were encountered:

| Challenges                                              | Solutions                                                              |
| ------------------------------------------------------- | ---------------------------------------------------------------------- |
| Managing ticket information across different components | Used React state and reusable component structures.                    |
| Losing data after refreshing the browser                | Implemented LocalStorage persistence.                                  |
| Navigating between different pages                      | Integrated React Router.                                               |
| Updating ticket information correctly                   | Created functions for editing tickets and updating their status.       |
| Managing light and dark themes                          | Implemented theme state and saved the selected theme in LocalStorage.  |
| Organizing the application structure                    | Divided the application into reusable components and separate pages.   |
| Handling user roles                                     | Introduced role-based interface handling for administrators and staff. |

## 8. Getting Started

### Requirements

- Node.js
- npm
- Visual Studio Code or another code editor.

### Running the Project

1. Open the DeskFlow project folder in Visual Studio Code.
2. Open the integrated terminal.
3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in the terminal in your browser.

## 9. Project Structure

The project is organized into components and pages to make the code easier to manage and maintain.

```text
deskflow/
│
├── public/
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

## 10. Future Improvements

Future versions of DeskFlow could include:

- Develop a backend API.
- Integrate a database such as MySQL.
- Implement secure authentication and authorization.
- Allow administrators to assign tickets to specific staff members.
- Develop separate dashboards for administrators and staff.
- Introduce an activity log to track ticket creation and updates.
- Add email notifications for ticket updates.
- Generate reports and analytics.
- Enable data sharing across multiple devices and users.

## 11. Current Limitations

- The application currently operates as a frontend-only system.
- Data is stored in the browser's LocalStorage.
- Data is not automatically shared between different computers or browsers.
- Authentication is a demonstration and is not suitable for production use.
- A backend and database are required for secure, centralized data management.

## 12. Credits

DeskFlow was developed using the following technologies and learning resources:

- **React:** User interface development.
- **Vite:** Development and build tooling.
- **React Router:** Page navigation.
- **Lucide React:** Interface icons.
- **MDN Web Docs:** Web development documentation and reference.
- **React Documentation:** React learning and reference.

Additional credit should be given to any instructors, tutorials, or learning resources that contributed to the development of this project.

## 13. Project Status

DeskFlow is currently a frontend development project. Its core ticket management functionality, dashboard, authentication interface, and settings have been developed. Additional features, including staff management and role-based functionality, are being tested and refined.

---

**DeskFlow – Making Support Ticket Management Simpler and More Organized.**
