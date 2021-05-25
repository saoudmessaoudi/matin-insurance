import React from 'react';
import _ from 'lodash';
import {
    Button,
    Card,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup} from "reactstrap"; 

class FormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            content : {
                video_title : this.props.object.video_title,
                video_url : this.props.object.video_url,
            }
        }
    this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ content: { ...this.state.content, [e.target.name]: e.target.value} });
    }


    render() {
        return (
            <Card className={`shadow`}>

                <Form className="m-5" onSubmit={(e) => this.props.onSubmit(e, this.state.content)}>
                    <h1 className="ml--3 mb-3">{(_.isEmpty(this.props.object)) ? "Add a video" : "Edit video"}</h1>
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-signature" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Video Title" type="text" name="video_title" value={this.state.content.video_title} onChange={this.onChange}/>
                </InputGroup>
                <InputGroup className="input-group-alternative mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fab fa-youtube" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="YouTube URL" type="text" name="video_url" value={this.state.content.video_url}  onChange={this.onChange}/>
                </InputGroup>
              </FormGroup>
              <div className=" mt-3">
                  <Button color="primary" type="submit" >
                      {(_.isEmpty(this.props.object)) ? "Add a video" : "Edit video"}
                  </Button>
                </div>
              
            </Form>
        

            </Card>
        );
    }
}

export default FormModal;
