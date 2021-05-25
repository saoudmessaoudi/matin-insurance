import React from 'react';
import {
    Button,
    Card,
    Form,
    Col,
    Row,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup} from "reactstrap";
import {connect} from "react-redux";

class ChangeContactModal extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            content : {
                address : this.props.contact.address,
                city : this.props.contact.city,
                country : this.props.contact.country,
                postal_code : this.props.contact.postal_code,
                phone : this.props.contact.phone
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
        document.addEventListener('change_contact', e => {
            if(e.detail.success){
                this.props.closeModal(undefined, true);
            }else{
                this.props.closeModal(undefined, false, true);
            }
        }, false);
    }


    onSubmitContactInfo = (e) =>{
        e.preventDefault()
        this.props.onSubmit(this.state.content);
    }


    render() {
        const {error: state_error, changed} = this.state;
        const error = (this.props.error) ? this.props.error : state_error;

        return (
            <Card className={`shadow`}>
                <Form className="m-5" onSubmit={this.onSubmitContactInfo}>
                    <h1 className="ml--3 mb-3">Change Contact Information</h1>
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-map-marker"/>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="New Address" type="text" name="address" value={this.state.content.address}  onChange={this.onChange}/>
                </InputGroup>
                <Row>
                <Col xs="6">
                <InputGroup className="input-group-alternative mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className= "fas fa-city" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="New City" type="text" name="city" value={this.state.content.city} onChange={this.onChange}/>
                </InputGroup>
                </Col>
                <Col xs="6">
                <InputGroup className="input-group-alternative mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className= "fas fa-flag"/>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="New Country" type="text" name="country" value={this.state.content.country} onChange={this.onChange}/>
                </InputGroup>
                </Col>
                </Row>
                <Row>
                <Col xs="4">
                <InputGroup className="input-group-alternative mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className= "fas fa-mail-bulk" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Postal Code" type="text" name="postal_code" value={this.state.content.postal_code} onChange={this.onChange}/>
                </InputGroup>
                </Col>
                <Col xs="8">
                <InputGroup className="input-group-alternative mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className= "fas fa-phone"/>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="New Contact Phone" type="text" name="phone" value={this.state.content.phone} onChange={this.onChange}/>
                </InputGroup>
                </Col>
                </Row>
              </FormGroup>
                    {error && <p style={{color: 'red', fontSize: 12}}>{error}</p>}
              <div className=" mt-3">
                  <Button color="primary"
                   type="submit" 
                   className="center"
                   >
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

export default connect(mapStateToProps)(ChangeContactModal);

