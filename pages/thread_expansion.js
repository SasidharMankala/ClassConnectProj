import React from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineFlag, AiOutlineUpCircle, AiOutlineUser,AiOutlineRedo } from 'react-icons/ai';
import { Button } from 'antd';
import PopUp from '../components/popup';

function ThreadExpansion({ threadData,onBack }) {
  const { id } = useParams();

  // You can also fetch the thread data from a central store or API using the thread title (id)

  return (
    <div>
      <div className="d-flex mt-5 align-items-center justify-content-center">
        <div className="card w-75">
          <div className="card-body">
            <h3 className="card-title">{threadData.thread_title}</h3>
            <p className="card-text text-center">{threadData.thread_description}</p>
            <div className="container mt-5">
              <div className="row">
                <div className="col-lg-10 col-md-6 col-sm-12 d-flex justify-content-around align-items-center">
                <Button data-toggle="tooltip" onClick={onBack} data-placement="top" title="Upvote the topic" type="" icon={<AiOutlineRedo size={20} />}>
                    Collapse the replies
                  </Button>
                  <PopUp/>
                  <Button data-toggle="tooltip" data-placement="top" title="Upvote the topic" type="" icon={<AiOutlineUpCircle size={30} />}>
                    {threadData.no_of_upvotes}
                  </Button>
                  <Button data-toggle="tooltip" data-placement="top" title="Flag the content" type="" icon={<AiOutlineFlag size={30} />} />
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12 d-flex justify-content-center align-items-center mt-3 mt-md-0">
                  <Button type="" icon={<AiOutlineUser />}>
                    {threadData.Username}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h4 className="d-flex justify-content-around mt-2">Replies</h4>
      {threadData.replies.map((reply, index) => (
        <div className="d-flex mt-3 align-items-center justify-content-center" key={index}>
          <div className="card w-50">
            <div className="card-body">
              <p className="card-text text-center">{reply.reply_description}</p>
              <div className="container mt-3">
                <div className="row">
                  <div className="col-lg-10 col-md-6 col-sm-12 d-flex justify-content-around align-items-center">
                    <Button data-toggle="tooltip" data-placement="top" title="Upvote the topic" type="" icon={<AiOutlineUpCircle size={30} />}>
                      {reply.reply_upvotes}
                    </Button>
                    <Button data-toggle="tooltip" data-placement="top" title="Flag the content" type="" icon={<AiOutlineFlag size={30} />} />
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12 d-flex justify-content-center align-items-center mt-3 mt-md-0">
                    <Button type="" icon={<AiOutlineUser />}>
                      {reply.Username}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ThreadExpansion;
