import React from "react";

// reactstrap components
import {
    Card, CardBody, CardHeader, CardFooter,
    Col, Container, Row, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Button, Form
} from "reactstrap";
import MainHeader from "components/Headers/MainHeader.js";
import {connect} from 'react-redux';
import ContentCard from "../../components/Cards/ContentCard";
import {getVideo, cleanVideo} from "../../actions/videoActions";
import Comment from "../../components/Groups/Comment";
import {addComment, getComments} from "../../actions/commentActions";
import getVideoDetails from "../../utils/getVideoDetails";
import ReactPlayer from "react-player";
import _ from "lodash";
import authCheck from "../../utils/authCheck";
import history from "../../history";
import MainFooter from "components/Footers/MainFooter";


class VideoPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            is_modal_open: false,
            is_confirm_modal_open: false,
            description: "",
            content: {
                new_comment: ''
            },
            error: '',
            isLoading: false
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        if (this.state.description.length === 0 && !_.isEmpty(this.props.video)) {
            this.getVideoDetails();
        }
        if(this.props.video_error.length !== 0){
            history.push("/video");
        }
    }

    componentDidMount() {
        this.props.cleanVideo();
        this.props.getVideo(this.props.match.params.id);
        this.props.getComments(this.props.match.params.id);
        document.addEventListener('post_comment', e=> {
            if(e.detail.success){
                this.showSnackBar("Comment submitted for approval");
            }else{
                this.showSnackBar("Something went wrong");
            }
        }, false);
    }

    async getVideoDetails() {

        var videoData = await getVideoDetails(this.props.video.video_url);
        if (videoData.items.length < 1) {
            return;
        }
        var videoDescription = videoData.items[0].snippet.description;

        this.setState({description: videoDescription});

    }

    getComments = () => {
        return this.filterComments(this.props.comments).map(comment => {
            return <Comment key={comment.id} comment={comment} hide_buttons={true}/>
        })
    }

    filterComments = (comments) => {
        if(comments.length === 0)
            return []
        return comments.filter(function(comment) {
            return comment.status === 1;
        });
    }

    onChange(e) {
        this.setState({content: {...this.state.content, [e.target.name]: e.target.value}});
    }

    onCommentSubmit = (e) => {
        e.preventDefault();
        if(this.state.content.new_comment.length < 1)
            return this.showSnackBar("Please write a comment to post");
        this.props.addComment(this.state.content.new_comment, this.props.user, this.props.video);
        this.setState({content : {new_comment : ""}})

    }

    showSnackBar(message){
        const x = document.getElementById("snackbar");
        x.className = "show";

        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        this.setState({snackbar_message: message})
    }

    render() {
        return (
            <>
                <MainHeader/>
                <Container className="mt-4" fluid>
                    <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Row>
                            <Col xl={6}>
                                <div>
                                    <ReactPlayer width="100%" url={this.props.video.video_url}/>
                                </div>
                            </Col>
                            <Col xl={6}>
                                <Row className="align-items-center">
                                    <Col>
                                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                                            Video
                                        </h6>
                                        <h2 className="mb-0">{this.props.video.video_title}</h2>
                                        <hr/>
                                        <p style={{fontSize: '0.7rem'}}>{this.state.description}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Container>
                <Container className="mt-4 mb-4">
                    <div style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Row >
                            <div style={{width: '100%'}}>
                                <ContentCard
                                    title="Comments"
                                    hide_top_button={true}
                                    toggleComments={true}
                                    can_add_comment={true}

                                >
                                    <div className="ml-2 mr-2 mb-2">
                                        {authCheck() &&
                                            <Form onSubmit={this.onCommentSubmit}>
                                                <Row>
                                                    <Col xl={10} md={10}>
                                                        <FormGroup className="mt-0">
                                                            <InputGroup className="input-group-alternative">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="fas fa-comment"/>
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input autoComplete="off" placeholder="Add a public comment..." type="text"
                                                                       value={this.state.content.new_comment} name="new_comment" onChange={this.onChange}/>
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col xl={2} md={2}>
                                                        <div>
                                                            <Button id="send_button"color="success" className="full-width" type="submit">
                                                                Send
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        }

                                        {this.getComments()}

                                    </div>
                                </ContentCard>
                            </div>

                        </Row>
                    </div>
                </Container>
                <div id="snackbar">{this.state.snackbar_message}</div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        video: state.videos.video,
        video_error: state.videos.videos_error,
        comments: state.comments.comments,
        user : state.auth.user
    }
}

export default connect(mapStateToProps, {getVideo, getComments, cleanVideo, addComment})(VideoPage);
