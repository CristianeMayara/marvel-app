import React, { Component } from "react";
import { connect } from "react-redux";

class CharacterList extends Component {
  render() {
    return <div>List</div>;
  }
}

const mapStateToProps = state => {
  return {
    characterList: state.characterStore.characterList
  };
};

const mapDispathToProps = dispatch => {
  return {
    fetchCharacterList: () => dispatch(fetchApiCharacterList())
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CharacterList);
