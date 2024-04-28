import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AiOutlinePlus } from "react-icons/ai";
import '../css/PopUp.css'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { message } from 'antd';
import ENDPOINT from '../endpoint';

function AddNewThread({ selectedCourse, selectedCourseThreads }) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')
    const [useremail, setUseremail] = useState('')
    const [univName, setUnivName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [flag, setFlag] = useState()
    const [flagMessage, setflagMessage] = useState('')
    const [categories, setcategories] = useState()
    const [category_scores, setcategory_scores] = useState()
    const [similarThread, setSimilarThread] = useState('')


    const postThread = async () => {
        let tagsArray = tags.split(',')

        await fetch(`${ENDPOINT}/addthread`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ useremail, univName, title, description, tagsArray, selectedCourse }),
        })
    }

    useEffect(() => {
        const temp = Cookies.get('email')
        setUseremail(temp)
        const temp2 = Cookies.get('univname')
        setUnivName(temp2)

    })

    const similarCheck = async (e) => {
        e.preventDefault()
        console.log('courseId', typeof (selectedCourse))
        const threads = JSON.stringify(selectedCourseThreads)

        console.log('similar check', selectedCourseThreads)
        const apiKey = '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';
        const apiUrl = 'https://api.openai.com/v1/chat/completions';

        const question = `here are some threads

       ${threads} 

        here is another thread 
        ${title}, ${description}, ${tags.split(',')}
        
        see the descriptions and the title of the all the threads that i provided and find the similar thread in the threads and tell me only the thread _id of that no explanation needed in this format {thread_id: _id of the thread}
        if there are no similar threads return "No similar threads found"
        
        `;

        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant.'
                    },
                    {
                        role: 'user',
                        content: question
                    }
                ]
            })
        })
            .then(response => response.json())
            .then(data => {
                // Log the completion messages
                console.log('Message from chatgpt', data.choices[0].message.content);
                const pattern = /{thread_id:\s*([^\s]+)}/;
                

                // Find all matches of the pattern in the sample string
                const matches = data.choices[0].message.content.match(pattern);
                 console.log('matches', matches)
                // Extracting the thread ID
                if (matches && matches.length > 1) {
                    const threadId = matches[1];
                    console.log("Extracted Thread ID:", threadId);
                    const thread = selectedCourseThreads.find(thread => String(thread._id) === threadId);
                    console.log('thread', thread)
                    setSimilarThread(thread)
                } else {
                    console.log("No thread ID found in the sample string.");
                    onSubmit()
                }

                console.log({ title }, { description }, { tags })
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const onSubmit = async () => {

        const keywords = tags.split(',').map(keyword => keyword.trim());

        // Check if each keyword starts with '#'
        const validKeywords = keywords.every(keyword => keyword.startsWith('#'));

        if (!validKeywords) {
            setErrorMessage('Please enter the keyword with a prefix "#" and separate the keywords with a comma');
            return
        } else {
            setErrorMessage('');
        }


        if (title == '' || description == '' || tags == '') {
            return
        }

        const url = 'https://api.openai.com/v1/moderations'
        const key = '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'
        await fetch('https://api.openai.com/v1/moderations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + key // Assuming you have your API key stored in an environment variable
            },
            body: JSON.stringify({
                input: description
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
                setFlag(data.results[0].flagged)
                setcategories(data.results[0].categories)
                setcategory_scores(data.results[0].category_scores)

                if (data.results[0].flagged) {

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
                } else {
                    postThread()
                    window.location.reload();
                }

            })
            .catch(error => {
                console.log(error)
            });


    }

    const cancelClick = ()=>{
        setTitle('')
        setDescription('')
        setTags('')
        setSimilarThread('')
    }
    return (
        <Popup trigger={<button className="floating-button" data-toggle="tooltip" data-placement="top" title="Ask a question"><AiOutlinePlus size={30} /></button>} modal>
            {close => (
                <div className="text-editor-popup container">
                    <form>
                        <div className='d-flex flex-column'>
                            <label className='m-1'>Enter your question:</label>
                            <input className="form-control" rows="1" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="Enter the brief of your topic" required></input>
                            <label className='m-1'>Enter the description:</label>
                            <textarea className="form-control span6" rows="10" value={description} onChange={(e) => { setDescription(e.target.value) }} columns='100' placeholder="Enter your response" required></textarea>
                            <label className='m-1'>Enter at least 5 keywords with "#" in the start and seperated with ",":</label>
                            <input className="form-control" rows="1" value={tags} onChange={(e) => (setTags(e.target.value))} placeholder="#software, #agile, #networkinglayers" required></input>
                            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
                            {
                                flagMessage &&
                                <div className='text-danger'>
                                    {flagMessage}
                                    {/* <p>Categories : {categories}</p>
                                <p>Category Scores: {category_scores}</p> */}
                                </div>
                            }
                            {similarThread &&
                                <>
                                    <div className=''>
                                        <p className='text-danger'>There is a similar question:</p>
                                        <div className="d-flex mt-3 align-items-center justify-content-center" >
                                            <div className="btn card w-75" style={{ border: '2px solid transparent' }} onMouseOver={(e) => e.currentTarget.style.borderColor = '#8566A5'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'} >
                                                <div className='card-titile'> <h5>Titile :{similarThread.title}</h5></div>
                                                <div className="card-body"></div>
                                                <p>Description: {similarThread.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        Do you still want to post this question? <div className='btn' onClick={onSubmit} style={{ backgroundColor: '#8566A5', color: 'white' }}>Yes</div>
                                    </div>
                                </>
                            }
                            <div className='d-flex justify-content-around m-3'>
                                <button onClick={similarCheck} className="btn" style={{ backgroundColor: '#8566A5', color: 'white' }}>Submit</button>
                                <button onClick={() => {  close();cancelClick() }} className="close btn" style={{ backgroundColor: '#FA7B7B', color: 'white' }}>Cancel</button>
                            </div>

                        </div>
                    </form>
                </div>
            )}

        </Popup>
    )
}

export default AddNewThread;