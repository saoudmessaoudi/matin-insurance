
import React from "react";
import ReactDOM from 'react-dom'

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import TableCard from "../../components/Cards/TableCard";
import {getSubmissions, deleteSubmission} from "../../actions/giveawayActions";
import {connect} from 'react-redux';
import _ from "lodash";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import DetailModal from "../../components/Modals/DetailModal";
import tableContentFromSubmissions from "../../utils/tableContentFromSubmissions";
import SelectWinnerModal from "../../components/Modals/SelectWinnerModal";
import Confetti from "react-confetti";

class GiveAway extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      is_confirm_modal_open: false,
      is_winner_modal_open: false,
      selected_submission:{},
      loading: []
    }
    this.detailModal = React.createRef()
  }
  componentDidMount() {
    this.props.getSubmissions();
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    if(!_.isEqual(prevProps.submissions, this.props.submissions)){
      this.setState({loading: [], is_confirm_modal_open:false, is_winner_modal_open:false});
    }
  }

  delete = (submission, confirmed) => {
    if(!confirmed){
      this.openConfirmModal(submission);
    }else{
      this.setState({loading: [...this.state.loading, submission.id]});
      this.props.deleteSubmission(submission.id);
    }
  }

  openConfirmModal = (submission) => {
    this.setState({is_confirm_modal_open: true, selected_submission: submission});
  }

  closeConfirmModal = () => {
    this.setState({is_confirm_modal_open:false, selected_submission: {}})
  }

  openWinnerModal = () => {
    this.setState({is_winner_modal_open: true});
  }

  closeWinnerModal = () => {
    this.setState({is_winner_modal_open:false})
  }

  selectWinner = () => {
    let randomItem = this.props.submissions[Math.floor(Math.random()*this.props.submissions.length)];
    this.setState({current_winner : randomItem})
    console.log(randomItem.name)
  }

  selectRandom = () => {
    if(this.props.submissions.length > 0) {
      this.selectWinner();
      this.openWinnerModal();
    }
    else
      this.showSnackBar("No submissions to chose from");
  }

  showSnackBar(message){
    const x = document.getElementById("snackbar");
    x.className = "show";

    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    this.setState({snackbar_message: message})
  }

  sendEmail = () => {
    window.location = "mailto:"+this.state.current_winner.email;
  }

  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
            <TableCard
                    title="All Submissions"
                    top_button="Select random"
                    hide_top_button={false}
                    top_callback={this.selectRandom}
                    cols={["Name", "Email", "Date", "Actions"]}
                    rows={tableContentFromSubmissions(this.props.submissions, ["email", "date", "buttons"],[{callback: this.delete}])}
                    loading={this.state.loading}
                    with_images={false}
                    rowClick={e => e.preventDefault()}
                    dark={localStorage.getItem("dark") === 'true'}
                />

              <DetailModal
                  isOpen={this.state.is_confirm_modal_open}
                  onRequestClose={this.closeConfirmModal}
                  width="55%"
              >
                <ConfirmModal
                    title="Are you sure you want to delete this submission ?"
                    object={this.state.selected_submission}
                    onConfirm={this.delete}
                    onDeny={this.closeConfirmModal}
                />
              </DetailModal>

              <DetailModal
                  isOpen={this.state.is_winner_modal_open}
                  onRequestClose={this.closeWinnerModal}
                  width="45%"
              >
                {
                  ReactDOM.createPortal(
                      <Confetti style={{zIndex: 12}}/>,
                  document.querySelector('#confetti')
                  )
                }

                <SelectWinnerModal
                  current_winner={this.state.current_winner}
                  onRequestNew={this.selectWinner}
                  onSendEmail={this.sendEmail}
                />
              </DetailModal>
            </div>
          </Row>
          <Row className="mt-5">
            <div className="col">
              {/* TODO: PUT CALENDAR SCHEDULE IN HERE*/ }
            </div>
          </Row>
        </Container>
        <div id="snackbar">{this.state.snackbar_message}</div>

      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    submissions: state.submissions.submissions
  }
}

export default connect(mapStateToProps, {getSubmissions, deleteSubmission})(GiveAway);


