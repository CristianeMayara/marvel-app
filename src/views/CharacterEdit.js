import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCharacter } from "../actions/CharacterAction";

class CharacterEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: {}
    };
  }

  async componentWillMount() {
    await this.props.fetchCharacter(this.props.match.params.id);

    this.setState({
      ...this.state,
      character: this.props.editCharacter.character
    });
  }

  render() {
    return (
      <div>
        <h1>Edit</h1>
        <p>Name: {this.state.character.name}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editCharacter: state.characterStore.editCharacter
  };
};

const mapDispathToProps = dispatch => {
  return {
    // handleEditCharacter: character => dispatch(editCharacter(character)),
    fetchCharacter: id => dispatch(fetchCharacter(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CharacterEdit);
