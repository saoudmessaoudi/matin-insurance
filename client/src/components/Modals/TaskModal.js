import React from 'react';
import {Button, Card, CardHeader, CardImg, Row, Table} from "reactstrap";

class TaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            dark: this.props.dark
        }
    }

    toggleTheme= (e) =>{
        e.preventDefault();
        localStorage.setItem("dark", (!this.state.dark).toString());
        this.setState({dark: !this.state.dark})
    }
    render() {
        const {title, image} = this.props.task;
        return (
            <Card className={`${this.state.dark && 'bg-default'} shadow`}>
                <CardHeader className={`${this.state.dark && 'bg-transparent'} border-0`}>
                    <Row className="align-items-center">
                        <div className="col">
                            <h3 className={`${this.state.dark && 'text-white'} mb-0`}>{title}</h3>
                        </div>
                        <div className="col text-right">
                            <Button
                                color="primary"
                                onClick={this.toggleTheme}
                                size="sm"
                            >
                                <i className={`fa ${this.state.dark ? 'fa-sun' : 'fa-moon'}`}/>
                            </Button>
                            <Button
                                color="primary"
                                onClick={this.props.top_callback}
                                size="sm"
                            >
                                {this.props.top_button}
                            </Button>
                        </div>
                    </Row>
                </CardHeader>
                <img alt={title} className="task-modal image" src={process.env.PUBLIC_URL + `/task_images/${image}`} />

            </Card>
        );
    }
}

export default TaskModal;