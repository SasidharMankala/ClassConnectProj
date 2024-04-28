import { AiOutlineUser } from "react-icons/ai";
import { Button } from 'antd';
import { backgroundColor } from "./colors";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from './logout'
import Cookies from 'js-cookie';

function NavBar({ threads, onSelectedCourseChange }) {
    let navigate = useNavigate();
    const [userRole, setUserRole] = useState('')
    const [user, setUser] = useState('')
    const [selectedCourse, setSelectedCourse] = useState(null);


    const routeChange = () => {
        let path = `/profile`;
        navigate(path);
    }

    const loginNavigate = () => {
        let path = '/joinclass'
        navigate(path)
    }

    useEffect(() => {
        const user = Cookies.get('email')
        setUser(user)
        const role = Cookies.get('role')
        setUserRole(role)
        if (!selectedCourse && threads.length > 0) {
            setSelectedCourse({ id: threads[0].id, name: threads[0].name });
            onSelectedCourseChange({ id: threads[0].id, name: threads[0].name });
        }
    
    },[threads, onSelectedCourseChange, selectedCourse])


    const routetoCreateClass = () => {
        let path = '/createclass'
        navigate(path)
    }

    const handleCourseSelection = (course) => {
        setSelectedCourse(course);
        onSelectedCourseChange(course);
    };


    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: backgroundColor }}>
            <div className="container-fluid">
                {/* Logo */}
                <div className="navbar-brand">
                    <a href="#">
                        <img className="img-fluid" width="150" src="./logo.jpeg" alt="Logo" />
                    </a>
                </div>

                {/* Navbar Toggler (Hamburger Menu) */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Collapse */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    {/* Links for larger screens */}
                    <ul className="navbar-nav d-lg-flex align-items-center">
                        <li className="nav-item dropdown">
                            <a className="nav-link text-light dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {selectedCourse ? `${selectedCourse.name} : ${selectedCourse.id}`  : 'Select a course'}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {threads.map(thread => (
                                    <li key={thread.id}>
                                        <a className='dropdown-item' href="#" onClick={() => handleCourseSelection({ id: thread.id, name: thread.name })}>
                                            {thread.name} {thread.id}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                        </li>

                        <li className="nav-item">
                            <Button className="text-light" type="text" icon={<AiOutlineUser />} onClick={routeChange}>{userRole.toUpperCase()}-{user.split('@')[0].toUpperCase()}</Button>
                            {
                                userRole == 'professor' ?
                                    <Button onClick={routetoCreateClass} className="text-light" type="text">Create a Class</Button> :
                                    <Button onClick={loginNavigate} className="text-light" type="text">Join a class</Button>
                            }
                            <Logout />
                            {/* <div  type="text"><Logout className="text-light"/></div> */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
