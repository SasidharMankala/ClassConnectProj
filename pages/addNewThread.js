import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AiOutlinePlus } from "react-icons/ai";
import '../css/PopUp.css'

function AddNewThread() {
    return (
        <Popup trigger={<button className="floating-button" data-toggle="tooltip" data-placement="top" title="Ask a question"><AiOutlinePlus size={30} /></button>} modal>
            {close => (
                <div className="text-editor-popup container">
                    <form>
                        <div className='d-flex flex-column'>
                            <label className='m-1'>Enter your question:</label>
                            <input className="form-control" rows="1" placeholder="Enter the brief of your topic" required></input>
                            <label className='m-1'>Enter the description:</label>
                            <textarea className="form-control span6" rows="10" columns='100' placeholder="Enter your response" required></textarea>
                            <label className='m-1'>Enter at least 5 keywords with "#" in the start and seperated with ",":</label>
                            <input className="form-control" rows="1" placeholder="#software, #agile, #networkinglayers" required></input>
                            <div className='d-flex justify-content-around m-3'>
                                <button type="submit" className="btn" style={{ backgroundColor: '#8566A5', color: 'white' }}>Submit</button>
                                <button onClick={() => { close() }} className="close btn" style={{ backgroundColor: '#FA7B7B', color: 'white' }}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

        </Popup>
    )
}

export default AddNewThread;