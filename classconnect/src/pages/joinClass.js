import { useEffect, useState } from "react";
import { backgroundColor } from "../components/colors";
import Logout from '../components/logout'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import ENDPOINT from "../endpoint";



function JoinClass() {
    const navigate = useNavigate()
    const [selectedClass, setselectedClass] = useState('')
    const [email, setemail] = useState('')
    const [resData, setresData] = useState('')
    const [univName, setUnivName] = useState('')
    const [univData, setUnivData] = useState()
    const [courseNames, setCourseNames] = useState([])
    const [role, setRole] = useState('')
    const [message, setmessage] = useState('')






    useEffect(() => {
        const temp = Cookies.get('email')
        setemail(temp)
        const univname = Cookies.get('univname')
        // console.log('dsfgsdsfg', univname)
        setUnivName(univname)
        const role = Cookies.get('role')
        setRole(role)
        

        const timeout = setTimeout(() => {
            axios.get(`${ENDPOINT}/threads`)
                .then(response => {
                    const univName = Cookies.get('univname')
                    const threads = response.data;

                    const getRequiredThreads = (univName) => {
                        const univData = threads.filter(thread => thread.name === univName)
                        setUnivData(univData)
                        return univData;
                    };

                    // Function to extract course list from threads
                    const getCourseList = (requiredThreads) => {
                        const courseSet = new Set(); // Use Set to avoid duplicate course names
                        requiredThreads.forEach(thread => {
                            thread.courses.forEach(course => {
                                courseSet.add({ id: course.id, name: course.name });
                            });
                        });
                        return Array.from(courseSet); // Convert Set back to array
                    };

                    const requiredThreads = getRequiredThreads(univName);
                    const courseList = getCourseList(requiredThreads);
                    // console.log('courseList', courseList);
                    
                    const formattedCourses = courseList.map(course => `${course.id} : ${course.name}`);
                    // console.log('courseNames', formattedCourses);
                    setCourseNames(formattedCourses);

                })

        }, 1000)

    }, [])

    const routeTohome = () => {
        let path = '/home'
        navigate(path)
    }

    const joinClass = async(e) => {
        e.preventDefault()
        const [id, name] = selectedClass.split(':').map(str => str.trim());
        const courseObject = { id, name };
        console.log('courseObject', courseObject);

        const data = {email, univName, courseObject}
        const courses = Cookies.get('courses')
        console.log('courses', courses)
        console.log('data', data.courseObject)
        console.log(typeof(courses))
        let coursess = JSON.parse(courses)
        coursess.push(data.courseObject)
        console.log('after courses', coursess)
        
            axios.post(`${ENDPOINT}/joinclass`, data).then(response => {
                // console.log('response', response)
                setmessage(response.data.message)
                Cookies.set('courses', JSON.stringify(coursess))
            }).catch(error => {
                console.log('error', error.response.data.message)
                setmessage(error.response.data.message)
            })
        

    }

    return (
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center" style={{ backgroundColor: backgroundColor, minHeight: '100vh' }}>
            <img src="./full_logo.png" alt="Logo" className="img-fluid mx-auto d-block mb-4" />
            <div className="login-form container border rounded d-flex justify-content-center align-items-center p-4" style={{ maxWidth: '40%', backgroundColor: 'white' }}>



                <form className="w-100" >
                    <div className="mt-2 form-group">
                        <p className="text-center fw-bold" >Welcome!!</p>
                        <label htmlFor="">Select the class you want to you!!</label>
                        <div className="mt-2 form-group">

                            <select
                                className="mt-2 form-control"
                                id="univname"
                                value={selectedClass}
                                onChange={(e) => { setselectedClass(e.target.value) }}
                                required>
                                <option value=''>Select Class</option>
                                {
                                    courseNames.map(course => {
                                        return <option value={course}>{course}</option>
                                    })}

                            </select>
                        </div>
                        {
                        message && 
                        message === 'Joined the class successfully' ? <div className="alert alert-success mt-3" role="alert">
                            {message}</div> : message && <div className="alert alert-danger mt-3" role="alert">{message}</div>
                        }
                        <button onClick={joinClass} className="btn btn-primary text-white mt-3 w-50" >
                            Join this class
                        </button>
                        <button onClick={routeTohome} className="btn btn-secondary text-white mt-3 w-50" style={{ marginLeft: '0px' }}>
                            Back to home
                        </button>
                    </div>

                </form>


            </div>
        </div>
    )
}

export default JoinClass;