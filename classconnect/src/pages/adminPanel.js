import { useEffect, useState } from "react";
import { backgroundColor } from "../components/colors";
import CreateDatabase from "../components/createdatabase";
import DeleteDatabase from "../components/deletedatabase";
import PulseLoader from "react-spinners/PulseLoader";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Logout from "../components/logout";


function AdminPanel() {
    const [createbuttonPressed, setcreatebuttonPressed] = useState(false)
    const [deletebuttonPressed, setdeletebuttonPressed] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    let navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {
        if (Cookies.get('role') != 'admin') {
            routeLogin()
        }
        const email = Cookies.get('email')
        setUserEmail(email)
    })

    const routeLogin = () => {
        let path = '/'
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
        <div>
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
                    {!isLoading && createbuttonPressed && <CreateDatabase />}
                    {!isLoading && deletebuttonPressed && <DeleteDatabase />}
                    {
                        !isLoading && !createbuttonPressed && !deletebuttonPressed &&
                        <form className="w-100" >
                            <div className="mt-2 form-group">
                                <p className="text-center fw-bold" >Welcome!!</p>
                                <label htmlFor="">Hey {userEmail.split('@')[0].toUpperCase()} What you want to do today</label>
                                <button onClick={createbutonhandle} className="btn btn-primary mt-3 w-100">
                                    Create a university database
                                </button>
                                <button onClick={deletebuttonhandle} className="btn text-white mt-3 w-100" style={{ backgroundColor: '#FA7B7B' }}>
                                    Delete a university database
                                </button>
                                {/* <button onClick={Logout} className="btn btn-dark text-white mt-3 ml-3 w-50">
                                Logout
                            </button> */}
                                <Logout />
                            </div>

                        </form>
                    }

                </div>
            </div>
        </div>
    )
}

export default AdminPanel;