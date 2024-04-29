import { useState, useEffect } from "react";
import axios from 'axios';
import ENDPOINT from '../endpoint';

function CreateDatabase() {
    const [univName, setUnivName] = useState('');
    const [univId, setUnivId] = useState('');
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false); // New state for controlling alert visibility

    const handleAddDB = async () => {
        try {
            const response = await fetch(`${ENDPOINT}/universities`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ univName }),
            });
            if (response.status === 200) {
                setMessage('University added successfully');
                setShowAlert(true); // Show the success alert
                setTimeout(() => {
                    setShowAlert(false); // Hide the alert after 2 seconds
                }, 5000);
            } else {
                const resmes = await response.text()
                setMessage(resmes)
            }
        } catch (error) {
            console.error('Error adding University:', error);
        }
        setUnivId('')
        setUnivName('')
    }

    const createButtonHandle = () => {
        handleAddDB();
    }

    const cancelButtonHandle = () => {
        window.location.reload();
    }

    return (
        <div className="mt-2 form-group" style={{ width: '70%' }}>
            <p className="text-center fw-bold" >Welcome!!</p>
            <label htmlFor="">Enter the University name</label>
            <input
                type="text"
                className="mt-2 form-control"
                placeholder="Enter the University Name"
                value={univName}
                onChange={(e) => { setUnivName(e.target.value) }}
                required
            />

            <label className="mt-2" htmlFor="">Enter the University ID</label>
            <input
                type="text"
                className="mt-2 form-control"
                placeholder="Enter the University ID"
                value={univId}
                onChange={(e) => { setUnivId(e.target.value) }}
                required
            />

            <div className="d-flex justify-content-around">
                <button className="btn btn-primary mt-3 w-100" onClick={createButtonHandle}>
                    Create
                </button>
                <button className="btn text-white mt-3 w-100" onClick={cancelButtonHandle} style={{ backgroundColor: '#FA7B7B' }}>
                    Cancel
                </button>
            </div>
            <p className="mt-3 text-center">{message}</p>
            {showAlert && ( // Conditionally render the alert
                <div className="alert alert-success position-fixed bottom-0 start-50 translate-middle-x" role="alert" style={{ zIndex: 1000 }}>
                    Database for {univName} created successfully
                </div>
            )}
        </div>
    );
}

export default CreateDatabase;
