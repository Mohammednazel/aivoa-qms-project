import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

// --- Reusable Styling Objects ---
const assistantContainerStyles = {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f9fafb',
    borderRadius: '0.75rem',
    border: '1px solid #e5e7eb',
};
const inputStyles = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
};
const buttonStyles = {
    backgroundColor: '#1d4ed8',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
};
const responseStyles = {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
    whiteSpace: 'pre-wrap', // Preserves formatting from the AI's response
    color: '#374151',
};

const AiAssistant = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Get the current list of events from the Redux store to use as context
    const events = useSelector(state => state.events.items);

    const handleQuery = async () => {
        if (!query.trim()) return;
        setIsLoading(true);
        setResponse('');
        try {
            // Send the user's query and the events context to the backend
            const apiResponse = await axios.post('http://127.0.0.1:8000/ai/assist', {
                query: query,
                // The backend expects the list of events, but we don't need to send it
                // as the backend fetches it directly from the DB. We just send the query.
            });
            setResponse(apiResponse.data.answer);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setResponse('Sorry, an error occurred while getting a response.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={assistantContainerStyles}>
            <h2 style={{ marginTop: 0, color: '#111827' }}>AI Assistant</h2>
            <p style={{ color: '#4b5563' }}>Ask questions about your QMS events.</p>
            <textarea
                style={inputStyles}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 'Summarize all open events' or 'Show high-risk events'"
                rows="3"
            />
            <button style={buttonStyles} onClick={handleQuery} disabled={isLoading}>
                {isLoading ? 'Thinking...' : 'Ask AI'}
            </button>

            {response && (
                <div style={responseStyles}>
                    <strong>AI Response:</strong>
                    <p style={{margin: '0.5rem 0 0 0'}}>{response}</p>
                </div>
            )}
        </div>
    );
};

export default AiAssistant;
