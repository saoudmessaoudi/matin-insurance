import React from "react";

// reactstrap components
import {
    Card, CardBody, CardHeader, CardFooter,
    Col, Container, Row, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Button, Form
} from "reactstrap";
import MainHeader from "components/Headers/MainHeader.js";
import {connect} from 'react-redux';
import _ from "lodash";
import history from "../../history";
import {requestPass} from "../../actions/userActions";


class Forgot extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            error: '',
            loading: false,
        }
        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this)
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if(prevState.email !== this.state.email){
            this.setState({changed:true});
          }
    }

    componentDidMount() {

        document.addEventListener('request_pass', e=> {


            if(e.detail.success){
             
                this.sendDisplayValid();

            }else{
              this.sendDisplayError();
                console.log("INVALID");
            }
        }, false);
    }

   

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    submit(e){
        e.preventDefault();
        this.props.requestPass(this.state.email);
      }

    sendDisplayValid(){     
      document.getElementById('send-email').style.display = "none";
      document.getElementById("resend-email").style.display="inline-block";
      document.getElementById("email-sent-message").style.display="inline-block";
  
    }
    sendDisplayError(){
      document.getElementById('send-email').style.display = "none";
      document.getElementById("resend-email").style.display="inline-block";
      document.getElementById("email-sent-message-error").style.display="inline-block";
  
    }

    renterEmail(){
    }

    showSnackBar(message){
        const x = document.getElementById("snackbar");
        x.className = "show";

        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        this.setState({snackbar_message: message})
    }

    render() {
        return (
            <>
                <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Enter the e-mail address linked to your account</small>
              </div>
              <Form role="form" onSubmit={this.submit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" name="email" type="email"  onChange={this.onChange} required/>
                  </InputGroup>
                </FormGroup>
              
                <div className="text-center">
                  <Button color="primary" type="submit" id="send-email">
                    Send code
                  </Button>
                  <p id="email-sent-message" style={{display : 'none', color : 'green'}}><em>An email has been sent</em></p>
                  <p id="email-sent-message-error" style={{display : 'none', color : 'red'}}><em>No account is linked to this address</em></p>
                  <Row>
                  <Button 
                    className="bg-info center mt-2"
                     style={{width: '40%', height: '40%', display : 'none'}}
                     id="resend-email"
                     onClick={() => window.location.reload(false)}>
                    Re-enter e-mail
                  </Button>
                  </Row>
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


export default connect(null, {requestPass})(Forgot);
