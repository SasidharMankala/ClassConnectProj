import { backgroundColor } from "../components/colors";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    let navigate = useNavigate();
    const role = Cookies.get('role');
    const email = Cookies.get('email');
    const univname = Cookies.get('univname');
    const courses = JSON.parse(Cookies.get('courses') || '[]');

    const handleBackToHome = () => {
        let path = `/home`;
        navigate(path);
    };

    return (
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center" style={{ backgroundColor: backgroundColor, minHeight: '100vh' }}>
            <img src="./full_logo.png" alt="Logo" className="img-fluid mx-auto d-block mb-4" />
            <div className="userDetails container border rounded d-flex flex-column justify-content-center align-items-center p-4" style={{ maxWidth: '40%', backgroundColor: 'white' }}>
                <div>
                    <h2>Profile Details</h2>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Role:</strong> {role.toUpperCase()}</p>
                    <p><strong>University Name:</strong> {univname}</p>
                    {role === 'professor' && (
                        <div>
                            <h3>Created Courses:</h3>
                            <ul>
                                {/* Render created courses here */}
                                {courses.map((course, index) => (
                                    <li key={index}>{course.name.toUpperCase()} - {course.id}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {role === 'student' && (
                        <div>
                            <h3>Enrolled Courses:</h3>
                            <ul>
                                {/* Render enrolled courses here */}
                                {courses.map((course, index) => (
                                    <li key={index}>{course.name} - {course.id}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="mt-3"> {/* Add margin top for spacing */}
                        <button className="btn mt-3 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#8566A5', color: 'white' }} onClick={handleBackToHome}>Back to Home</button>
                    </div>
            </div>
        </div>
    );
}

export default ProfilePage;
