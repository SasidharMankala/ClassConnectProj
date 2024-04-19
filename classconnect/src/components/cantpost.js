import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from 'react';



function Cantpost() {

    const [resultText, setResultText] = useState('Harm')

    return (
        <Popup trigger={ <button type="submit" className="btn" style={{ backgroundColor: '#8566A5', color: 'white' }}>Submit</button>} modal>
            {close => (
                <div className="text-editor-popup container">
                   
                        <div className='d-flex flex-column'>
                            <p>You cannot post this content cause your response contains <b className='text-danger'>{resultText}</b> content</p>
                                <button type="submit" className="btn" style={{ backgroundColor: '#8566A5', color: 'white', }}>Okay</button>
                        </div>
                   
                </div>
            )}

        </Popup>
    )
}

export default Cantpost;