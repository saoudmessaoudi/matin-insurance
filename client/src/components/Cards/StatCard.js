import React from "react";
import {Card, CardBody, CardTitle, Col, Row} from "reactstrap";
import countdown from "../../utils/countdown";

class StatCard extends React.Component {

    getPercentage(num1, num2, comparison){
        let percentage = (num1*100.0/num2);
        if (comparison==="previous")
            if(num2 !==0)
                percentage= Math.abs((num1-num2)*100/num2);
            else
                return 1000;
        if(Math.round(percentage) !== percentage) {
            percentage = percentage.toFixed(2);
        }
        return percentage;
    }

    getIndicator() {
        const {value, previous, max_value, comparison} = this.props;
        const success = (comparison === "previous" && value > previous) || (comparison === "objective" && value>=max_value);
        if(comparison !== "none")
            return (
                <span className={(success)?`text-success mr-2`:`text-danger mr-2`}>
                    {comparison === "previous" && <i className={(success)?`fa fa-arrow-up`:`fa fa-arrow-down`} />}
                    {" "}
                    {comparison === "objective" && this.getPercentage(value, max_value, comparison) + "%"}
                    {comparison === "previous" && this.getPercentage(value, previous, comparison) + "%"}
                </span>
            )

        return null;
    }

    getDateText(){
        const {comparison, since, until} = this.props;
        if(comparison === "objective")
            return (countdown(until, false) + " left")
        if(comparison === "previous") {
            let value = countdown(since, true);
            if (value.substring(value.length - 6, value.length) === "{none}") {
                value = value.substring(0, value.length - 6);
                return ("vs " + value)
            }
            return ("vs " + countdown(since, true) + " ago")
        }

    }
    render() {
        const {title, description, size, icon, color, value, percentage} = this.props;
        const prefix = (percentage)? "%": "";
        return (
            <Col lg="6" xl={`${size==="large" ? '6': '3'}`}>
                <Card className="card-stats mb-4 mb-xl-0" style={{height: '100%'}}>
                    <CardBody>
                        <Row>
                            <div className="col">
                                <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-muted mb-0"
                                >
                                    {title}
                                </CardTitle>
                                <span className="h3 font-weight-bold mb-0">
                            {description}
                            {!description && (value + prefix)}
                          </span>
                            </div>
                            <Col className="col-auto">
                                <div className={`icon icon-sm icon-shape bg-${color} text-white rounded-circle shadow`}>
                                    <i className={`fas fa-${icon}`} />
                                </div>
                            </Col>
                        </Row>
                            <p className="mt-3 mb-0 text-muted text-sm">
                                {this.getIndicator()}
                                {" "}
                                <span className="text-nowrap">{this.getDateText()}</span>
                            </p>
                    </CardBody>

                </Card>
            </Col>
        )
    }
}


export default StatCard;
