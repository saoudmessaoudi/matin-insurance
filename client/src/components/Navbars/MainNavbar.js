
import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {logout} from "../../actions/userActions";

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
  Row
} from "reactstrap";
import filepath from "../../filepath";
var HtmlHeader = require("../../statics/header.html")

// import HtmlHeader from '../../statics/header.html'

class MainNavbar extends React.Component {

  logout = (e) =>{
    e.preventDefault();
    this.props.logout();
  }
 
 

  render() {
    const {user} = this.props;
    return (
      <>
      
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main" style={{
          background: "#106eea",
          padding: "0"}}>
          <Container fluid className="pl-0">
              <span dangerouslySetInnerHTML={{__html: HtmlHeader}}></span>

        
              <Nav className="align-items-center d-md-flex navbar-nav" navbar id="user-nav"> 
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={filepath + `/profile-pics/${(this.props.logged_in) ? user.profile_img : "not-logged-in.png"}`}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block" >
                      <span className="mb-0 text-sm font-weight-bold">
                        {user.name}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" id="user-dropdown-menu" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  
                  <DropdownItem to="/profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>{(this.props.logged_in) ? 'My profile' : 'Login'}</span>
                  </DropdownItem>
                  
                
                  <DropdownItem className="d-block d-lg-none" divider />
                  <DropdownItem to="/index.html" className="d-block d-lg-none">
                    <i className="fas fa-home" />
                    <span>Home</span>
                  </DropdownItem>
                  <DropdownItem to="/video" className="d-block d-lg-none" tag={Link}>
                    <i className="fas fa-photo-video" />
                    <span>Videos</span>
                  </DropdownItem>
                  <DropdownItem to="/appointment" className="d-block d-lg-none" tag={Link}>
                    <i className="fas fa-id-card" />
                    <span>Contact</span>
                  </DropdownItem>
              
                  {(this.props.logged_in) && <>
                    <DropdownItem divider />
                  <DropdownItem onClick={this.logout}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                  </>
                  }
                  

                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {user: state.auth.user, 
    logged_in : state.auth.logged_in 
  }
}


export default connect(mapStateToProps, {logout})(MainNavbar);
