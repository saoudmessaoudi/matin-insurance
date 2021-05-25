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

class UserAddCommentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            content : {
                new_comment : ''
            },
            error: '',
            isLoading: false
        }
    this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ content: { ...this.state.content, [e.target.name]: e.target.value} });
    }




    render() {
        const {error: state_error, changed} = this.state;
        const error = (this.props.error) ? this.props.error : state_error;

        return (
            <Card className={`shadow`}>
                <Form className="m-5" onSubmit={this.onSubmitSmtg}>
                    <h1 className="ml--3 mb-3">Add a comment</h1>
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-comment" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Add a public comment..." type="text" name="new_comment"  onChange={this.onChange}/>
                </InputGroup>
              </FormGroup>
                 
              <div className=" mt-3">
                  <Button color="primary" type="submit" >
                        Publish
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

export default connect(mapStateToProps)(UserAddCommentModal);

