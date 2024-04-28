import React, { useState } from 'react';
import { AiOutlineComment, AiOutlineFlag, AiOutlineUpCircle, AiOutlineUser, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Button } from 'antd';
import Cookies from 'js-cookie';
import ReplyThreads from './reply_threads';
import ENDPOINT from '../endpoint';
import Contribute from './contribute';
import axios from 'axios';
import { useEffect } from 'react';

function ThreadCards({ thread_id, card_title, id, card_description, no_replies, no_upvotes, user_name, flagged, replies, selectedCourse }) {
    const role = Cookies.get('role')
    const univName = Cookies.get('univname')

    const [flagClassName, setflagClassName] = useState('text-dark')
    const [showReplies, setShowReplies] = useState(false);
    const [showContribute, setshowContribute] = useState(false);
    const [showpopupForm, setshowpopupForm] = useState(false);
    const [message, setMessage] = useState('')
    const [showDeleteAlert, setshowDeleteAlert] = useState(false);
    const [upvoteMessage, setupvoteMessage] = useState()
    const [upvoteClass, setupvoteClass] = useState('text-dark')
    const [upvoteerror, setupvoteerror] = useState('')
    const [showUpvoteError, setShowUpvoteError] = useState(false);
    
    // const selected = selectedCourse
    // console.log('selectedCourse121212', thread_id)
    const onCommentClick = () => {
        showReplies ? setShowReplies(false) : setShowReplies(true)
        showContribute ? setshowContribute(false) : setshowContribute(true)
    }
    useEffect(() => {
        // console.log("showUpvoteError changed:", showUpvoteError);
        if(flagged){
            setflagClassName('text-danger')
        }
        if (showUpvoteError) {
            const timer = setTimeout(() => {
                setShowUpvoteError(false);
            }, 1000); // Set the timeout to 1 second (1000 milliseconds)
            
            // Clear the timeout when component unmounts or when showupvoteerror changes
            return () => clearTimeout(timer);
        }
    }, [showUpvoteError]);

    const openForm = () => {
        showpopupForm ? setshowpopupForm(false) : setshowpopupForm(true)
        setShowReplies(false)
    }

    const deleteClick = async () => {
        // console.log('thread_id', thread_id)
        // console.log('univName', univName)
        // console.log('selectedCourse', selectedCourse)
        try {
            await axios.post(`${ENDPOINT}/deletethread`, { thread_id, univName, selectedCourse })
            setMessage('Thread deleted successfully')
            setshowDeleteAlert(true)
            window.location.reload()
        } catch (error) {
            setMessage('An error occured while deleting the thread')
            setshowDeleteAlert(true)
        }
    }


    const onClose = () => {
        setshowpopupForm(false)
        setshowContribute(false)
    }

    const onFlagClick = async() => {
       if(flagClassName === 'text-dark'){
        try {
            const response = await axios.post(`${ENDPOINT}/flagthread`, { thread_id, univName, selectedCourse });
            // console.log('response', response.status == 200)
            if(response.status == 200){
                setflagClassName('text-danger')
                setMessage('Thread flagged successfully')
                setshowDeleteAlert(true)
            }
        } catch (error) {
            console.log('error', error.response.data.message)
        }
       }else{
        setMessage('You have already flagged this thread')
        setshowDeleteAlert(true)
       }
        // flagClassName == 'text-dark' ? setclassName('text-danger') : setclassName('text-dark')
    }

    const upvoteCLick = async () => {
        if(upvoteClass === 'text-dark'){
            try {
                const response = await axios.post(`${ENDPOINT}/upvotethread`, { thread_id, univName, selectedCourse });
                setupvoteMessage('Upvoted successfully');
                // Update the upvote count with the count returned from the backend
                // console.log('response', response.data.thread.upvotes)
                const updatedUpvotesCount = response.data.thread.upvotes;
                document.getElementById(`${thread_id}upvotes-count`).innerText = updatedUpvotesCount;
                setupvoteClass('text-success')
            } catch (error) {
                setupvoteMessage(error.response.data.message);
            }
        }else{
            setupvoteerror('You have already upvoted this thread');
            setShowUpvoteError(true);
        }
    }
    return (
        <div className="d-flex mt-5 align-items-center justify-content-center">
            <div className="card w-75" style={role=='professor' ? flagged ? {background: '#FDE2E2'}:{}: {}}>
                <div className="card-body">
                    <h3 className="card-title">{card_title}</h3>
                    <p className="card-text text-center">{card_description}</p>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-lg-10 col-md-6 col-sm-12 d-flex justify-content-around align-items-center">
                                <Button
                                    className='text-info'
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="See the replies"
                                    type=""
                                    icon={<AiOutlineComment size={30} />}
                                    onClick={onCommentClick} // Toggle visibility of replies
                                >
                                    {no_replies}
                                </Button>
                                {showContribute &&
                                    <Button
                                        className='text-info'
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Contribute"
                                        type=""
                                        icon={<AiOutlineEdit size={30} />}
                                        onClick={openForm}
                                    />}
                                <Button className={`${upvoteClass}`} data-toggle="tooltip" data-placement="top" title="Upvote the topic" type="" onClick={upvoteCLick} icon={<AiOutlineUpCircle size={30} />}>
                                    <span id={`${thread_id}upvotes-count`}>{no_upvotes}</span>
                                </Button>
                                {role === 'student' ? (
                                    <Button className={`${flagClassName}`} onClick={onFlagClick} data-toggle="tooltip" data-placement="top" title="Flag the content" type="" icon={<AiOutlineFlag size={30} />} />
                                ) : (
                                    <Button className='text-danger' data-toggle="tooltip" data-placement="top" title="Delete the thread" onClick={deleteClick} type="" icon={<AiOutlineDelete size={30} />} />
                                )}
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-12 d-flex justify-content-center align-items-center mt-3 mt-md-0">
                                <Button className='text-dark' type="" icon={<AiOutlineUser />}>
                                    {user_name}
                                </Button>
                            </div>
                        </div>
                    </div>
                    {showReplies && (
                        // Render replies if showReplies is true
                        <ReplyThreads thread_id={thread_id} selectedCourse={selectedCourse}
                            replies={replies} // Pass replies data to ReplyThreads component
                        />
                    )}
                    {showpopupForm && (
                        <Contribute onClose={onClose} selectedCourse={selectedCourse} thread_id={thread_id} />
                    )}
                    {showDeleteAlert && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
                            {message}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setshowDeleteAlert(false)}></button>
                        </div>
                    )}
                    {showUpvoteError && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
                        {upvoteerror}
                    </div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default ThreadCards;
