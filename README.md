# AI-First Quality Management System (QMS) Event Module

This project is a full-stack web application developed for the Round 3 evaluation. It is a provisional-level QMS module designed for a life science company, allowing users to create, track, and gain AI-powered insights on quality events.

---

## Technology Stack

| Category  | Technology                               |
| :-------- | :--------------------------------------- |
| Frontend  | React (Vite), Redux Toolkit, Axios       |
| Backend   | Python, FastAPI, SQLAlchemy              |
| Database  | SQLite                                   |
| AI Model  | Gemini 2.5 pro                           |

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
    -   The backend will be running at
