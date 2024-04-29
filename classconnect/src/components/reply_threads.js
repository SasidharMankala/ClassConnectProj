import React, { useState } from 'react';
import { AiOutlineComment, AiOutlineFlag, AiOutlineUpCircle, AiOutlineUser, AiOutlineDelete, AiFillCheckCircle } from "react-icons/ai";
import { Button } from 'antd';
import Cookies from 'js-cookie';
import axios from 'axios';
import ENDPOINT from '../endpoint';

function ReplyThreads({ thread_id, replies, selectedCourse }) {
    const role = Cookies.get('role')
    const [flagClassName, setclassName] = useState('text-dark')
    const univName = Cookies.get('univname')
    const reply_id = replies
    const [deletMessage, setDeleteMessage] = useState('')
    const [upvoteClass, setupvoteClass] = useState('text-dark')
    

    const deleteThread = async (id) => {
        console.log('thread_id', thread_id)
        console.log('univName', univName)
        console.log('selectedCourse', selectedCourse)
        console.log('reply_id', id)
        try {
            await axios.post(`${ENDPOINT}/deletereplythread`, { thread_id, univName, selectedCourse, reply_id: id })
            setDeleteMessage('Thread deleted successfully')
            window.location.reload()
        } catch (error) {
            setDeleteMessage('Internal server error try again later')
        }
    }

    const onUpvoteClick = async (id, upvotes) => {
        if (upvoteClass === 'text-dark') {
            try {
                const response = await axios.post(`${ENDPOINT}/upvotereply`, { thread_id, univName, selectedCourse, reply_id: id })
                // window.location.reload()
                const updatedUpvotesCount = upvotes + 1;
                // console.log('updatedUpvotesCount', updatedUpvotesCount)
                document.getElementById(`${id}upvotes-count`).innerText = updatedUpvotesCount;
                console.log((`${id}upvotes-count`))
                setupvoteClass('text-success')
            } catch (error) {
                console.error(error)
            }
        }
    }

    const onCorrectClick = async (id) => {
        try {
            const response = await axios.post(`${ENDPOINT}/setcorrect`, { thread_id, univName, selectedCourse, reply_id: id })
            console.log(response.data.message)
            if(response.data.message === "Reply marked as correct"){
                window.location.reload()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const onFlagClick = (id) => {
        if(flagClassName === 'text-dark'){
            try {
                const response = axios.post(`${ENDPOINT}/flagreplythread`, { thread_id, univName, selectedCourse, reply_id:id })
                // setclassName(`${id} text-danger`)
                document.getElementsByClassName(`${id}`)[0].classList.add('text-danger')
            } catch (error) {
                console.log('error', error.response.data.message)
            }
        }
        
    }
    return (
        <div>
            {replies.length !== 0 ?
                replies.map(reply => (
                    <div key={reply.id} className="d-flex mt-3 align-items-center justify-content-center">
                        <div className="card w-75" style={role =='student' ? reply.prof_marked_correct ? { background: '#F1FDE2' } : {} : role == 'professor' && reply.flagged ? {background:'#FDE2E2'}:{}}>
                            <div className="card-body">
                                <p className={reply.prof_marked_correct ? "card-text text-center text-success" : "card-text text-center"}>{reply.description}</p>
                                <div className="container mt-3">
                                    <div className="row">
                                        <div className="col-lg-10 col-md-6 col-sm-12 d-flex  justify-content-around align-items-center">
                                            <Button className={`${upvoteClass}`} data-toggle="tooltip" onClick={() => { onUpvoteClick(reply._id, reply.upvotes) }} data-placement="top" title="Upvote the topic" type="" icon={<AiOutlineUpCircle size={30} />}><span id={`${reply._id}upvotes-count`}>{reply.upvotes}</span></Button>
                                            {role === 'professor' && (
                                                <Button onClick={()=>{onCorrectClick(reply._id)}} className={reply.prof_marked_correct ? 'text-success' : 'text-dark'} type='' icon={<AiFillCheckCircle size={30}/>}></Button>
                                            )}

                                            {role === 'student' ? (
                                                <Button className={reply.flagged ? 'text-danger' : `${reply._id}`} onClick={()=>{onFlagClick(reply._id)}} data-toggle="tooltip" data-placement="top" title="Flag the content" type="" icon={<AiOutlineFlag size={30} />} />
                                            ) : (
                                                <Button className='text-danger' data-toggle="tooltip" data-placement="top" title="Delete the thread" type="" onClick={() => { deleteThread(reply._id) }} icon={<AiOutlineDelete size={30} />} />
                                            )}
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-sm-12 d-flex justify-content-center align-items-center mt-3 mt-md-0">
                                            <Button type="" icon={<AiOutlineUser />}>
                                                {role === 'professor' ? reply.user_posted : 'anonymous'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) :
                <div className="d-flex mt-3 align-items-center justify-content-center">
                    <div className="card w-50">
                        <div className="card-body">
                            <p className="card-text text-center">No replies here click on edit icon to contribute</p>
                        </div>
                    </div></div>
            }
        </div>
    );
}

export default ReplyThreads;
