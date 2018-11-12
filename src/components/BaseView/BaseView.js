import React, { Component } from "react";
import PropTypes from "prop-types";
import { Footer, Navbar, NavItem, Container, Icon } from "react-materialize";

class BaseView extends Component {
  render() {
    return (
      <div>
        <Navbar
          color="red"
          fixed
          right
          brand={
            <img
              alt="Marvel"
              className="logo"
              src="http://wallpaperen.com/wp-content/uploads/2018/01/amazing-carnage-background-psd-detail-marvel-logo-official-psds-carnage-background.png"
            />
          }
        >
          <NavItem href="/characters">See all characters</NavItem>
        </Navbar>

        <div className="background">
          <Container>{!this.props.loading && this.props.children}</Container>
        </div>
        <Footer copyrights="®2018 Marvel" />
      </div>
    );
  }
}

export default BaseView;
