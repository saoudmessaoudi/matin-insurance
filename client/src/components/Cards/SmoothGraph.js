import React from "react";
import {Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row} from "reactstrap";
import classnames from "classnames";
import {Line} from "react-chartjs-2";
import {chartExample1, chartOptions, parseOptions} from "../../utils/charts";
import Chart from "chart.js";

class SmoothGraph extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeNav: 1,
            chartExample1Data: "data1"
        };
        if (window.Chart) {
            parseOptions(Chart, chartOptions());
        }
    }
    toggleNavs = (e, index) => {
        e.preventDefault();
        this.setState({
            activeNav: index,
            chartExample1Data:
                this.state.chartExample1Data === "data1" ? "data2" : "data1"
        });
    };
    render() {
        return (
            <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                        <div className="col">
                            <h6 className="text-uppercase text-light ls-1 mb-1">
                                Overview
                            </h6>
                            <h2 className="text-white mb-0">Sales value</h2>
                        </div>
                        <div className="col">
                            <Nav className="justify-content-end" pills>
                                <NavItem>
                                    <NavLink
                                        className={classnames("py-2 px-3", {
                                            active: this.state.activeNav === 1
                                        })}
                                        href="#pablo"
                                        onClick={e => this.toggleNavs(e, 1)}
                                    >
                                        <span className="d-none d-md-block">Month</span>
                                        <span className="d-md-none">M</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames("py-2 px-3", {
                                            active: this.state.activeNav === 2
                                        })}
                                        data-toggle="tab"
                                        href="#pablo"
                                        onClick={e => this.toggleNavs(e, 2)}
                                    >
                                        <span className="d-none d-md-block">Week</span>
                                        <span className="d-md-none">W</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </Row>
                </CardHeader>
                <CardBody>
                    {/* Chart */}
                    <div className="chart">
                        <Line
                            data={chartExample1[this.state.chartExample1Data]}
                            options={chartExample1.options}
                            getDatasetAtEvent={e => console.log(e)}
                        />
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default SmoothGraph;