
import React from "react";

// reactstrap components
import {
  Card, CardBody, CardHeader,
  Col, Container, Row
} from "reactstrap";
import MainHeader from "components/Headers/MainHeader.js";
import {connect} from 'react-redux';
import {getVideos} from "../../actions/videoActions";
import getVideoDetails from "../../utils/getVideoDetails";
import history from "../../history";
import _ from "lodash";
import MainFooter from "components/Footers/MainFooter";


class VideoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      thumbnails: {}
    }
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    if(_.isEmpty(this.state.thumbnails) && this.props.videos.length > 0){
      this.getVideoDetails();
    }
  }

  async getVideoDetails() {
    let thumbnails = {}
    await Promise.all(this.props.videos.map(async video => {
      var videoData = await getVideoDetails(video.video_url);
      if(videoData.items.length < 1){
        return;
      }
      console.log(videoData);
      var videoThumbnail = videoData.items[0].snippet.thumbnails.standard.url;
        thumbnails = {...thumbnails, [video.id]: videoThumbnail }
    }))
    this.setState({thumbnails: thumbnails});
  }

  componentDidMount() {
    this.props.getVideos();
  }

  redirectToVideo = (video_id) => {
  
    history.push(`/video/${video_id}`);

  }

  displayVideos() {
    return this.props.videos.map((video, i) => {
      if(!video.video_url || video.video_url.length < 5){
        return null;
      }
      var video_id = video.video_url.split('v=')[1];
      if(!video_id)
        return null;
      return (

          <Col key={i} xl="4" className="mb-5">
                <div className="pl-1 pr-1">
                  <Col xl="12"
                   onClick={() => this.redirectToVideo(video.id)}
                    className="mb-1"
                    >
                    <img style={{width: '100%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} src={this.state.thumbnails[video.id]}/>
                    {this.state.thumbnails[video.id] && <div className="overlay card-img-overlay"> <div className="play"></div></div>}
                   
                  </Col>
                </div>
                <hr className="mb-1 mt-4"/>
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Video
                    </h6>
                    <h2 className="mb-0">{video.video_title}</h2>
                  </div>
                </Row>
          </Col>
      )
    })
  }

  render() {
    return (
      <>
              <MainHeader/>
      
        <Container className="mt-2" fluid>
        <h1 className="mt-3 mb-4 display-1 text-center text-muted">Video Gallery</h1>
        <hr/>
            <div>
              <Col>
                <Row className="mr-md-6 ml-md-6">
                  {this.displayVideos()}
                </Row>
              </Col>
            </div>
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

export default connect(mapStateToProps, {getVideos})(VideoList);
