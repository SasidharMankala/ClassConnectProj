import { useEffect, useState } from "react";
import { backgroundColor } from "../components/colors";
import CreateDatabase from "../components/createdatabase";
import DeleteDatabase from "../components/deleteClass"
// import Loading from "../components/loading";
import PulseLoader from "react-spinners/PulseLoader";
import CreateClassCom from "../components/createClass";
import DeleteClassCom from "../components/deletedatabase";
import Logout from '../components/logout'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import DeleteDatabase from "../components/deleteClass";



function CreateClass() {
    const [createbuttonPressed, setcreatebuttonPressed] = useState(false)
    const [deletebuttonPressed, setdeletebuttonPressed] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [user, setUser] = useState()
    const [userRole, setUserRole] = useState()
    let navigate = useNavigate()

    useEffect(()=>{
        const user = Cookies.get('email')
        setUser(user)
        const role = Cookies.get('role')
        setUserRole(role)
        if(user=='student'){
            routeTohome()
        }else if(user == 'admin'){
            routeToadmin()
        }else if(user==null){
            routeTologin()
        }
    })
    const routeTologin=()=>{
        let path = '/'
        
        navigate(path)
    }
    const routeTohome=()=>{
        let path = '/home'
        
        navigate(path)
    }
    const routeToadmin=()=>{
        let path = '/adminpanel'
        
        navigate(path)
    }

    const createbutonhandle = (e) => {
        setisLoading(true)
        setTimeout(() => {
            setisLoading(false)
        }, 1000);
        e.preventDefault();
        setcreatebuttonPressed(true)
        console.log(createbuttonPressed)
    }

    const deletebuttonhandle = (e) => {
        setisLoading(true)
        setTimeout(() => {
            setisLoading(false)
        }, 1000);
        e.preventDefault();
        setdeletebuttonPressed(true)
        console.log(deletebuttonPressed)
    }

    return (
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center" style={{ backgroundColor: backgroundColor, minHeight: '100vh' }}>
            <img src="./full_logo.png" alt="Logo" className="img-fluid mx-auto d-block mb-4" />
            <div className="login-form container border rounded d-flex justify-content-center align-items-center p-4" style={{ maxWidth: '40%', backgroundColor: 'white' }}>
                {isLoading && <div className="d-flex align-items-center justify-content-center" style={{ height: "250px" }}>
                    <PulseLoader
                        color='#8566A5'
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>}
                {!isLoading && createbuttonPressed && <CreateClassCom />}
                {!isLoading && deletebuttonPressed && <DeleteDatabase />}
                {
                    !isLoading && !createbuttonPressed && !deletebuttonPressed &&
                    <form className="w-100" >
                        <div className="mt-2 form-group">
                            <p className="text-center fw-bold" >Welcome!!</p>
                            <label htmlFor="">What you want to do today</label>
                            <button onClick={createbutonhandle} className="btn btn-primary mt-3 w-100">
                                Create a Class 
                            </button>
                            <button onClick={deletebuttonhandle} className="btn text-white mt-3 w-100" style={{ backgroundColor: '#FA7B7B' }}>
                                Delete a Class 
                            </button>
                            <button onClick={Logout} className="btn btn-dark text-white mt-3 ml-3 w-50">
                                Logout
                            </button>
                        </div>

                    </form>
                }

            </div>
        </div>
    )
}

export default CreateClass;