
import React from "react";
import {connect} from 'react-redux';
import {login} from "../../actions/userActions";

// reactstrap components
import {
  Button,
  Card,
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
import {Link} from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      email: '',
      password: '',
      loading: false,
      changed:false
    }
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.email !== this.state.email || prevState.password !== this.state.password){
      this.setState({changed:true});
    }
  }

  submit(e){
    e.preventDefault();
    this.setState({error: '', isLoading: true, changed:false});
    this.props.login(this.state);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {email, password, loading, changed} = this.state;
    const {error} = this.props;
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign in with credentials</small>
              </div>
              <Form role="form" onSubmit={this.submit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" style={{color: (error && !changed) ? 'red' : ''}} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" name="email" type="email" value={email} onChange={this.onChange} autoComplete="new-email"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" style={{color: (error && !changed) ? 'red' : ''}} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" name="password" type="password" value={password} onChange={this.onChange} autoComplete="new-password"/>
                  </InputGroup>
                </FormGroup>
                {error && <p style={{color: 'red', fontSize: 12}}>Wrong email or password</p>}

                <div className="text-center">
                  <Button color="primary" type="submit" disabled={loading}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="5">
              <a href="/auth/forgot">Forgot Password?</a>
            </Col>
            <Col xs="5" className="ml-5">
            <a href="/auth/register">Create an account</a>
            </Col>
          </Row>
        
        </Col>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {error: state.auth.sign_in_error}
}

export default connect(mapStateToProps, {login})(Login);
