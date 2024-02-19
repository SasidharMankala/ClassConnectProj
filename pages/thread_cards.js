import React, { useState } from 'react';
import { AiOutlineComment, AiOutlineFlag, AiOutlineUpCircle, AiOutlineUser } from 'react-icons/ai';
import { Button } from 'antd';

function ThreadCards({ card_title, id,card_description,no_replies, no_upvotes, user_name, onClick }) {
    return (
        <div className="d-flex mt-5 align-items-center justify-content-center">
            <div className="card w-75">
                <div className="card-body">
                    <h3 className="card-title">{card_title}</h3>
                    <p className="card-text text-center">{card_description}, {id}</p>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-lg-10 col-md-6 col-sm-12 d-flex justify-content-around align-items-center">
                                <Button
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="See the replies"
                                    type=""
                                    icon={<AiOutlineComment size={30} />}
                                    onClick={onClick}
                                >
                                    {no_replies}
                                </Button>
                                <Button data-toggle="tooltip" data-placement="top" title="Upvote the topic" type="" icon={<AiOutlineUpCircle size={30} />}>
                                    {no_upvotes}
                                </Button>
                                <Button data-toggle="tooltip" data-placement="top" title="Flag the content" type="" icon={<AiOutlineFlag size={30} />} />
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-12 d-flex justify-content-center align-items-center mt-3 mt-md-0">
                                <Button type="" icon={<AiOutlineUser />}>
                                   {user_name}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThreadCards;
