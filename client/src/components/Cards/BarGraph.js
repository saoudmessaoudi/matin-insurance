import React from 'react';
import {Card, CardBody, CardHeader, Row} from "reactstrap";
import {Bar} from "react-chartjs-2";
import {appointmentChart, chartOptions, parseOptions, setAppointments} from "../../utils/charts";
import Chart from "chart.js";

class BarGraph extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeNav: 1,
            chartExample1Data: "data1"
        };
        if (window.Chart) {
            setAppointments(props.appointments);
            parseOptions(Chart, chartOptions());
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        setAppointments(this.props.appointments);
    }

    render() {
        return (
            <Card className="shadow">
                <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                        <div className="col">
                            <h6 className="text-uppercase text-muted ls-1 mb-1">
                                {this.props.subtitle}
                            </h6>
                            <h2 className="mb-0">{this.props.title}</h2>
                        </div>
                    </Row>
                </CardHeader>
                <CardBody>
                    {/* Chart */}
                        <div className="chart" style={{height: '260px'}}>
                            <Bar
                                data={appointmentChart().data}
                                options={appointmentChart().options}
                            />
                        </div>
                </CardBody>
            </Card>
        );
    }
}

export default BarGraph;