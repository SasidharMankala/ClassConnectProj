import { AiOutlineUser } from "react-icons/ai";
import { Button } from 'antd';
import { backgroundColor } from "./colors";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from './logout'
import Cookies from 'js-cookie';

function NavBar({ courseIds, selectedCourse, onCourseSelect }) {
    let navigate = useNavigate();
    const [selectedItemId, setSelectedItemId] = useState();
    const [userRole,setUserRole] = useState('')
    const [user, setUser] = useState('')


    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    useEffect(()=>{
        const user = Cookies.get('email')
        setUser(user)
        const role = Cookies.get('role')
        setUserRole(role)
    })

    const handleCourseChange = (event, courseId) => {
        setSelectedItemId(courseId);
        console.log(courseId)
        onCourseSelect(courseId);
    }

    const routetoCreateClass=()=>{
        let path = '/createclass'
        navigate(path)
    }

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
                                {selectedItemId ? `${selectedItemId.name} - ${selectedItemId.id}` : 'Select a course'}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {courseIds.map(courseId => (
                                    <li key={courseId.name}>
                                        <a className={`dropdown-item ${selectedItemId === courseId ? 'active' : ''}`} href="#" onClick={(event) => handleCourseChange(event, courseId)}>
                                            {courseId.name} {courseId.id}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Button className="text-light" type="text" icon={<AiOutlineUser />} onClick={routeChange}>{userRole.toUpperCase()}-{user.split('@')[0].toUpperCase()}</Button>
                            {userRole=='professor' && <Button onClick={routetoCreateClass} className="text-light" type="text">Create a Class</Button>}
                            <Button onClick={Logout} className="text-light" type="text">Logout</Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
