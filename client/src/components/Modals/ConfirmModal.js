import React from 'react';
import {
    Button,
    Card,
} from "reactstrap";

class ConfirmModal extends React.Component {

    render() {

        return (
            <Card className={` shadow`}>

                <div className="ml-5 mr-5 mt-2 mb-2 text-center">
                    <h2 className=" mb-3 text-center">{this.props.title}</h2>

                    <div className="text-center mt-3">
                        <Button color="gradient-success" className="bg-gradient-teal text-white" onClick={() => this.props.onConfirm(this.props.object, true)} >
                            Yes
                        </Button>
                        <Button color="gradient-danger" className="bg-gradient-danger text-white"  onClick={() => this.props.onDeny(this.props.object, true)} >
                            No
                        </Button>
                    </div>
                </div>

            </Card>
        );
    }
}

export default ConfirmModal;
