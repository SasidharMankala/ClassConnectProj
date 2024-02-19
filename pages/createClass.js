import { backgroundColor } from "../components/colors";

function CreateClass() {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center" style={{ backgroundColor: backgroundColor, minHeight: '100vh' }}>
            <img src="./full_logo.png" alt="Logo" className="img-fluid mx-auto d-block mb-4" />
            <div className="login-form container border rounded d-flex justify-content-center align-items-center p-4" style={{ maxWidth: '40%', backgroundColor: 'white' }}>
                <form className="w-100" >
                    <div className="mt-2 form-group">
                        <p className="text-center fw-bold" >Welcome Professor</p>
                        <label htmlFor="">Enter the course name</label>
                        <input
                            type="text"
                            className="mt-2 form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter the Course Name"
                            required
                        />
                    </div>
                    <div className="mt-2 form-group">
                        <label htmlFor="exampleInputPassword1">Enter the Course ID</label>
                        <input
                            type="text"
                            className="mt-2 form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter the Course ID"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 w-100">
                        Create the Class
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateClass;