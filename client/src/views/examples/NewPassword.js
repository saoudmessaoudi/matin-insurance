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
import {changePassByToken, checkPassId} from "../../actions/userActions";


class Forgot extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password:"",
            password_confirm: "",
            error: '',
            isLoading: false
        }
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

    }

    componentDidMount() {
        this.props.checkPassId(this.props.match.params.id);
        document.addEventListener('check_pass_id', e=> {
            if(e.detail.success){
                console.log("VALIDD");
            }else{
              history.push("/auth/forgot")
              console.log("no work");
            }
        }, false);
        document.addEventListener('change_pass_forgot', e=> {
            if(e.detail.success){
                console.log("UPDATED");
            }else{
                console.log("NOT UPDATED");
            }
        }, false);
    }

   

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    submit(e){
        e.preventDefault();
        this.props.changePassByToken(this.props.match.params.id, this.state.password);
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
                <small>Choose a new password </small>
              </div>
              <Form role="form" onSubmit={this.submit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-unlock" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="New password" name="password" type="password" value={this.state.password}  onChange={this.onChange}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-unlock" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Confirm new password" name="password_confirm" type="password" value={this.state.password_confirm} onChange={this.onChange}/>
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button color="primary" type="submit">
                    Update Password
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


export default connect(null, {checkPassId, changePassByToken})(Forgot);
