import React from "react";

// reactstrap components
import {
    Col, Container, Row, Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import MainHeader from "components/Headers/MainHeader.js";
import {connect} from 'react-redux';
import {newSubmission} from "../../actions/giveawayActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import history from "../../history";
import MainFooter from "components/Footers/MainFooter";



class NewYearGivePage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            is_modal_open: false,
            loading: false,
            is_confirm_modal_open: false,
            description: "",
            first_name: (this.props.user.name)?this.props.user.name.split(" ")[0]: "",
            last_name: (this.props.user.name && this.props.user.name.split(" ")[1])?this.props.user.name.split(" ")[1]: "",
            email: this.props.user.email,
            phone : "",
            ans1 : "", 
            ans2 : "", 
            ans3 : "",
            ans4 : ""
        }
        this.onChange = this.onChange.bind(this);

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    }

    componentDidMount() {
        document.addEventListener('post_submission', e=> {
            this.setState({loading: false})
            if(e.detail.success){
                
                this.showSnackBar("Your name has been submitted for the giveaway !");
            }else{
                this.showSnackBar("Please make sure to enter all information");
                this.setState({error : true});
            }
        }, false);
    }

  


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSelectedDate(date) {
        this.setState({selectedDate: date});
    }

    isValidInput(){
        

        if(this.state.first_name.length <= 0 || this.state.last_name.length <= 0  || 
            this.state.email.length <= 0)
        {
          return {message : "Please make sure to enter all fields"}
        }

        return true;
    }

    onSubmit = (e) => {
        e.preventDefault();
        const isValid = this.isValidInput();
        if(typeof (isValid) === "object")
            return this.showSnackBar(isValid.message);
        this.setState({error: '', loading: true})
        this.props.newSubmission(this.state)
    }

    showSnackBar(message){
        const x = document.getElementById("snackbar");
        x.className = "show";

        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
        this.setState({snackbar_message: message})
    }


    render() {
      
        return (
            <>

                <MainHeader/>
                <Container>
                    <Row>
                        <Col xl="5">
                        <h1 className="display-1"><span style={{color : 'green'}}>Happy</span><span style={{color : 'red'}}> Nowruz !</span></h1>
                        </Col>
                        <Col xl="7" className="mb-5">
                        <p>Enter this giveaway to have to win one of the three $100 gift cards ! </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="5" className="giveaway-form">

                        </Col>
                    
                        <Col xl="7" sm="12" >
                        
                            <Form className="m-5" onSubmit={this.onSubmit} style={{marginBottom : '70px'}}>
                                    <h1 className="ml--3 mb-3">Enter The Giveaway </h1>
                             
                                <CardBody>

                                <FormGroup className="mb-0">
                                    <Row>
                                        <Col xl="6">
                                            <InputGroup className="input-group-alternative mb-2">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="far fa-id-badge"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="First Name"  type="text" name="first_name" value={this.state.first_name} defaultValue={(this.props.user.name)?this.props.user.name.split(" ")[0]: ""}
                                                       onChange={this.onChange} required/>
                                            </InputGroup>
                                        </Col>
                                        <Col xl="6">
                                            <InputGroup className="input-group-alternative mb-2">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fas fa-id-badge"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Last Name" value={this.state.last_name}  defaultValue={(this.props.user.name && this.props.user.name.split(" ")[1])?this.props.user.name.split(" ")[1]: ""} type="text" name="last_name"
                                                       onChange={this.onChange} required/>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl = "6">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fas fa-envelope"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Email address" defaultValue={(this.props.user.email)} value={this.state.email}  type="email" name="email"
                                               onChange={this.onChange} required/>
                                    </InputGroup>
                                        </Col>
                                        <Col xl="6">
                                            
                                        <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fas fa-phone"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Phone number (Optional)" value={this.state.phone} type="phone" name="phone"
                                               onChange={this.onChange}/>
                                    </InputGroup>
                                    
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <label htmlFor="insurance-types"><h3 className="mt-2 ml-2">Have you ever heard about IA? </h3></label>
                                   
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fas fa-arrow-right"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="..." value={this.state.ans1}  type="text" name="ans1"
                                               onChange={this.onChange} required/>
                                    </InputGroup>
                                    </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <label htmlFor="insurance-types"><h3 className="mt-2 ml-2">Would you like to know more about our products? </h3></label>
                                   
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fas fa-arrow-right"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="..." value={this.state.ans2}  type="text" name="ans2"
                                               onChange={this.onChange} required/>
                                    </InputGroup>
                                    </Col>
                                    </Row>
                                    <Row>
                                    <label htmlFor="insurance-types"><h3 className="mt-2 ml-2">Which products are you interested in?</h3></label>

                                    <select name="ans4" onChange={this.onChange} id="insurance-types" className="input-group-alternative ml-3 border-white form-control" required>
                                        <option value="Life Insurance">Life Insurance</option>
                                        <option value="Mortgage Insurance">Mortgage Insurance</option>
                                        <option value="Travel Insurance">Disability Insurance</option>
                                        <option value="Travel Insurance">Critical Illness Insurance</option>
                                        <option value="Travel Insurance">RRESP RRSP TFSA</option>
                                        <option value="Savings">Savings</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    
                                    </Row>
                                    <Row>
                                        <Col>
                                        <label htmlFor="insurance-types"><h3 className="mt-2 ml-2">Would you like to be contacted to have more information?</h3></label>
                                   
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fas fa-arrow-right"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="..." value={this.state.ans3}  type="text" name="ans3"
                                               onChange={this.onChange} required/>
                                    </InputGroup>
                                    </Col>
                                    </Row>
                                </FormGroup>
                                <div className=" mt-3">
                                <p style={{color: 'red', fontSize: 14}}>{this.state.error}</p>
                                    <Button color="primary"
                                            type="submit"
                                            className="mt-2 center"
                                    >
                                        {
                                            this.state.loading ?
                                                <div className="spinner-border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                                :
                                                "Submit"
                                        }
                                    </Button>
                                </div>
                                </CardBody>
                            </Form>
                        </Col>
                    </Row>
                </Container>

                <div id="snackbar">{this.state.snackbar_message}</div>

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        giveaway: state.submissions.submission,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {newSubmission})(NewYearGivePage);
