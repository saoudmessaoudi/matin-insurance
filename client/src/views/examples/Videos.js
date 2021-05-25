
import React from "react";
import _ from 'lodash';

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
import tableContentFromVideos from "../../utils/tableContentFromVideos";
import {getVideos, addVideo, updateVideo, deleteVideo} from "../../actions/videoActions";
import {connect} from 'react-redux';
import FormModal from "../../components/Modals/FormModal";
import DetailModal from "../../components/Modals/DetailModal";
import ConfirmModal from "../../components/Modals/ConfirmModal";

class Videos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          is_modal_open: false,
          is_confirm_modal_open: false,
          selected_video:{},
          loading:[],
          videos: this.props.videos,
          videoTableContent: [{
            title: "Loading...",
            italic : true,
            donTrim : false,
            contents: []
          }]
        }
      }

  componentDidMount() {
    this.props.getVideos();
    this.getVideoDetails();
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    if(!_.isEqual(prevState.videos, this.props.videos)){
      this.getVideoDetails();
    }
  }


  getVideoDetails = async() =>{
    const content = await tableContentFromVideos(this.state.videos, ["title", "views", "likes", "dislikes", "buttons"], [{callback:this.editVideo},{callback: this.deleteVideo}]);
    this.setState({videos: this.props.videos, videoTableContent : content, loading: [], is_confirm_modal_open:false, selected_video: {}})
  }

  editVideo = (video, confirmed) => {
    if(!confirmed){
      this.setState({selected_video:video})
      this.openModal();
    }else{
      this.props.updateVideo({...video, id: this.state.selected_video.id})
    }
  }

  addVideo = (e, video) => {
    e.preventDefault();
    this.props.addVideo(video);
  }

  deleteVideo = (video, confirmed) => {
    if(!confirmed){
      this.openConfirmModal(video);
    }else{
      this.props.deleteVideo(video);
    }
  }


  videoClick = (e, id) => {
    e.preventDefault();
    const url = this.props.videos[this.props.videos.findIndex(x => x.id === id)].video_url;
    const win = window.open(url, '_blank');
    win.focus();
  }

  openModal = (e) => {
    if(e)
      e.preventDefault();
    this.setState({is_modal_open: true});
  }

  closeModal = (e) => {
    e.preventDefault();
    this.setState({is_modal_open:false, selected_video: {}})
  }

  openConfirmModal = (video) => {
    this.setState({is_confirm_modal_open: true, selected_video: video});
  }

  closeConfirmModal = () => {
    this.setState({is_confirm_modal_open:false, selected_video: {}})
  }

  modalSubmit = (e, video) => {
    if(e)
      e.preventDefault();
    if(_.isEmpty(this.state.selected_video))
      this.addVideo(e, video);
    else
      this.editVideo(video, true);
    this.closeModal(e);
  }
  

  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
            <TableCard
                    title="Video Activity"
                    top_button="Add Video"
                    top_callback={this.openModal}
                    hide_top_button = {false}
                    add_new_vid = {true}
                    cols={["", "Title", "Views", "Likes", "Dislikes", "Actions"]}
                    with_images={true}
                    loading={this.state.loading}
                    rows={this.state.videoTableContent}
                    rowClick={this.videoClick}
                    dark={localStorage.getItem("dark") === 'true'}
                />
                 <DetailModal
                  isOpen={this.state.is_modal_open}
                  onRequestClose={this.closeModal}
              >
                  <FormModal
                      dark={localStorage.getItem("dark") === 'true'}
                      closeModal={this.closeModal}
                      object={this.state.selected_video}
                      onSubmit={this.modalSubmit}
                  />
              </DetailModal>

              <DetailModal
                  isOpen={this.state.is_confirm_modal_open}
                  onRequestClose={this.closeConfirmModal}
                  width="55%"
              >
                <ConfirmModal
                    title="Are you sure you want to delete this video ?"
                    object={this.state.selected_video}
                    onConfirm={this.deleteVideo}
                    onDeny={this.closeConfirmModal}
                />
              </DetailModal>
            </div>
          </Row>
          <Row className="mt-5">
            <div className="col">
              {/* TODO: PUT CALENDAR SCHEDULE IN HERE */ }
            </div>
          </Row>
         
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    videos: state.videos.videos
  }
}

export default connect(mapStateToProps, {getVideos, addVideo, updateVideo, deleteVideo})(Videos);


