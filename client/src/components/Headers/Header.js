
import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";
import StatCard from "../Cards/StatCard";
import {getStats} from '../../actions/statActions'

import {connect} from 'react-redux';

class Header extends React.Component {
  componentDidMount() {
    this.getStats();
  }

  getStats(){
    this.props.getStats();
  }

  displayStats(){
    return this.props.stats.map(stat => {
      return (
          <StatCard
              key={stat.type}
              size={stat.size}
              id={stat.type}
              title={stat.title}
              type={stat.type}
              description={stat.description}
              value={stat.value}
              comparison={stat.comparison}
              previous={stat.previous}
              max_value={stat.max_value}
              color={stat.color}
              icon={stat.icon}
              until={stat.expires}
              since={stat.last_update}
          />
      )
    });
  }

  render() {
    return (
      <>
        <div className="header bg-gradient-dark-blue pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                {this.displayStats()}
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    stats : state.stats.stats
  }
}

export default connect(mapStateToProps, {getStats})(Header);
