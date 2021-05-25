
import React from "react";

// reactstrap components
import {
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import ContentCard from "../../components/Cards/ContentCard";
import Comment from "../../components/Groups/Comment";
import {getAllComments, updateComment, deleteComment} from "../../actions/commentActions";
import {connect} from 'react-redux';
import _ from "lodash";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import DetailModal from "../../components/Modals/DetailModal";

class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      is_confirm_modal_open: false,
      selected_comment:{},
      loading: []
    }
  }
  componentDidMount() {
    this.props.getAllComments();
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    if(!_.isEqual(prevProps.comments, this.props.comments)){
      this.setState({loading: [], is_confirm_modal_open:false});
    }
  }

  approveComment = (commentToApprove) => {
    const newComment = {...commentToApprove};
    newComment.status = 1;
    this.setState({loading: [...this.state.loading, newComment.id]});
    this.props.updateComment(newComment);
  }

  denyComment = (commentToApprove, confirmed) => {
    if(!confirmed){
      this.openConfirmModal(commentToApprove);
    }else {
      this.setState({loading: [...this.state.loading, commentToApprove.id]});
      this.props.deleteComment(commentToApprove);
    }
  }

  openConfirmModal = (comment) => {
    this.setState({is_confirm_modal_open: true, selected_comment: comment});
  }

  closeConfirmModal = () => {
    this.setState({is_confirm_modal_open:false, selected_comment: {}})
  }

  openConfirmModal = (comment) => {
    this.setState({is_confirm_modal_open: true, selected_comment: comment});
  }

  closeConfirmModal = () => {
    this.setState({is_confirm_modal_open:false, selected_comment: {}})
  }


  getComments = () => {
    return this.props.comments.map(comment => {
      return <Comment
                key={comment.id} 
                comment={comment} 
                toggleComments={true} 
                hide_top_button={true}
                loading={this.state.loading}
                approve_callback={this.approveComment}
                deny_callback={this.denyComment}
                />
    })
  }

  

  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
            <ContentCard
                    title="Comments"
                    top_button="See all"
                    top_callback={this.showSomething}
                    toggleComments={true}
                >
                  {this.getComments()}
            </ContentCard>
              <DetailModal
                  isOpen={this.state.is_confirm_modal_open}
                  onRequestClose={this.closeConfirmModal}
                  width="55%"
              >
                <ConfirmModal
                    title="Are you sure you want to delete this comment ?"
                    object={this.state.selected_comment}
                    onConfirm={this.denyComment}
                    onDeny={this.closeConfirmModal}
                />
              </DetailModal>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    comments: state.comments.comments
  }
}

export default connect(mapStateToProps, {getAllComments,updateComment,deleteComment})(Comments);


