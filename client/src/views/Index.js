
import React from "react";
import {getAppointments} from "../actions/appointmentActions";
import {getAllComments} from "../actions/commentActions";
import {getVideos} from "../actions/videoActions"
import tableContentFromAppointments from "../utils/tableContentFromAppointments";
import tableContentFromVideos from "../utils/tableContentFromVideos";

import {connect} from 'react-redux';

import {
  Container,
  Row,
  Col,
} from "reactstrap";

// core components


import Header from "../components/Headers/Header";
import TableCard from "../components/Cards/TableCard";
import BarGraph from "../components/Cards/BarGraph";
import ContentCard from "../components/Cards/ContentCard";
import Comment from "../components/Groups/Comment";
import filterAppointments from "../utils/filterAppointments";
import history from "../history";

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appointments : this.props.appointments,
      videos: this.props.videos,
      videoTableContent: [{
        title: "Loading...",
        italic : true,
        donTrim : false,
        contents: []
      }]
    }
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    if(prevState.appointments.length === 0 && this.props.appointments.length>0)
      this.setState({appointments: this.props.appointments})
    if(prevState.videos.length === 0 && this.props.videos.length>0){
      this.getVideoDetails();
    }
  }


  componentDidMount() {
    this.props.getAppointments();
    this.props.getAllComments();
    this.props.getVideos();
    this.getVideoDetails();
  }

  getVideoDetails = async() =>{
    const content = await tableContentFromVideos(this.state.videos.slice(0, 2), ["title", "views", "likes", "dislikes"]);
    this.setState({videos: this.props.videos, videoTableContent : content})
  }



  showMoreAppointments = (e) => {
    e.preventDefault();
    history.push("/admin/appointments");
  }

  showAllVideos = (e) => {
    e.preventDefault();
    history.push("/admin/videos");
  }
  showAllComments = (e) => {
    e.preventDefault();
    history.push("/admin/comments");
  }

  getComments = () => {
    return this.props.comments.slice(0, 3).map(comment => {
      return <Comment key={comment.id} comment={comment} hide_buttons={true}/>
    })
  }

  videoClick = (e, id) => {
    e.preventDefault();
    const url = this.props.videos[this.props.videos.findIndex(x => x.id === id)].video_url;
    const win = window.open(url, '_blank');
    win.focus();
  }
  


  render() {
    return (
        <>
          <Header />
          <Container className="mt--7" fluid>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="8">

                <TableCard
                    title="Pending Appointments"
                    top_button="Show All"
                    top_callback={this.showMoreAppointments}
                    //cols={["With", "Status", "Date", "Time", "Actions"]}
                    //rows={tableContentFromAppointments(filterAppointments(this.props.appointments), ["status", "date", "time"],[{title:"Accept"}, {title:"Deny"}])}
                    cols={["With", "Status", "Date", "Time"]}
                    rows={tableContentFromAppointments(filterAppointments(this.props.appointments), ["status", "date", "time"])}
                    with_images={false}
                    rowClick={e => e.preventDefault()}
                    dark={localStorage.getItem("dark") === 'true'}
                />
              </Col>
              <Col xl="4">
                <BarGraph
                  title="Appointments"
                  subtitle="Overview"
                  size="250px"
                  appointments={this.state.appointments}
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mb-5 mb-xl-0" xl="4">
                <ContentCard
                    title="Comments"
                    top_button="See all"
                    top_callback={this.showAllComments}
                >
                  {this.getComments()}
                </ContentCard>
              </Col>
              <Col xl="8">
              <TableCard
                    title="Video Activity"
                    top_button="Show All"
                    top_callback={this.showAllVideos}
                    cols={["", "Title", "Views", "Likes", "Dislikes"]}
                    with_images={true}
                    rows={this.state.videoTableContent}
                    rowClick={this.videoClick}
                    dark={localStorage.getItem("dark") === 'true'}
                />
              </Col>
            </Row>
          </Container>
        </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments.appointments,
    comments: state.comments.comments,
    videos : state.videos.videos
  }
}

export default connect(mapStateToProps, {getAppointments, getAllComments, getVideos})(Index);
