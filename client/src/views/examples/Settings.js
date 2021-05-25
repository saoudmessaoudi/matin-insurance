
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import ChangePassModal from "../../components/Modals/ChangePassModal";
import ChangeContactModal from "../../components/Modals/ChangeContactModal";
import DetailModal from "../../components/Modals/DetailModal";
import {changePass, changeEmail} from "../../actions/userActions";
import {getAdminInfo, updateAdminInfo} from "../../actions/adminActions";
import {connect} from 'react-redux'
import validateEmail from "../../utils/validateEmail";
import _ from "lodash";

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email : "",
      contact : this.props.contact,
      is_pass_modal_open: false,
      is_contact_modal_open: false
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getAdminInfo();
    document.addEventListener('change_email', e=> {
      if(e.detail.success){
        this.showSnackBar("Email updated !");
      }else{
        this.showSnackBar("Something went wrong");
      }
    }, false);
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    if(!_.isEqual(prevProps.contact, this.props.contact)){
      this.setState({contact: this.props.contact});
    }
  }

  //Password Modal Handlers
  openPassModal = (e) => {
    if(e)
      e.preventDefault();
    this.setState({is_pass_modal_open: true});
  }

  onChange(e) {
    this.setState({  [e.target.name]: e.target.value});
  }

  closePassModal = (e, updated, error) => {
    if(e)
      e.preventDefault();
    this.setState({is_pass_modal_open:false})
    if(updated)
      this.showSnackBar("Password updated !");
    if(error)
      this.showSnackBar("Something went wrong");
  }

  modalSubmitPass = (formContent) => {
    this.props.changePass(formContent);
  }

  //Contact Modal Handlers 
  openContactModal = (e) => {
    if(e)
      e.preventDefault();
    this.setState({is_contact_modal_open: true});
  }

  closeContactModal = (e, updated) => {
    if(e)
      e.preventDefault();
    this.setState({is_contact_modal_open:false})
    if(updated)
      this.showSnackBar("Info updated !");
  }

  modalSubmitContact = (formContent) => {
    this.props.updateAdminInfo(formContent);
  }

  updateEmail = e => {
      e.preventDefault();
      if(!validateEmail(this.state.email) || this.state.email.length < 5)
        return this.showSnackBar("Invalid Email");
      this.props.changeEmail(this.state.email);
  }

  showSnackBar(message){
    const x = document.getElementById("snackbar");
    x.className = "show";

    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    this.setState({snackbar_message: message})
  }

  render() {
    const modal_width = (window.innerWidth < 600) ? "10%": undefined;

    return (
      <>
        <UserHeader />
        {/* Page content */}
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Admin Account
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup >
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>

                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Enter new email address"
                              name="email"
                              type="email"
                              onChange={this.onChange}
                              value={this.state.email}
                            />

                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup className="update-btn">
                            <Button
                                color="primary"
                                className="btn bg-red"
                                onClick={this.updateEmail}
                                size="sm"
                            >
                              Update
                            </Button>
                          </FormGroup>

                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-password"
                            >
                              Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-password"
                              defaultValue="******"
                              disabled
                            />
                          </FormGroup>
                          <Button
                            color="primary"
                            className="btn bg-red"
                            onClick={this.openPassModal}
                            size="sm"
                          >
                            Change password
                          </Button>
                        </Col>
                      </Row>
                      <DetailModal
                          isOpen={this.state.is_pass_modal_open}
                          onRequestClose={this.closePassModal}
                          width = {modal_width}
                          >
                            <ChangePassModal
                                  closeModal={this.closePassModal}
                                  onSubmit={this.modalSubmitPass}
                              />
                      </DetailModal>
                    </div>
                    <hr className="my-4" />
                    {/* Contact Info */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              value={this.state.contact.address}
                              placeholder="Home Address"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-country"
                            >
                              Phone Number
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-phone"
                                value={this.state.contact.phone}
                                placeholder="Phone"
                                disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.state.contact.city}
                              id="input-city"
                              placeholder="City"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.state.contact.country}
                              id="input-country"
                              placeholder="Country"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              value={this.state.contact.postal_code}
                              placeholder="Postal code"
                              disabled
                            />
                          </FormGroup>
                        </Col>

                        </Row>
                        <Row>                   
                        <Col lg="4">
                             <Button
                            color="primary"
                            className="btn bg-red"
                            onClick={this.openContactModal}
                            size="sm"
                          >
                            Change Information
                          </Button>
                        </Col>
                        </Row>
                    </div>
                    <DetailModal
                      isOpen={this.state.is_contact_modal_open}
                      onRequestClose={this.closeContactModal}
                      width={modal_width}
                      >
                      <ChangeContactModal
                        contact={this.state.contact}
                        closeModal={this.closeContactModal}
                        onSubmit={this.modalSubmitContact}
                     />  
              </DetailModal>
                  </Form>
                </CardBody>
              </Card>
              <div id="snackbar">{this.state.snackbar_message}</div>
        
      </>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    email: state.auth.user.email,
    contact : state.admin.info
  }
}

export default connect(mapStateToProps, {changePass, changeEmail, getAdminInfo, updateAdminInfo})(Settings);
