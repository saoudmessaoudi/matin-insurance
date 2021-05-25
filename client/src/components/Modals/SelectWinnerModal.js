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


    render() {
        return (
            <Card className={`shadow`}>

                <Form className="m-5" onSubmit={(e) => this.props.onSubmit(e, this.state.content)}>
                    <h2 className="ml--3 mb-3">GiveAway Winner</h2>
              <FormGroup className="mb-0">
                      <h1 className="ml--3 mb-3">{"It's : " + this.props.current_winner.name}</h1>
                <InputGroup className="input-group-alternative mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-envelope-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="" type="text" value={this.props.current_winner.email} />
                </InputGroup>
                  <InputGroup className="input-group-alternative mt-3">
                      <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                              <i className="fas fa-dice-one"></i>
                          </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="" type="text" value={this.props.current_winner.answer1 + " - Heard about IA"} />
                  </InputGroup>
                  <InputGroup className="input-group-alternative mt-3">
                      <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                              <i className="fas fa-dice-two"></i>
                          </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="" type="text" value={this.props.current_winner.answer2 + " - Know more about Products"} />
                  </InputGroup>
                  <InputGroup className="input-group-alternative mt-3">
                      <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                              <i className="fas fa-dice-three"></i>
                          </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="" type="text" value={this.props.current_winner.answer3 + " - Contact me"} />
                  </InputGroup>
                  <InputGroup className="input-group-alternative mt-3">
                      <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                              <i className="fas fa-dice-four"></i>
                          </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="" type="text" value={this.props.current_winner.answer4 + " - Products interested in"} />
                  </InputGroup>
              </FormGroup>
              <div className=" mt-3">
                  <Button color="primary" type="button" onClick={this.props.onSendEmail}>
                      { "Email" }
                  </Button>
                  <Button color="success" type="button" onClick={this.props.onRequestNew}>
                      { "Get a new Random person" }
                  </Button>
                </div>
              
            </Form>
        

            </Card>
        );
    }
}

export default FormModal;
