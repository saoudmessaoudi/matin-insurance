
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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import {connect} from 'react-redux';
import {singup} from "../../actions/userActions";


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:"",
      last_name:"",
      email:"",
      password: "",
      password_confirmation: ""
    }
    this.submitAccount = this.submitAccount.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('signup', e=> {
        if(!e.detail.success){

            this.showSnackBar(e.detail.message);
        }
    }, false);
}

  onChange(e) {
    this.setState({  [e.target.name]: e.target.value});
  }

  isValid = () => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if(strongRegex.test(this.state.password) || mediumRegex.test(this.state.password)) {
      if(this.state.password === this.state.password_confirmation)return true
      else {
        this.showSnackBar("Passwords do not match")
        return false
      }
    }
    this.showSnackBar("Password is invalid")


    return false
  }

  submitAccount(e) {
    e.preventDefault();
    this.setState({error: '', isLoading: true, changed:false});
    if(this.isValid()) {
      this.props.singup(this.state);
    }
  }

  showSnackBar(message){
    const x = document.getElementById("snackbar");
    x.className = "show";

    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    this.setState({snackbar_message: message})
  }

  render() {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    let strength = {text: "insufficient", class: 'text-danger'}
    if(strongRegex.test(this.state.password)) {
      strength = {text: "strong", class: 'text-success'}
    } else if(mediumRegex.test(this.state.password)) {
      strength = {text: "medium", class: 'text-warning'}
    }
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign up with credentials</small>
              </div>
              <Form role="form" onSubmit={this.submitAccount}>
                <FormGroup>
                  <InputGroup className="input-group-alternative d-inline-flex" style={{width:'48%'}}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="First Name" name="first_name" value={this.state.first_name} onChange={this.onChange} type="text" required/>
                  </InputGroup>
                  <InputGroup className="input-group-alternative d-inline-flex" style={{width:'48%', float:'right'}}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Last Name" name="last_name" value={this.state.last_name} onChange={this.onChange} type="text" required />
                </InputGroup>
                </FormGroup>


                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" name="email" value={this.state.email} onChange={this.onChange} autoComplete="new-email" required/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative d-inline-flex" style={{width:'48%'}}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-lock-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.onChange}  autoComplete="new-password" required/>
                  </InputGroup>
                  <InputGroup className="input-group-alternative d-inline-flex" style={{width:'48%', float:'right'}}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-lock-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password Confirmation" type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.onChange}  autoComplete="new-password" required/>
                  </InputGroup>
                </FormGroup>

                <div className="text-muted font-italic">
                  <small>
                    password strength:{" "}
                    <span className={`${strength.class} font-weight-700`}>{strength.text}</span>
                  </small>
                </div>
                
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <div id="snackbar">{this.state.snackbar_message}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {error: state.auth.sign_up_error}
}
export default connect(mapStateToProps, {singup})(Register);
