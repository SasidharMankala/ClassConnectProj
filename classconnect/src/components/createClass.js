import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react';
import axios from 'axios'

function CreateClassCom() {
    const [courseName, setCourseName] = useState('')
    const [courseId, setCourseId] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [role, setRole] = useState('')
    const [univName, setUnivName] = useState('')
    const [courseNameError, setCourseNameError] = useState('')
    const [courseIdError, setCourseIdError] = useState('')
    const [message, setMessage] = useState('')

    const cancelbuttonhandle = () =>{
        window.location.reload();
    }

    useEffect(() => {
        const email = Cookies.get('email')
        setUserEmail(email)
        const role = Cookies.get('role')
        setRole(role)
        const univName = Cookies.get('univname')
        setUnivName(univName)
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();

        // Validate input fields
        if (!courseName.trim()) {
            setCourseNameError('Course name is required.');
            return;
        } else {
            setCourseNameError('');
        }

        if (!courseId.trim()) {
            setCourseIdError('Course ID is required.');
            return;
        } else {
            setCourseIdError('');
        }
        
        try {
            const response = await fetch(`http://localhost:3001/add-course/${univName}/${userEmail}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId, courseName }),
            })
            const status = await response.text()
            const message = JSON.parse(status)
            setMessage(message.message)
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <div className="mt-2 form-group" style={{width:'70%'}}>
            <p className="text-center fw-bold" >Welcome!!</p>
            <label htmlFor="">Enter the Class name</label>
            <input
                type="text"
                className="mt-2 form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter the Class Name"
                required
                value={courseName}
                onChange={(e) => {setCourseName(e.target.value)}}
            />
            {courseNameError && <div className="text-danger">{courseNameError}</div>}

            <label className="mt-2" htmlFor="">Enter the Class ID</label>
            <input
                type="text"
                className="mt-2 form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter the Class ID"
                required
                value={courseId}
                onChange={(e) => {setCourseId(e.target.value)}}
            />
            {courseIdError && <div className="text-danger">{courseIdError}</div>}

            <div className="d-flex justify-content-around">
                <button className="btn btn-primary mt-3 w-100" onClick={onSubmit}>
                    Create
                </button>
                <button className="btn text-white mt-3 w-100" onClick={cancelbuttonhandle} style={{ backgroundColor: '#FA7B7B' }}>
                    Cancel
                </button>
            </div>
            <p>{message && message}</p>
        </div>
    )
}

export default CreateClassCom;
