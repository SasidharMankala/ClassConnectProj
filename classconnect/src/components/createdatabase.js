function CreateDatabase() {

    const createbuttonhandle = ()=>{
        window.location.reload();
    }

    const cancelbuttonhandle = () =>{
        window.location.reload();
    }

    return (
        <div className="mt-2 form-group" style={{width:'70%'}}>
            <p className="text-center fw-bold" >Welcome!!</p>
            <label htmlFor="">Enter the University name</label>
            <input
                type="text"
                className="mt-2 form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter the University Name"
                required
            />

            <label className="mt-2" htmlFor="">Enter the University ID</label>
            <input
                type="text"
                className="mt-2 form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter the University ID"
                required
            />

           <div className="d-flex justify-content-around">
           <button className="btn btn-primary mt-3 w-100" onClick={createbuttonhandle}>
                Create
            </button>
            <button className="btn text-white mt-3 w-100" onClick={cancelbuttonhandle} style={{ backgroundColor: '#FA7B7B' }}>
                Cancel
            </button>
           </div>
        </div>
    )
}

export default CreateDatabase;