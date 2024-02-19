import { AiOutlineComment, AiTwotoneFlag, AiOutlineUpCircle, AiOutlineUser } from "react-icons/ai";
import { Button } from 'antd';

function ReplyThreads(reply_card_description,no_of_upvotes, flag, user_name) {
    return (
        <div className="d-flex mt-3 align-items-center justify-content-center">

            <div className="card w-50">
                <div className="card-body">
                    <p className="card-text text-center">{reply_card_description}</p>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-lg-10 col-md-6 col-sm-12 d-flex  justify-content-around align-items-center">
                                <Button data-toggle="tooltip" data-placement="top" title="Upvote the topic" type="" icon={<AiOutlineUpCircle size={30} />}>{no_of_upvotes}</Button>
                                <Button data-toggle="tooltip" data-placement="top" title="Flag the content" type="" icon={<AiOutlineFlag size={30} />}></Button>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-12 d-flex justify-content-center align-items-center mt-3 mt-md-0">
                                <Button type="" icon={<AiOutlineUser />}>{user_name}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReplyThreads;