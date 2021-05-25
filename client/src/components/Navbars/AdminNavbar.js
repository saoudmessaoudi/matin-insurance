
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
  Media
} from "reactstrap";

import filepath from "../../filepath";


class AdminNavbar extends React.Component {

  logout = (e) =>{
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const {user} = this.props;
    console.log(user);
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <span
              className="h3 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            >
              {this.props.brandText}
            </span>
            
            <Nav className="align-items-center d-md-flex navbar-nav d-none" navbar id="user-nav"> 
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={filepath + `/profile-pics/${user.profile_img}`}
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
                  <DropdownItem to="/admin" tag={Link}>
                    <i className="fas fa-chart-line" />
                    <span>Dashboard</span>
                  </DropdownItem>
                  <DropdownItem to="/profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem to="/index.html">
                    <i className="fas fa-home" />
                    <span>Home</span>
                  </DropdownItem>
                  <DropdownItem to="/video"tag={Link}>
                    <i className="fas fa-photo-video" />
                    <span>Videos</span>
                  </DropdownItem>
                  <DropdownItem to="/appointment"tag={Link}>
                    <i className="fas fa-id-card" />
                    <span>Contact</span>
                  </DropdownItem>
                  <DropdownItem className="d-block d-lg-none" divider />
                  <DropdownItem to="/" className="d-block d-lg-none" tag={Link}>
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
                  <DropdownItem divider />
                  <DropdownItem onClick={this.logout}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
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
  return {user: state.auth.user}
}


export default connect(mapStateToProps, {logout})(AdminNavbar);
