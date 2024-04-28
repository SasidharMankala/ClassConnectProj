import { useState } from "react";
import ENDPOINT from "../endpoint";

function DeleteClassCom(){

    const [univName, setUnivname] = useState('')
    const [id, setId] = useState('')
    const [message, setMessage] = useState('')
    const [showAlert, setShowAlert] = useState(false); // New state for controlling alert visibility

    const deletebuttonhandle = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${ENDPOINT}/universities`,{
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ univName }),
            })
            if(response.status === 200){
                setMessage('University DELETED successfully');
                setShowAlert(true); // Show the danger alert
                setTimeout(() => {
                    setShowAlert(false); // Hide the alert after 5 seconds
                }, 5000);
            } else {
                const resmes = await response.text()
                setMessage(resmes)
            }
        } catch (error) {
            console.log('Error deleting University:', error)
        }
        setId('')
        setUnivname('')
    }

    const cancelbuttonhandle = () => {
        window.location.reload();
    }

    return (
        <div className="mt-2 form-group" style={{width:'70%'}}>
            <p className="text-center text-danger fw-bold" >Danger Zone!!</p>
            <label className='text-danger' htmlFor="">Enter the University you want to delete</label>
            <input
                type="text"
                className="mt-2 form-control"
                placeholder="Enter the University Name"
                required
                value={univName}
                onChange={(e)=>{setUnivname(e.target.value)}}
            />

            <label className="text-danger mt-2" htmlFor="">Enter the University ID</label>
            <input
                type="text"
                className="mt-2 form-control"
                placeholder="Enter the University ID"
                required
                value={id}
                onChange={(e)=>{setId(e.target.value)}}
            />

           <div className="d-flex justify-content-around">
           <button className="btn text-light mt-3 w-100" onClick={deletebuttonhandle} style={{ backgroundColor: '#FA7B7B' }} >
                Delete
            </button>
            <button className="btn mt-3 w-100" onClick={cancelbuttonhandle} style={{ backgroundColor: '#93ED91' }} >
                Cancel
            </button> 
           </div>
           {showAlert && ( 
                <div className="alert alert-danger position-fixed bottom-0 start-50 translate-middle-x" role="alert" style={{ zIndex: 1000 }}>
                    Database deleted successfully!
                </div>
            )}
        </div>
    )
}

export default DeleteClassCom;
