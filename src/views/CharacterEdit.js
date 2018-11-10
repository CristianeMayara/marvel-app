import React, { Component } from "react";
import { connect } from "react-redux";

class CharacterEdit extends Component {
  render() {
    return <div>Edit</div>;
  }
}

const mapStateToProps = state => {
  return {
    editCharacter: state.characterStore.editCharacter
  };
};

const mapDispathToProps = dispatch => {
  return {
    handleEditCharacter: character => dispatch(apiEditCharacter(character)),
    fetchCharacter: id => dispatch(apiFetctCharacter(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CharacterEdit);
