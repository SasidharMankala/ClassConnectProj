import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ENDPOINT from "../endpoint";

function DeleteDatabase(){
    const [courseName, setCourseName] = useState('')
const [courseId, setCourseId] = useState('')
const [userEmail, setUserEmail] = useState('')
const [role, setRole] = useState('')
const [univName, setunivName] = useState('')
const [message,setMessage] = useState('')
const coursesCreated = Cookies.get('courses')
const courses = JSON.parse(coursesCreated)

    const onSubmit = async (e) => {
        try {
            const response = await fetch(`${ENDPOINT}/delete-course/${univName}/${userEmail}/${courseId}`,{
                method: 'DELETE',
                // headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ univName }),
            })
            const status = await response.text()
            const message = JSON.parse(status)
            setMessage(message.message)
            let coursess = JSON.parse(coursesCreated)           
            let courses = coursess.filter(course => course.id !== courseId);
            console.log('courses',courses)
            Cookies.set('courses',JSON.stringify(courses))


        } catch (error) {
            console.log(error)
        }


    }
    
    useEffect(()=>{
        const email = Cookies.get('email')
        setUserEmail(email)
        const role = Cookies.get('role')
        setRole(role)
        const univname = Cookies.get('univname')
        setunivName(univname)
    })
    const deletebuttonhandle=()=>{
        window.location.reload()
    }
    const cancelbuttonhandle=()=>{
        window.location.reload();
    }

    return (
        <div className="mt-2 form-group" style={{width:'70%'}}>
            <p className="text-center text-danger fw-bold" >Danger Zone!!</p>
            <label className='text-danger'htmlFor="">Enter the Class you want to delete</label>
            <select className="form-select mt-2" aria-label="Default select example" onChange={(e)=>{setCourseId(e.target.value)}}>
                <option defaultValue>Select the Class</option>
                {courses.map((course)=>{
                    return <option key={course.id} value={course.id}>{course.id} : {course.name}</option>
                })}</select>

           <div className="d-flex justify-content-around">
           <button className="btn text-light mt-3 w-100" onClick={onSubmit} style={{ backgroundColor: '#FA7B7B' }} >
                Delete
            </button>
            <button className="btn mt-3 w-100" onClick={cancelbuttonhandle} style={{ backgroundColor: '#93ED91' }} >
                Cancel
            </button> 
           </div>
           <p>{message && message}</p>
        </div>
    )
}

export default DeleteDatabase;