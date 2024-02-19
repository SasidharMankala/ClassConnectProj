import { AiOutlineUser } from "react-icons/ai";
import { Button } from 'antd';
import { backgroundColor } from "./colors";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function NavBar({ courseIds, selectedCourse, onCourseSelect }) {
    let navigate = useNavigate();
    const [selectedItemId, setSelectedItemId] = useState('Select a course');

    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    const handleCourseChange = (event, courseId) => {
        setSelectedItemId(courseId);
        onCourseSelect(courseId);
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
                                {selectedItemId}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {courseIds.map(courseId => (
                                    <li key={courseId}>
                                        <a className={`dropdown-item ${selectedItemId === courseId ? 'active' : ''}`} href="#" onClick={(event) => handleCourseChange(event, courseId)}>
                                            {courseId}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Button className="text-light" type="text" icon={<AiOutlineUser />} onClick={routeChange}>Account</Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
