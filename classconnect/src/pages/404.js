import { Link } from "react-router-dom";


function NotFound(){
    return(
        <div className="d-flex flex-column align-items-center justify-content-center"  style={{ backgroundColor: '#EDDBFF', minHeight: '100vh' }}>
            <img src="./404.jpeg"></img>
            <Link to={'/'} className="btn btn-secondary mt-5"> Back to Login Page</Link>
        </div>
    )
}

export default NotFound;