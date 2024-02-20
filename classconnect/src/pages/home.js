import { useEffect, useState } from "react";
import ThreadCards from "../components/thread_cards";
import NavBar from "../components/navbar";
import '../css/home.css'
import ThreadExpansion from "./thread_expansion";
import AddNewThread from "../components/addNewThread";
import Loading from "../components/loading";

function Home() {
    const [courseId, setCourseId] = useState("course1"); // Default course ID
    const [courseIds, setCourseIds] = useState([]); // Array to store course IDs
    const [threadData, setThreadData] = useState(null);
    const [selectedThreadId, setSelectedThreadId] = useState(null);
    const [loading, setLoading] = useState(false);

    const commentClickhandle = (id) => {
        setSelectedThreadId(id);
    }

    const handleBackToHome = () => {
        setSelectedThreadId(null);
    }

    useEffect(() => {
        setLoading(true); // Set loading to true when changing courses
        // Simulate loading for 1 second
        const timeout = setTimeout(() => {
            console.log('werty')
             // After 1 second, set loading to false
        

        // Fetch data from JSON file
        fetch('./updatesthreads.json')
            .then(response => response.json())
            .then(data => {
                // Extract course IDs from data
                const ids = data.courses.map(course => course.course_id);
                setCourseIds(ids); // Update courseIds state
                // Set thread data based on selected course ID
                const selectedCourse = data.courses.find(course => course.course_id === courseId);
                if (selectedCourse) {
                    setThreadData(selectedCourse.threads);
                } else {
                    setThreadData(null); // Set threadData to null if course is not found
                }
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // Handle loading state in case of error
            });}, 1000);

        // Cleanup the timeout to prevent memory leaks
        return () => clearTimeout(timeout);
    }, [courseId]); // Update thread data when courseId changes

    return (
        <>
            <NavBar courseIds={courseIds} selectedCourse={courseId} onCourseSelect={setCourseId} />
            {loading && <Loading />}
            {!loading && threadData && threadData.map((thread, index) => (
                selectedThreadId === thread._id ?
                    <ThreadExpansion key={index} threadData={thread} onBack={handleBackToHome} /> :
                    <ThreadCards
                        key={index}
                        id={thread._id}
                        card_title={thread.thread_title}
                        card_description={thread.thread_description}
                        no_replies={thread.no_of_replies}
                        no_upvotes={thread.no_of_upvotes}
                        user_name={thread.Username}
                        onClick={() => commentClickhandle(thread._id)}
                    />
            ))}
            <AddNewThread />
        </>
    );
}

export default Home;
