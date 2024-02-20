import PulseLoader from "react-spinners/PulseLoader";


function Loading() {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{height: "500px"}}>
            <PulseLoader
                color='#8566A5'
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Loading;