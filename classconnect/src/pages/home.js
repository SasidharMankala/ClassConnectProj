import { useEffect, useState } from "react";
import ThreadCards from "../components/thread_cards";
import NavBar from "../components/navbar";
import '../css/home.css'
import ThreadExpansion from "./thread_expansion";
import AddNewThread from "../components/addNewThread";
import Loading from "../components/loading";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import ENDPOINT from "../endpoint";

function Home() {
    const finalData = []
    const [courseId, setCourseId] = useState(''); // Default course ID
    const [courseIds, setCourseIds] = useState([]); // Array to store course IDs
    // const [threadData, setThreadData] = useState([]);
    const [selectedThreadId, setSelectedThreadId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertemail, setAlertemail] = useState()
    const [role, setrole] = useState('')
    const [univName, setUnivName] = useState('')
    const [retrived, setRetrived] = useState('')
    const [univData, setUnivData] = useState()
    const [newton, setnewton] = useState('');
    const [courseList, setCourseList] = useState([]);
    const [threads, setThreads] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleCourseSelection = (course) => {
        setSelectedCourse(course);
        // console.log('selectedCourse',course)
    }

    let navigate = useNavigate();

    const handleBackToHome = () => {
        setSelectedThreadId(null);
    }

    const routtoLogin = () => {
        let path = `/`;
        navigate(path);
    }


    useEffect(() => {
        const email = Cookies.get('email')
        setAlertemail(email)
        const role = Cookies.get('role')
        setrole(role)
        const univname = Cookies.get('univname')
        setUnivName(univname)
        const courses = Cookies.get('courses')
        setCourseList(courses)


        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false)
        }, 2000)

        if (!email) {
            routtoLogin()
        }
        setLoading(true);
        const timeout = setTimeout(() => {
            // console.log('hiiiiii') 
            const fetchData = async () => {
                try {
                    const temp = JSON.parse(courseList);
                    // console.log('courseList',typeof(temp))
                    axios.get(`${ENDPOINT}/threads`).then(response => {
                        // console.log(response.data)
                        const university = response.data.find(univ => univ.name === univName);
                        let threadList = [];

                        if (university) {
                            // Iterate through the courseList
                            temp.forEach(course => {
                                // Find the course object in the university's courses array
                                const courseData = university.courses.find(c => c.id === course.id);
                                if (courseData) {
                                    // Push the course data along with its threads into threadList
                                    threadList.push({
                                        id: courseData.id,
                                        name: courseData.name,
                                        threads: courseData.threads
                                    });
                                }

                            });
                        }
                        setThreads(threadList)
                        // console.log('threadList',threadList)


                    })

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchData()

            setLoading(false); // Set loading to false after data is fetched

            // Show alert after data is fetched
        }, 1000);

        // Cleanup the timeout to prevent memory leaks
        // return () => clearTimeout(timeout); 
    }, [courseList]); // Update thread data when courseId changes


    let selectedCourseThreads = [];

    if (selectedCourse) {
        // Filter threads based on the selected course's ID
        selectedCourseThreads = threads.find(course => course.id === selectedCourse.id)?.threads || [];
        //   console.log('selectedCourseThreads',selectedCourseThreads)/
    } else {
        // Render threads of the first course if selectedCourse doesn't exist
        selectedCourseThreads = threads.length > 0 ? threads[0].threads : [];
    }


    return (
        <>
            <NavBar threads={threads} onSelectedCourseChange={handleCourseSelection} />
            {loading && <Loading />}
            {!loading && selectedCourseThreads.length !== 0 && selectedCourseThreads.map((thread) => (
                <ThreadCards
                    key={thread._id}
                    thread_id={thread._id}
                    card_title={thread.title}
                    id={thread.id}
                    card_description={thread.description}
                    flagged={thread.flagged}
                    no_upvotes={thread.upvotes}
                    user_name={role === 'professor' ? thread.posted_user : 'anonymous'}
                    no_replies={thread.replies.length}
                    replies={thread.replies}
                    selectedCourse={selectedCourse}
                />
            ))}
            {!loading && selectedCourseThreads.length == 0 && <div className="d-flex mt-5 align-items-center justify-content-center">No threads here Click on the add button to add a thread</div>}
            <AddNewThread selectedCourse={selectedCourse} selectedCourseThreads={selectedCourseThreads}/>
            {showAlert && (
                <div className="alert alert-info alert-dismissible fade show" role="alert" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
                    Logged in as {role} {alertemail}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(false)}></button>
                </div>
            )}
            
        </>
    );
}

export default Home;
