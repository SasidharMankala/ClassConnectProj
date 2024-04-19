import React, { useCallback, useEffect, useState } from 'react';
import { backgroundColor } from "../components/colors";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function Register() {
    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [email, setemail] = useState('')
    const [id, setid] = useState('')
    const [role, setrole] = useState('')
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    // const [formData, setformData] = useState([])
    const [univName, setunivName] = useState('')
    const [message, setMessage] = useState('')
    const [univNames, setUnivNames] = useState([])
    const [retrived, setRetrived] = useState()
    const [univkeyvalue, setUnivKeyValue] = useState([])
    let navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const validatePassword = () => {
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
        if (!regex.test(password)) {
            setPasswordError("Password must contain at least 8 characters, including a symbol, a capital letter, and a number");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    useEffect(() => {
        fetchUnivnames()
    }, [])



    const fetchUnivnames = async () => {
        try {
            const response = await axios.get('http://localhost:3001/univnames')
            setRetrived(response.data)
            const univkeyvalueObj = response.data.reduce((acc, curr) => {
                acc[curr._id] = curr.name;
                return acc;
            }, {});
            setUnivKeyValue(univkeyvalueObj);
            const names = Object.values(univkeyvalueObj);
            setUnivNames(names)

        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        if (!validatePassword()) {
            return;
        }

        const formData = {
            'fname': fname,
            'lname': lname,
            'email': email,
            'univName': univName,
            'id': id,
            'role': role,
            'password': password
        }

        try {
            const _id = univkeyvalue[univName]

            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fname, lname, univName, id, email, role, password, _id }),
            });

            if (response.ok) {
                setMessage('Registered successfully');
                const path ='/'
                navigate(path)
            } else {
                const dataStatus = await response.text();
                const responseObject = JSON.parse(dataStatus)
                console.log(responseObject.message)
                setMessage(responseObject.message)

            }
            return
        } catch (error) {
            console.error('Error registering user:', error);
            setMessage('An error occurred. Please try again later.');
        }

    };


    return (
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center" style={{ backgroundColor: backgroundColor, minHeight: '100vh' }}>
            <img src="./full_logo.png" alt="Logo" className="img-fluid mx-auto d-block mb-4" />

            <div className="login-form container border rounded d-flex justify-content-center align-items-center p-4" style={{ maxWidth: '40%', backgroundColor: 'white' }}>
                <form className="w-100" onSubmit={handleSubmit}>
                    <div className="mt-2 form-group">
                        <p className="text-center fw-bold" >Welcome!! Create a new account</p>
                        <label htmlFor="firstnameHelp">Enter your first name</label>
                        <input
                            type="text"
                            className="mt-2 form-control"
                            id="enterlastname"
                            aria-describedby="firstnameHelp"
                            placeholder="Enter first name"
                            value={fname}
                            onChange={(e) => { setfname(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mt-2 form-group">
                        <label htmlFor="lastnameHelp">Enter your last name</label>
                        <input
                            type="text"
                            className="mt-2 form-control"
                            id="enter lastname"
                            aria-describedby="lastnameHelp"
                            placeholder="Enter your last name"
                            value={lname}
                            onChange={(e) => { setlname(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mt-2 form-group">
                        <label htmlFor="lastnameHelp">Enter your ID</label>
                        <input
                            type="number"
                            className="mt-2 form-control"
                            id="enter ID"
                            aria-describedby="lastnameHelp"
                            placeholder="Enter your ID"
                            value={id}
                            onChange={(e) => { setid(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mt-2 form-group">
                        <label htmlFor="exampleInputEmail1">Enter your educational email address</label>
                        <input
                            type="email"
                            className="mt-2 form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => { setemail(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mt-2 form-group">
                        <label htmlFor="universityname">Select your Universty</label>
                        <select
                            className="mt-2 form-control"
                            id="univname"
                            value={univName}
                            onChange={(e) => { setunivName(e.target.value) }}
                            required>
                            <option value=''>Select University</option>
                            {univNames.map(
                                name => (
                                    <option key={name} value={name}>{name}</option>
                                )
                            )}
                        </select>
                    </div>
                    <div className="mt-2 form-group">
                        <label htmlFor="roleSelect">Select your role:</label>
                        <select
                            className="mt-2 form-control"
                            id="roleSelect"
                            value={role}
                            onChange={(e) => { setrole(e.target.value) }}
                            required>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="professor">Professor</option>
                            <option value="student">Student</option>
                        </select>
                    </div> 
                    <div className="mt-2 form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="mt-2 form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="mt-2 form-group">
                        <label htmlFor="exampleInputPassword2">Retype your password</label>
                        <input
                            type="password"
                            className="mt-2 form-control"
                            id="exampleInputPassword2"
                            placeholder="Password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>
                    {passwordError && <div className="text-danger">{passwordError}</div>}
                    <button type="submit" className="btn btn-primary mt-3 w-100">
                        Register
                    </button>
                    <p className='mt-2 '>Back to login page <Link to='/'>Login</Link></p>
                    {message && <p className=''>{message}</p>}
                </form>
            </div>
        </div>
    )
}

export default Register;
