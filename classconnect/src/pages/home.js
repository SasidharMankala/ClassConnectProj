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
    const [requiredThreads, setRequiredThreads] = useState([]);
    const [courseList, setCourseList] = useState([]);
   


    let navigate = useNavigate();

    const commentClickhandle = (id) => {
        setSelectedThreadId(id);
    }

    const handleBackToHome = () => {
        setSelectedThreadId(null);
    }

    const routtoLogin = () => {
        let path = `/`;
        navigate(path);
    }

    // const fetchThreads = async () => {
    //     try {
    //         axios.get('http://localhost:3001/threads')
    //             .then(response => {
    //                 const univName = Cookies.get('univname')
    //                 console.log(univName)
    //                 // console.log(response.data)
    //                 const threads = response.data; // Extract the threads data

    //                 // Function to filter threads based on university name
    //                 const getRequiredThreads = (univName) => {
    //                     const univData = threads.filter(thread => thread.name === univName)
    //                     setUnivData(univData)
    //                     return univData;
    //                 };

    //                 // Function to extract course list from threads
    //                 const getCourseList = (requiredThreads) => {
    //                     const courseSet = new Set(); // Use Set to avoid duplicate course names
    //                     requiredThreads.forEach(thread => {
    //                         thread.courses.forEach(course => {
    //                             courseSet.add({ id: course.id, name: course.name });
    //                         });
    //                     });
    //                     return Array.from(courseSet); // Convert Set back to array
    //                 };

    //                 const getThreads = (requiredThreads,courseId) => {
    //                     const threadData = [];
    //                     console.log(courseId)
    //                     requiredThreads.forEach(data => {
    //                         // console.log('data',data)
    //                         data.courses.forEach(course => {
    //                             // console.log('data.course',data.courses)
    //                             if (course.id === courseId.id && course.name === courseId.name) {
    //                                 course.threads.forEach(thread => {
    //                                     // console.log('thread',thread)
    //                                     sneha.push(thread);
    //                                 });
    //                             }
    //                         });
    //                     }); return Array.from(threadData)
    //                 }

    //                 const getOnlyCourse = (requiredThreads) => {
    //                     const onlycourse = []
    //                     requiredThreads.forEach(thread => {
    //                         thread.courses.forEach(course => {
    //                             onlycourse.push(course.name)
    //                         })
    //                     })
    //                     return onlycourse
    //                 }
    //                 const requiredThreads = getRequiredThreads(univName);
    //                 const courseList = getCourseList(requiredThreads);
    //                 const onlycourse = getOnlyCourse(requiredThreads);
    //                 const needed = getThreads(requiredThreads,courseId)
    //                 console.log('needed',needed)
    //                 setCourseList(courseList)
    //                 setThreadData(needed)
    //                 const initial = courseList[0]
    //                 console.log('requiredThreads', requiredThreads);
    //                 console.log('courseList', courseList);
    //                 console.log('onlycourse', onlycourse)
    //                 console.log('themedata',threadData)
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching data:', error);
    //             });
    //     } catch (error) {
    //         console.error('Error fetching threads:', error);
    //     }
    // }


    useEffect(() => {
        const email = Cookies.get('email')
        setAlertemail(email)
        const role = Cookies.get('role')
        setrole(role)
        const univname = Cookies.get('univname')
        setUnivName(univname)


        if (!email) {
            routtoLogin()
        }
        setLoading(true); // Set loading to true when changing courses
        // Simulate loading for 1 second
        // fetchThreads()
        const timeout = setTimeout(() => {
            axios.get('http://localhost:3001/threads')
                .then(response => {
                    const univName = Cookies.get('univname')
                    // console.log(univName)
                    // console.log(response.data)
                    const threads = response.data; // Extract the threads data

                    // Function to filter threads based on university name
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

                    const getThreads = (requiredThreads, courseId) => {
                        const threadData = [];
                        // console.log(courseId)
                        requiredThreads.forEach(data => {
                            // console.log('data',data)
                            data.courses.forEach(course => {
                                // console.log('data.course',data.courses)
                                if (course.id === courseId.id && course.name === courseId.name) {
                                    course.threads.forEach(thread => {
                                        // console.log('thread',thread)
                                        finalData.push(thread);
                                    });
                                }
                            });
                        });

                        return Array.from(threadData)
                    }

                    const getOnlyCourse = (requiredThreads) => {
                        const onlycourse = []
                        requiredThreads.forEach(thread => {
                            thread.courses.forEach(course => {
                                onlycourse.push(course.name)
                            })
                        })
                        return onlycourse
                    }
                    const requiredThreads = getRequiredThreads(univName);
                    const courseList = getCourseList(requiredThreads);
                    const onlycourse = getOnlyCourse(requiredThreads);
                    const needed = getThreads(requiredThreads, courseId)
                    // console.log('needed',needed[0])
                    setCourseList(courseList)
                    // if(courseId){
                    //     setThreadData(needed)
                    // }
                    const initial = courseList[0]
                    // console.log('requiredThreads', requiredThreads);
                    // console.log('courseList', courseList);
                    // console.log('onlycourse', onlycourse)
                   


                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            setLoading(false); // Set loading to false after data is fetched
            setShowAlert(true); // Show alert after data is fetched
        }, 1000);

        // Cleanup the timeout to prevent memory leaks
        return () => clearTimeout(timeout);
    }, [courseId]); // Update thread data when courseId changes
    const conso = (thread) => {
        console.log(thread)
    }
    return (

        <>
            <NavBar courseIds={courseList} selectedCourse={courseId} onCourseSelect={setCourseId} />
            {loading && <Loading />}
            {!loading && finalData &&
                finalData.map((item, index) => {
                    <div key={item._id}>
                        <p>{item.title}</p>
                    </div>
                })
            }
            <AddNewThread />
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
