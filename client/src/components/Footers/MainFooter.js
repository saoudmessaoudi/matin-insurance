
/*eslint-disable*/
import React from "react";
var HtmlFooter = require("../../statics/footer.html")


// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class MainFooter extends React.Component {
  render() {
    return (
      <>
          <Container fluid>
          <span dangerouslySetInnerHTML={{__html: HtmlFooter}}></span>

          </Container>
        
      </>
    );
  }
}

export default MainFooter;
