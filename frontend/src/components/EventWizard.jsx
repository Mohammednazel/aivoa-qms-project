import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../features/events/eventSlice';

// --- Reusable Styling Objects ---
const wizardStyles = {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '2rem',
    border: '1px solid #e2e8f0',
};
const progressContainer = { marginBottom: '2rem' };
const stepTextContainer = { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#4a5568' };
const progressBarBackground = { width: '100%', backgroundColor: '#e2e8f0', borderRadius: '9999px', height: '8px' };
const progressBarFill = { backgroundColor: '#2563eb', height: '8px', borderRadius: '9999px', transition: 'width 0.3s ease-in-out' };
const stepContainer = { display: 'flex', flexDirection: 'column', gap: '1.5rem' };
const inputGroup = { display: 'flex', flexDirection: 'column', gap: '0.5rem' };
const labelStyle = { fontWeight: '500', color: '#374151' };
const inputStyle = { padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', width: '100%' };
const gridTwoCols = { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1.5rem' };
const navigationButtons = { display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', marginTop: '1.5rem', borderTop: '1px solid #e2e8f0' };
const buttonBase = { fontWeight: 'bold', padding: '0.5rem 1.5rem', borderRadius: '0.375rem', cursor: 'pointer', border: 'none' };
const prevButton = { ...buttonBase, backgroundColor: '#e5e7eb', color: '#374151' };
const nextButton = { ...buttonBase, backgroundColor: '#2563eb', color: 'white' };
const submitButton = { ...buttonBase, backgroundColor: '#16a34a', color: 'white' };


const EventWizard = ({ onFinish }) => {
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        event_type: 'Deviation',
        title: '',
        description: '',
        department: 'Quality Assurance',
        severity: '',
        priority: '',
        responsible_parties: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        // Add validation logic here if needed
        setCurrentStep(prev => prev + 1);
    };

    const handlePrev = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch the createEvent async thunk with the form data
        dispatch(createEvent(formData));
        // Call the onFinish prop to switch the view back to the list
        onFinish();
    };

    const progressPercentage = (currentStep / 3) * 100;

    return (
        <div style={wizardStyles}>
            {/* --- Progress Bar --- */}
            <div style={progressContainer}>
                <div style={stepTextContainer}>
                    <span>Step {currentStep} of 3</span>
                </div>
                <div style={progressBarBackground}>
                    <div style={{ ...progressBarFill, width: `${progressPercentage}%` }}></div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* --- Step 1: Event Details --- */}
                {currentStep === 1 && (
                    <div style={stepContainer}>
                        <div style={gridTwoCols}>
                            <div style={inputGroup}>
                                <label style={labelStyle} htmlFor="event_type">Event Type</label>
                                <select style={inputStyle} id="event_type" name="event_type" value={formData.event_type} onChange={handleChange}>
                                    <option>Deviation</option>
                                    <option>CAPA</option>
                                    <option>Change Control</option>
                                    <option>Audit Finding</option>
                                </select>
                            </div>
                            <div style={inputGroup}>
                                <label style={labelStyle} htmlFor="title">Event Title</label>
                                <input style={inputStyle} type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Temperature Excursion" />
                            </div>
                        </div>
                        <div style={inputGroup}>
                            <label style={labelStyle} htmlFor="description">Description</label>
                            <textarea style={{...inputStyle, height: '120px'}} id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Provide a detailed description..."></textarea>
                        </div>
                    </div>
                )}

                {/* --- Step 2: Classification --- */}
                {currentStep === 2 && (
                    <div style={stepContainer}>
                        <div style={inputGroup}>
                            <label style={labelStyle} htmlFor="department">Department</label>
                            <select style={inputStyle} id="department" name="department" value={formData.department} onChange={handleChange}>
                                <option>Quality Assurance</option>
                                <option>Manufacturing</option>
                                <option>Logistics</option>
                            </select>
                        </div>
                        <div style={gridTwoCols}>
                            <div style={inputGroup}>
                                <label style={labelStyle}>Severity</label>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                    {['Low', 'Medium', 'High'].map(level => (
                                        <label key={level}><input type="radio" name="severity" value={level} checked={formData.severity === level} onChange={handleChange} /> {level}</label>
                                    ))}
                                </div>
                            </div>
                            <div style={inputGroup}>
                                <label style={labelStyle}>Priority</label>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                    {['Low', 'Medium', 'High'].map(level => (
                                        <label key={level}><input type="radio" name="priority" value={level} checked={formData.priority === level} onChange={handleChange} /> {level}</label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- Step 3: Responsibility & Submission --- */}
                {currentStep === 3 && (
                     <div style={stepContainer}>
                        <div style={inputGroup}>
                            <label style={labelStyle} htmlFor="responsible_parties">Responsible Parties</label>
                            <input style={inputStyle} type="text" id="responsible_parties" name="responsible_parties" value={formData.responsible_parties} onChange={handleChange} placeholder="e.g., John Doe (QA)" />
                        </div>
                        <div>
                            <p style={{color: '#4a5568'}}>Please review all information before submitting.</p>
                        </div>
                    </div>
                )}

                {/* --- Navigation --- */}
                <div style={navigationButtons}>
                    <button type="button" style={prevButton} onClick={handlePrev} disabled={currentStep === 1}>
                        Previous
                    </button>
                    {currentStep < 3 && (
                        <button type="button" style={nextButton} onClick={handleNext}>
                            Next
                        </button>
                    )}
                    {currentStep === 3 && (
                        <button type="submit" style={submitButton}>
                            Submit Event
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EventWizard;
