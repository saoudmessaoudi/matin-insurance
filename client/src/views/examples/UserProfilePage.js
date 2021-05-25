import React from "react";


// reactstrap components
import {
    Col, Container, Row, FormGroup, Input, Button, Form
} from "reactstrap";
import MainHeader from "components/Headers/MainHeader.js";
import DetailModal from "../../components/Modals/DetailModal";
import {connect} from 'react-redux';
import _ from "lodash";
import ChangePassModal from "../../components/Modals/ChangePassModal";
import TableCard from "../../components/Cards/TableCard";
import tableContentFromAppointments from "../../utils/tableContentFromAppointments";
import userAppointments from "../../utils/userAppointments";
import {getAppointments, updateAppointment} from "../../actions/appointmentActions";



import ChangeUserInfoModal from "components/Modals/ChangeUserInfoModal";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import UploadPicModal from "components/Modals/UploadPicModal";
import {changeAvatar, changePass, changeEmail, updateUserInfo} from "../../actions/userActions";
import validateEmail from "../../utils/validateEmail";
import filepath from "../../filepath";


class UserProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "" ,
            is_modal_open: false,
            is_confirm_modal_open: false,
            is_contact_modal_open: false,
            is_upload_modal_open: false,
            description: "",
            content: {
                new_comment: ''
            },
            error: '',
            isLoading: false,
            loading: [],
            user : this.props.user,
            imageSrc: filepath + `/profile-pics/${this.props.user.profile_img}`,
            imageHash: Date.now()
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {


        if(!_.isEqual(prevProps.appointments, this.props.appointments)){
            this.setState({loading: [], is_confirm_modal_open:false});
          }
    }

    componentDidMount() {
        document.addEventListener('change_avatar', e => {
            if (e.detail.success) {
                this.showSnackBar("Image Updated !");
                this.setState({imageSrc: filepath + `/profile-pics/${this.props.user.profile_img}`, imageHash: Date.now()})
            } else {
                this.showSnackBar("Something went wrong");
            }
        }, false);
        document.addEventListener('change_email', e=> {
            if(e.detail.success){
              this.showSnackBar("Email updated !");
            }else{
              this.showSnackBar("Something went wrong");
            }
          }, false);
        this.props.getAppointments();
    }

    updateEmail = e => {
        e.preventDefault();
        if(!validateEmail(this.state.email) || this.state.email.length < 5)
          return this.showSnackBar("Invalid Email");
        this.props.changeEmail(this.state.email);
    }
  
    //Password Modal Handlers
    openPassModal = (e) => {
        if (e)
            e.preventDefault();
        this.setState({is_pass_modal_open: true});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    closePassModal = (e, updated, error) => {
        if (e)
            e.preventDefault();
        this.setState({is_pass_modal_open: false})
        if (updated)
            this.showSnackBar("Password updated !");
        if (error)
            this.showSnackBar("Something went wrong");
    }

    modalSubmitPass = (formContent) => {
        this.props.changePass(formContent);
    }
    //Contact Modal Handlers
    openContactModal = (e) => {
        if (e)
            e.preventDefault();
        this.setState({is_contact_modal_open: true});
    }

    closeContactModal = (e, updated) => {
        if (e)
            e.preventDefault();
        this.setState({is_contact_modal_open: false})
        if (updated)
            this.showSnackBar("Info updated !");
    }

    modalSubmitContact = (formContent) => {
        this.props.updateUserInfo(formContent);
    }

    //Upload Picture Modal Handlers
    openUploadModal = (e) => {
        if (e)
            e.preventDefault();
        this.setState({is_upload_modal_open: true});
    }

    closeUploadModal = (e, updated) => {
        if (e)
            e.preventDefault();
        this.setState({is_upload_modal_open: false})
        if (updated)
            this.showSnackBar("Info updated !");
    }

    modalUploadSubmit = (file) => {
        if (file.length <= 0) {
            return this.showSnackBar("Please upload a file.")
        }
        this.props.changeAvatar(file[0]);
    }


    showSnackBar(message) {
        const x = document.getElementById("snackbar");
        x.className = "show";

        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 3000);
        this.setState({snackbar_message: message})
    }

    denyButton = (appointment, confirmed) => {
        if(!confirmed){
          this.openConfirmModal(appointment);
        }else{
          switch (appointment.status){
            case 0 :
            case 1:
            case 2:
            default:
              const newAppointment = {...appointment};
              newAppointment.status = 2;
              this.setState({loading: [...this.state.loading, newAppointment.id]});
              this.props.updateAppointment(newAppointment);
              break;
          }
        }
      }
      
  openConfirmModal = (appointment) => {
    this.setState({is_confirm_modal_open: true, selected_appointment: appointment});
  }

  closeConfirmModal = () => {
    this.setState({is_confirm_modal_open:false, selected_appointment: {}})
  }


    render() {
        const modal_width = (window.innerWidth < 600) ? "10%": undefined;
            console.log(userAppointments(this.props.appointments, this.state.user.id).length===0);
    


        return (
            <>
                <MainHeader/>
                <Container className="mt-4" fluid className = "mb-5">
                    <Row>
                        <Col id="avatar-col" xs="4" style={{borderRight: '1px solid #333'}}>
                <span className="ml-4 mt-4 avatar avatar-xl rounded-circle"
                      style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}
                        >
                      <img
                          alt="..."
                          src={`${this.state.imageSrc}?${this.state.imageHash}`}
                      />
                </span>
                            <div className="ml-5 mt-5">
                                <Button
                                    style={{color: "#f5365c", border: '2px solid #f5365c'}}
                                    onClick={this.openUploadModal}
                                >
                                    Upload Picture
                                </Button>
                            </div>
                            <DetailModal
                                isOpen={this.state.is_upload_modal_open}
                                onRequestClose={this.closeUploadModal}
                            >
                                <UploadPicModal
                                    closeModal={this.closeUploadModal}
                                    onSubmit={this.modalUploadSubmit}
                                />
                            </DetailModal>

                        </Col>
                                

                        <Col xs="8" id="info-col">
                                <h6 className="heading-small text-muted mb-4">
                                    My Appointments
                                </h6>
               <TableCard
                    title="All Appointments"
                    top_button="Show All"
                    hide_top_button={true}
                    top_callback={this.showMoreAppointments}
                    cols={["With","Status", "Date", "Time", "Actions"]}
                    rows={tableContentFromAppointments(userAppointments(this.props.appointments, this.state.user.id), ["status", "date", "time", "buttons"], [{callback : this.denyButton} ,{callback : this.denyButton }], true)}
                    loading={this.state.loading}
                    with_matin = {true}
                    with_images={false}
                    rowClick={e => e.preventDefault()}
                    dark={localStorage.getItem("dark") === 'true'}
                    no_appointments={userAppointments(this.props.appointments, this.state.user.id).length===0}
                    
                />
                <DetailModal
                  isOpen={this.state.is_confirm_modal_open}
                  onRequestClose={this.closeConfirmModal}
                  width="55%"
              >
                <ConfirmModal
                    title="Are you sure you want to cancel this appointment ?"
                    object={this.state.selected_appointment}
                    onConfirm={this.denyButton}
                    onDeny={this.closeConfirmModal}
                />
              </DetailModal>
                            <Form className = "mt-4">
                                <h6 className="heading-small text-muted mb-4">
                                    Connection and Security
                                </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
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
                                                    defaultValue={this.props.user.email}
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
                                                className="btn bg-red mb-4"
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
                                    <Row>
                                    <h6 className="heading-small text-muted mb-4">
                                        Personal Information
                                    </h6>
                                    </Row>
                                    <Row>
                                   
                                       
                                            <Col md="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-fname"
                                                    >
                                                        First Name
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-fname"
                                                        value={(this.props.user.name)?this.state.user.name.split(" ")[0]: ""}
                                                        placeholder="First Name"
                                                        type="text"
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-lname"
                                                    >
                                                        Last Name
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-lname"
                                                        value={(this.state.user.name && this.state.user.name.split(" ")[1])?this.state.user.name.split(" ")[1]: ""}
                                                        placeholder="Last Name"
                                                        type="text"
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </Col>
                                             <Col lg="4">
                                                    <Button
                                                        color="primary"
                                                        className="btn bg-red mb-5"
                                                        onClick={this.openContactModal}
                                                        value="blabla"
                                                        size="sm"
                                                    >
                                                        Change Information
                                                    </Button>
                                                </Col>
                                        </Row>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                    <DetailModal
                        isOpen={this.state.is_contact_modal_open}
                        width = {modal_width}
                        onRequestClose={this.closeContactModal}
                    >
                        <ChangeUserInfoModal
                            info={this.state.info}
                            closeModal={this.closeContactModal}
                            onSubmit={this.modalSubmitContact}
                        />
                    </DetailModal>
                </Container>
                
                <div id="snackbar">{this.state.snackbar_message}</div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.auth.user.email,
        user: state.auth.user,
        appointments : state.appointments.appointments
    }
}

export default connect(mapStateToProps, {updateAppointment, getAppointments, changeAvatar, changeEmail, changePass, updateUserInfo})(UserProfilePage);
