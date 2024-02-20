import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AiOutlineEdit } from "react-icons/ai";


function PopUp() {
    return (
        <Popup trigger={<button className="btn button"> <AiOutlineEdit size={20} />Contribute </button>} modal>
            {close => (
                <div className="text-editor-popup container">
                    <form>
                        <div className='d-flex flex-column'>
                            <label className='m-1'>Enter your response:</label>
                            <textarea className="form-control span6" rows="10" columns='100' placeholder="Enter your response" required></textarea>
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

export default PopUp;