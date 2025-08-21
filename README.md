# AI-First Quality Management System (QMS) Event Module

This project is a full-stack web application developed for the Round 3 evaluation. It is a provisional-level QMS module designed for a life science company, allowing users to create, track, and gain AI-powered insights on quality events.

---

## Technology Stack

| Category  | Technology                               |
| :-------- | :--------------------------------------- |
| Frontend  | React (Vite), Redux Toolkit, Axios       |
| Backend   | Python, FastAPI, SQLAlchemy              |
| Database  | SQLite                                   |
| AI Model  | Google Gemini 1.5 Flash                  |

---

## Setup Instructions

### Backend Setup

1.  **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a Python virtual environment:**
    ```bash
    # Create the environment
    python -m venv venv
    # Activate on Windows
    .\venv\Scripts\Activate.ps1
    ```

3.  **Install the required dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up your API Key:**
    -   Create a file named `.env` in the `backend` directory.
    -   Add your Google Gemini API key to this file:
        ```
        GEMINI_API_KEY="your_api_key_here"
        ```

### Frontend Setup

1.  **Navigate to the `frontend` directory:**
    ```bash
    cd frontend
    ```

2.  **Install the required dependencies:**
    ```bash
    npm install
    ```

---

## Running the Application

You will need two separate terminals to run the application.

1.  **Start the Backend Server:**
    -   In a terminal, navigate to the `backend` directory and activate the virtual environment.
    -   Run the following command:
        ```bash
        uvicorn app.main:app --reload
        ```
    -   The backend will be running at `http://127.0.0.1:8000`.

2.  **Start the Frontend Server:**
    -   In a second terminal, navigate to the `frontend` directory.
    -   Run the following command:
        ```bash
        npm run dev
        ```
    -   The frontend application will be available at `http://localhost:5173` (or the address provided in the terminal).

---

## Design Choices and Assumptions

-   **Architecture:** I chose a decoupled full-stack architecture with a FastAPI backend and a React frontend. This is a modern, scalable approach that separates concerns and allows for independent development.
-   **Database:** I used SQLite because it is simple, file-based, and requires no extra setup, making it ideal for a provisional product as specified. The backend is written using SQLAlchemy, which would allow for an easy transition to a more robust database like PostgreSQL in a production environment.
-   **State Management:** Redux Toolkit was used for frontend state management to handle the application's global state (the list of events) in a predictable and scalable way.
-   **UI/UX:** The design is centered around a **wizard-style** form for event creation. This is a critical design choice for a QMS, as it guides the user through a complex data entry process, ensuring data integrity and compliance.

---

## Implemented AI Features

The AI Assistant is integrated into the main event dashboard. It uses the Gemini 1.5 Flash model to provide insights on the event data. First, create a few test events using the wizard, then use the AI Assistant to ask the following questions:

| Feature                                      | Purpose                                                 | Example Query                                                 |
| :------------------------------------------- | :------------------------------------------------------ | :------------------------------------------------------------ |
| **Show High-Risk Events** | To quickly identify the most critical open issues.      | `Show me all the high-risk events.`                           |
| **Summarize Open Events** | To provide a quick summary for managers or stand-ups.   | `Summarize all open events.`                                  |
| **Suggest Next Steps** | To provide guidance to users on how to proceed.         | `What are the suggested next steps for event ID 1?`           |
| **Identify Trends** | To perform higher-level analysis on the QMS data.       | `Are there any trends in our CAPA events?`                    |
| **Generate Draft Notification** | To assist users with communication and documentation.   | `Generate a draft notification for the closure of event ID 2.` |
