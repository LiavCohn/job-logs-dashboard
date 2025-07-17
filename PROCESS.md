# Process & Design Documentation

## Architecture and Key Design Choices

### Overview
This project is a full-stack web application for job log analysis, consisting of a Node.js/Express backend with MongoDB, and a React (Vite) frontend using Material-UI and Recharts.

### Backend
- **Node.js + Express**: Chosen for rapid API development and easy integration with MongoDB.
- **MongoDB**: Used for flexible storage of job log data, supporting complex queries and analytics.
- **API Endpoints**:
  - Fetch job logs with filtering, pagination, and sorting.
  - Analytics endpoints for averages, deltas, and outliers.
  - AI chat endpoint that proxies requests to Groq’s OpenAI-compatible API.
- **Environment Variables**: Sensitive data (like API keys) is managed via `.env` files and never committed to version control.
- **Data Import**: A script (`importData.js`) loads job log data from a JSON file into MongoDB.

### Frontend
- **React 18 + Vite**: For fast development, hot reloading, and modern React features.
- **Material-UI**: Provides a consistent, responsive, and accessible UI.
- **Recharts**: Used for interactive and customizable data visualizations.
- **Axios**: For HTTP requests to the backend.
- **React Router**: For navigation between dashboard and AI chat assistant.
- **State Management**: Local state and React hooks manage filters, pagination, and UI state.
- **Responsiveness**: Layouts and components are designed to work well on both desktop and mobile.

### Key Design Choices
- **Separation of Concerns**: Clear split between backend (data/API) and frontend (UI/UX).
- **Filter-Driven Data**: All dashboard metrics and charts update based on active filters for a dynamic user experience.
- **Global vs. Filtered Charts**: Added a global charts section to show unfiltered trends, while main dashboard charts reflect current filters.
- **Error Handling & Loading States**: Both backend and frontend provide user feedback for loading and error conditions.
- **Security**: API keys and sensitive data are never exposed in the codebase or version control.

---

## AI Prompts and Iterations

### AI Chat Assistant
- **Prompting**: The backend `/api/chat` endpoint forwards user questions and job log context to Groq’s API using OpenAI-compatible prompts.
- **Prompt Design**: Prompts are structured to provide relevant job log context and clarify the user’s question, e.g.:
  - "Given the following job logs, answer the user’s question: ..."
- **Iterations**:
  - Initial prompts were simple, but were refined to include more context and clarify the expected answer format.
  - Adjusted prompt length and context window to balance response quality and API limits.
  - Added user instructions to clarify what kind of questions the AI can answer (e.g., trends, outliers, summaries).

### Dashboard & Metrics
- **Delta Explanation**: Iterated on the UI and documentation to clarify what "delta" means in the context of job logs.
- **Chart Y-Axis Formatting**: Improved prompts and code to format large numbers in a compact, readable way (e.g., 1K, 1M).

---

## Use of AI Tools During the Task

- **Code Generation & Refactoring**: Used AI (Cursor) to scaffold components, generate boilerplate, and refactor code for clarity and efficiency.
- **Prompt Engineering**: Iteratively refined AI prompts for the chat assistant, testing different phrasings and context strategies.
- **Debugging & Best Practices**: Asked AI for help with React hooks, pagination logic, error handling, and best practices for data fetching and UI/UX.
- **Documentation**: Used AI to draft and polish documentation, including this PROCESS.md and the main README.
- **Naming & Structure**: Consulted AI for suggestions on naming conventions, file structure, and project organization.

---
