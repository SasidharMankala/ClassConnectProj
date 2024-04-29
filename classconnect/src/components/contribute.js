import React, { useState } from 'react';
import axios from 'axios';
import ENDPOINT from '../endpoint';
import Cookies from 'js-cookie';

function Contribute({ onClose, selectedCourse, thread_id }) {
    const [replyText, setReplyText] = useState('');
    const [error, setError] = useState('');
    const [erroMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')
    const [flagMessage, setflagMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!replyText.trim()) {
            setError('Please enter your response');
            return; 
        }
        // console.log('thread_id',thread_id);
        const email = Cookies.get('email');
        const univName = Cookies.get('univname');
        const reply = {
            univName: univName,
            course: selectedCourse,
            text: replyText,
            email: email,
            thread_id: thread_id
        };
        sendReply(reply);
        setReplyText('');
        // window.location.reload();
    };

    const sendReply = async (pushData) => { 

        const url = 'https://api.openai.com/v1/moderations'
        const key = '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'
        await fetch('https://api.openai.com/v1/moderations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + key // Assuming you have your API key stored in an environment variable
            },
            body: JSON.stringify({
                input: pushData.text
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('isInappropriate', data.results[0].flagged)
                console.log('categories', data.results[0].categories)
                console.log('categories', data.results[0].category_scores)
                // setFlag(data.results[0].flagged)
                // setcategories(data.results[0].categories)
                // setcategory_scores(data.results[0].category_scores)

                if(data.results[0].flagged){
                    
                        // Iterate over the keys of the categories object
                        console.log('categories', data.results[0].categories)
                        const getTrueCategoriesString = (categories) => {
                            const trueCategories = Object.keys(categories)
                                .filter(key => categories[key] === true);
                            
                            return trueCategories.join(', ');
                        };
                        
                        const trueCategoriesString = getTrueCategoriesString(data.results[0].categories);
                        console.log(trueCategoriesString);
                        
                    setflagMessage(`Your content is inappropriate. Please remove the inappropriate content and try again. Categories are as follows : ${trueCategoriesString}`)
                }else{
                    postResonses(pushData)
                    window.location.reload();
                }
                
            })

        
    }

    const postResonses = async (pushData) => {
        try {
            await axios.post(`${ENDPOINT}/addreply`, {pushData: pushData}).then((res)=>{
                console.log('res',res.data.message)
                window.location.reload();
            })
        } catch (error) {
            // console.log('error adding reply', error.response.data.message);
            setErrorMessage(error.response.data.message);
        }
    }

    const handleChange = (e) => {
        setReplyText(e.target.value);
        setError('');
    };

    return (
        <div className="d-flex mt-3 align-items-center justify-content-center">
            <div className="card w-50">
                <div className="card-body">
                    <h4>Add your reply</h4>
                    <form>
                        <div className="form-group mb-3">
                            <label htmlFor="replyText">Enter your response</label>
                            <textarea
                                value={replyText}
                                onChange={handleChange}
                                className="form-control"
                                id="replyText"
                                placeholder="Enter your response here"
                                rows='3'
                            />
                            {error && <div className="text-danger">{error}</div>}
                        </div>
                        {erroMessage && <div className="text-danger">{erroMessage}</div>}
                        {flagMessage && <div className="text-danger">{flagMessage}</div>}
                        <div className="d-grid gap-2">
                            <button className="btn" onClick={handleSubmit} style={{ backgroundColor: '#8566A5', color: 'white' }}>
                                Submit
                            </button>
                            <button type="button" className="btn" style={{ backgroundColor: '#FA7B7B', color: 'white' }} onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contribute;
