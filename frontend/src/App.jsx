import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from './features/events/eventSlice';

// Import all of your main components
import EventWizard from './components/EventWizard';
import EventList from './components/EventList';
import AiAssistant from './components/AiAssistant'; // <-- Import the new AI component

// Styling (remains the same)
const appContainerStyles = {
  minHeight: '100vh',
  padding: '2rem 1rem',
  boxSizing: 'border-box',
};
const contentBoxStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  backgroundColor: 'white',
  borderRadius: '0.75rem',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  padding: '2rem',
};
const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  borderBottom: '1px solid #e2e8f0',
  paddingBottom: '1rem',
};
const buttonStyles = {
  backgroundColor: '#2563eb',
  color: 'white',
  fontWeight: 'bold',
  padding: '0.75rem 1.5rem',
  borderRadius: '0.5rem',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};


function App() {
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const dispatch = useDispatch();
  const eventStatus = useSelector((state) => state.events.status);

  useEffect(() => {
    if (eventStatus === 'idle') {
      dispatch(fetchEvents());
    }
  }, [eventStatus, dispatch]);

  const handleWizardFinish = () => {
    setIsCreatingEvent(false);
  };

  let content;
  if (isCreatingEvent) {
    content = <EventWizard onFinish={handleWizardFinish} />;
  } else {
    // The main dashboard now contains both the list and the AI assistant
    content = (
      <div>
        <EventList />
        <AiAssistant />
      </div>
    );
  }

  return (
    <div style={appContainerStyles}>
      <div style={contentBoxStyles}>
        <header style={headerStyles}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.875rem', color: '#1a202c' }}>QMS Event Module</h1>
            <p style={{ margin: 0, color: '#718096' }}>Manage and track all quality events.</p>
          </div>
          {!isCreatingEvent && (
            <button 
              style={buttonStyles} 
              onClick={() => setIsCreatingEvent(true)}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              + Create New Event
            </button>
          )}
        </header>
        <main>
          {content}
        </main>
      </div>
    </div>
  );
}

export default App;
