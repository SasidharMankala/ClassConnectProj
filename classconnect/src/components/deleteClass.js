import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function DeleteDatabase(){
    const [courseName, setCourseName] = useState('')
const [courseId, setCourseId] = useState('')
const [userEmail, setUserEmail] = useState('')
const [role, setRole] = useState('')
const [univName, setunivName] = useState('')
const [message,setMessage] = useState('')

    const onSubmit = async (e) => {
        try {
            const response = await fetch(`http://localhost:3001/delete-course/${univName}/${userEmail}/${courseId}`,{
                method: 'DELETE',
                // headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ univName }),
            })
            const status = await response.text()
            const message = JSON.parse(status)
            setMessage(message.message)

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
            <input
                type="text"
                className="mt-2 form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter the Class Name"
                required
                value={courseName}
                onChange={(e)=>{setCourseName(e.target.value)}}
            />

            <label className="text-danger mt-2" htmlFor="">Enter the Class ID</label>
            <input
                type="text"
                className="mt-2 form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter the Class ID"
                required
                value={courseId}
                onChange={(e)=>{setCourseId(e.target.value)}}
            />

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