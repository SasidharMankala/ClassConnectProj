function DeleteDatabase(){

    const deletebuttonhandle=()=>{
        window.location.reload()
    }
    const cancelbuttonhandle=()=>{
        window.location.reload();
    }

    return (
        <div className="mt-2 form-group" style={{width:'70%'}}>
            <p className="text-center text-danger fw-bold" >Danger Zone!!</p>
            <label className='text-danger'htmlFor="">Enter the University you want to delete</label>
            <input
                type="text"
                className="mt-2 form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter the University Name"
                required
            />

            <label className="text-danger mt-2" htmlFor="">Enter the University ID</label>
            <input
                type="text"
                className="mt-2 form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter the University ID"
                required
            />

           <div className="d-flex justify-content-around">
           <button className="btn text-light mt-3 w-100" onClick={deletebuttonhandle} style={{ backgroundColor: '#FA7B7B' }} >
                Delete
            </button>
            <button className="btn mt-3 w-100" onClick={cancelbuttonhandle} style={{ backgroundColor: '#93ED91' }} >
                Cancel
            </button> 
           </div>
        </div>
    )
}

export default DeleteDatabase;