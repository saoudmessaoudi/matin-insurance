import React from 'react';
import {Button, Col, Row} from "reactstrap";
import countdown from "../../utils/countdown";
import filepath from "../../filepath";

class Comment extends React.Component{

    getDate (date){
        let value = countdown(date, true);
        if(value.substring(value.length - 6, value.length) === "{none}") {
            return value.substring(0, value.length - 6);
        }
        return countdown(date, true) + " ago";
    }

    getButtons(status){
        if(this.props.loading && this.props.loading.includes(this.props.comment.id)){
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }
        return (
            <>
                {(status === 0) &&
                <Button
                    className="button bg-gradient-green "
                    size="sm"
                    onClick={() => this.props.approve_callback(this.props.comment)}
                    style={{width: '50%', height: "fit-content"}}>

                    <i className="fas fa-check text-white"></i>
                </Button>
                }
                <Button
                    className="button bg-gradient-red"
                    size="sm"
                    onClick={  () => this.props.deny_callback(this.props.comment)}
                    style={{width:'120%', height: "fit-content"}}>
                    <i className="fas fa-times text-white"></i>
                </Button>
            </>
        )
    }

    render() {
        const {user_avatar, comment_text, user_name, date, video_title, status} = this.props.comment;

        return (
            <Row className="mb-4">
                <Col className="comment">
                    <Row className="align-items-center">
                        <div className="col" style={{width: "36px"}}>
                        <span className="avatar avatar-sm rounded-circle">
                            <img src={filepath + `/profile-pics/${user_avatar}`}/>
                        </span>
                            <h3 className="mb-0 name">
                                {user_name}
                                {
                                    (status ===0) &&
                                    <span className="font-italic text-red">
                                       {" - Waiting approval"}
                                    </span>
                                }
                            </h3>
                            <h5 className="mb-0 video">In {video_title}</h5>
                    </div>
                            <div className="text-right date">
                                {this.getDate(date)}
                            </div>
                            
                    </Row>
                    <Row>
                        <div className="col comment-content">
                        {comment_text}
                        </div>
                        <div className="btn-group text-right mr-3 mt--2">
                            {(!this.props.hide_buttons) && this.getButtons(status)}

                        </div>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default Comment;