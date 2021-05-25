import React from 'react';
import {
    Button,
    Card,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup} from "reactstrap";
import {connect} from "react-redux";

class ChangePassModal extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            content : {
                old_password : "",
                new_password : "",
                new_password_confirmation : ""
            },
            error: '',
            changed:false,
            isLoading: false,
        }
    this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ content: { ...this.state.content, [e.target.name]: e.target.value} });
    }

    componentDidMount() {
        document.addEventListener('change_pass', e => {
            if(e.detail.success){
                this.props.closeModal(undefined, true);
            }
        }, false);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.content.new_password !== this.state.content.new_password || prevState.content.new_password_confirmation !== this.state.content.new_password_confirmation || prevState.content.old_password !== this.state.content.old_password){
            this.setState({changed:true});
        }
    }


    onSubmitPassword = (e) =>{
        e.preventDefault();
        if(this.state.content.new_password !== this.state.content.new_password_confirmation)
            this.setState({error: "Passwords don't match", changed:false});
        else if (this.state.content.new_password.length < 8){
            this.setState({error: "Password must be at least 8 characters long", changed:false});
        }else{
            this.setState({error: '', isLoading: true, changed:false});
            this.props.onSubmit(this.state.content);
        }
    }


    render() {
        const {error: state_error, changed} = this.state;
        const error = (this.props.error) ? this.props.error : state_error;

        return (
            <Card className={`shadow`}>
                <Form className="m-5" onSubmit={this.onSubmitPassword}>
                    <h1 className="ml--3 mb-3">Change Password</h1>
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-lock" style={{color: (error && !changed && error !== "Passwords don't match") ? 'red' : ''}}/>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Old Password" type="password" name="old_password"  onChange={this.onChange}/>
                </InputGroup>
                <InputGroup className="input-group-alternative mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className= "fas fa-lock-open" style={{color: (error && !changed && error !== "Old password wrong") ? 'red' : ''}}/>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="New Password" type="password" name="new_password" onChange={this.onChange}/>
                </InputGroup>
                <InputGroup className="input-group-alternative mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className= "fas fa-lock-open" style={{color: (error && !changed && error !== "Old password wrong") ? 'red' : ''}}/>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Confirm New Password" type="password" name="new_password_confirmation" onChange={this.onChange}/>
                </InputGroup>
              </FormGroup>
                    {error && <p style={{color: 'red', fontSize: 12}}>{error}</p>}
              <div className=" mt-3">
                  <Button color="primary" type="submit" >
                        Change
                  </Button>
                </div>
              
            </Form>
        

            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.change_pass_error,
        message: state.auth.change_pass_message
    }
}

export default connect(mapStateToProps)(ChangePassModal);

