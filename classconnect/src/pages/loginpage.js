import React, { useEffect, useState } from 'react';
import { backgroundColor } from "../components/colors";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import ENDPOINT from '../endpoint';


function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [role, setrole] = useState('')
    const [univNames, setUnivNames] = useState([])
    const [univkeyvalue, setUnivKeyValue] = useState([])
    const [univName, setunivName] = useState()
    const [data, setData] = useState()
    const [loginData, setLoginData] = useState()
    const [loginAvailable, setLoginAvailable] = useState(false)
    const [loginmessage, setloginmessage] = useState('')

    useEffect(() => {
        fetchUnivnames()
        fetchData()
        if (loginAvailable) {
            // validateLogin(loginData.role)
            routetoHome()
        }
        if (Cookies.get('role') == 'professor' || Cookies.get('role' == 'student')) {
            routetoHome()
        }
        if (Cookies.get('role') == 'admin') {
            routetoAdmin()
        }
    }, [loginData])

    const routetoAdmin = () => {
        let path = '/adminpanel'
        navigate(path)
    }

    const fetchData = async () => {
        const users = await axios.get(`${ENDPOINT}/univnames`)
        // console.log(users.data)
        setData(users.data)
        // console.log(users.data)
    }

    const fetchUnivnames = async () => {
        try {
            const response = await axios.get(`${ENDPOINT}/univnames`)
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
    function validateLogin(role) {
        for (let i = 0; i < data.length; i++) {
            const university = data[i];
            if (university.name === univName) {
                // Check if email and password match
                if (role === 'admin') {
                    for (let j = 0; j < university.users.admins.length; j++) {
                        const admin = university.users.admins[j];
                        // console.log('admin', admin)
                        // console.log('login', loginData.email, loginData.password)
                        if (admin.email === email && admin.password === password) {
                            // Update login available state if login data is found
                            Cookies.set('email', email, { expires: 1 })
                            // Cookies.set('password',loginData.password,{ expires: 1 })
                            Cookies.set('role', role, { expires: 1 })
                            Cookies.set('univname', univName, { expires: 1 })
                            setloginmessage('Login Succesfull')
                            setLoginAvailable(true);
                            
                        } else {
                            setLoginAvailable(false);
                            setloginmessage("Email or password doesn't match | User doesn't exists")
                        }
                    }
                }
                // If admin not found, check professors
                else if (role === 'professor') {
                    for (let j = 0; j < university.users.professors.length; j++) {
                        const professor = university.users.professors[j];
                        // console.log('professor', professor)
                        // console.log('login', loginData.email, loginData.password)
                        if (professor.email === email && professor.password === password) {
                            // Update login available state if login data is found
                            // console.log('professor', professor.courses_created.courses)
                            var courses = JSON.stringify(professor.courses_created.courses)
                            Cookies.set('courses', courses, { expires: 1 })
                            // console.log(Cookies.get('courses'))
                            Cookies.set('email', email, { expires: 1 })
                            // Cookies.set('password',loginData.password,{ expires: 1 })
                            Cookies.set('role', role, { expires: 1 })
                            Cookies.set('univname', univName, { expires: 1 })
                            setloginmessage('Login Succesfull')
                            // setLoginAvailable(true);
                            
                        } else {
                            setLoginAvailable(false);
                            setloginmessage("Email or password doesn't match | User doesn't exists")
                        }
                    }
                }
                // If admin and professor not found, check students
                else {
                    for (let j = 0; j < university.users.students.length; j++) {
                        const student = university.users.students[j];
                        if (student.email === email && student.password === password) {
                            // Update login available state if login data is found
                            var courses = JSON.stringify(student.courses_enrolled.courses)
                            Cookies.set('courses', courses, { expires: 1 })
                            // Cookies.set('lavda','stud',{ expires: 1 })
                            Cookies.set('email', email, { expires: 1 })
                            // Cookies.set('password',loginData.password,{ expires: 1 })
                            Cookies.set('role', role, { expires: 1 })
                            Cookies.set('univname', univName, { expires: 1 })
                            setloginmessage('Login Succesfull')
                            setLoginAvailable(true);
                          
                        }
                        else {
                            setLoginAvailable(false);
                            setloginmessage("Email or password doesn't match | User doesn't exists")
                        }
                    }
                }
            }
        }
        // If login data not found in any university, set login available state to false

        // console.log(loginAvailable)
    }

    
    



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 8 characters long.");
            return;
        } else {
            setPasswordError("");
        }
        // console.log(role, email, password, univName);
        setLoginData({
            univName: univName,
            role: role,
            email: email,
            password: password
        })
        validateLogin(role)

    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const routetoHome = () => {
        let path = `/home`;
        navigate(path);
    };

    const routetoLogin = () => {
        let path = `/`;
        navigate(path);
    };
    const routetoRegister = () => {
        let path = `/register`;
        navigate(path);
    };

    return (
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center" style={{ backgroundColor: backgroundColor, minHeight: '100vh' }}>
            <img src="./full_logo.png" alt="Logo" className="img-fluid mx-auto d-block mb-4" />
            <div className="login-form container border rounded d-flex justify-content-center align-items-center p-4" style={{ maxWidth: '40%', backgroundColor: 'white' }}>
                <form className="w-100">
                    <div className="mt-2 form-group">
                        <p className="text-center fw-bold">Welcome!! Enter your login credentials</p>
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
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="mt-2 form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mt-2 form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="mt-2 form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                        />
                        {passwordError && <div className="text-danger">{passwordError}</div>}
                    </div>
                    {loginmessage && <div className="text-danger">{loginmessage}</div>}
                    <button type="submit" className="btn btn-primary mt-3 w-100" onClick={handleSubmit}>
                        Login
                    </button>
                    <p className='mt-2 '>Don't have an account? <Link to='/register'>Register</Link></p>

                </form>
            </div>
        </div>
    )
}

export default Login;
