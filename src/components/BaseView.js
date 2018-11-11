import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navbar, NavItem, Container, Icon } from "react-materialize";

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
              height="40px"
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/MarvelLogo.svg/1200px-MarvelLogo.svg.png"
            />
          }
        >
          <NavItem href="/characters">See all characters</NavItem>
        </Navbar>

        <div className="background">
          <Container>{!this.props.loading && this.props.children}</Container>
        </div>
      </div>
    );
  }
}

export default BaseView;
