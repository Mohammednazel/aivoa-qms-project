import React from 'react';
import { useSelector } from 'react-redux';

// --- Reusable Styling Objects ---
const tableContainerStyles = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    overflow: 'hidden',
};
const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
};
const thStyles = {
    padding: '1rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4a5568',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
};
const tdStyles = {
    padding: '1rem',
    borderBottom: '1px solid #e5e7eb',
    color: '#374151',
};
const statusBadgeBase = {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500',
};
const statusColors = {
    Open: { backgroundColor: '#fee2e2', color: '#b91c1c' },
    'In Progress': { backgroundColor: '#fef3c7', color: '#b45309' },
    Closed: { backgroundColor: '#d1fae5', color: '#065f46' },
};
const severityColors = {
    High: { color: '#dc2626' },
    Medium: { color: '#f59e0b' },
    Low: { color: '#16a34a' },
};

const EventList = () => {
    // Select the necessary data from the Redux store
    const events = useSelector((state) => state.events.items);
    const status = useSelector((state) => state.events.status);
    const error = useSelector((state) => state.events.error);

    if (status === 'loading') {
        return <div>Loading events...</div>;
    }

    if (status === 'failed') {
        return <div>Error fetching events: {error}</div>;
    }

    if (events.length === 0) {
        return <div style={{textAlign: 'center', padding: '2rem', color: '#6b7280'}}>No events found. Click "Create New Event" to get started.</div>
    }

    return (
        <div style={tableContainerStyles}>
            <table style={tableStyles}>
                <thead>
                    <tr>
                        <th style={thStyles}>Event ID</th>
                        <th style={thStyles}>Title</th>
                        <th style-={thStyles}>Type</th>
                        <th style={thStyles}>Status</th>
                        <th style={thStyles}>Severity</th>
                        <th style={thStyles}>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id} style={{ '&:hover': { backgroundColor: '#f9fafb' } }}>
                            <td style={{...tdStyles, fontWeight: '500', color: '#2563eb'}}>{event.id}</td>
                            <td style={tdStyles}>{event.title}</td>
                            <td style={tdStyles}>{event.event_type}</td>
                            <td style={tdStyles}>
                                <span style={{ ...statusBadgeBase, ...statusColors[event.status] }}>
                                    {event.status}
                                </span>
                            </td>
                            <td style={{ ...tdStyles, fontWeight: '500', ...severityColors[event.severity] }}>
                                {event.severity}
                            </td>
                            <td style={tdStyles}>{new Date(event.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventList;
