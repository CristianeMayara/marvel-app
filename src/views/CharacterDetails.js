import React, { Component } from "react";
import { connect } from "react-redux";

class CharacterDetails extends Component {
  render() {
    return <div>Details</div>;
  }
}

const mapStateToProps = state => {
  return {
    serieList: state.characterStore.serieList
  };
};

const mapDispathToProps = dispatch => {
  return {
    // fetchSerieList: characterId => dispatch(apiFetctSerieList(characterId))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CharacterDetails);
