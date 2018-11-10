import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCharacters } from "../actions/CharacterAction";

class CharacterList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCharacters();
  }

  render() {
    console.log("characterList", this.props.characterList);
    return (
      <div>
        <h1>Character List</h1>
        {this.props.characterList.characters &&
          this.props.characterList.characters.map(character => (
            <div key={character.id}>
              {character.name}
              <Link to={`/character/${character.id}`}>Edit</Link>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    characterList: state.characterStore.characterList
  };
};

const mapDispathToProps = dispatch => {
  return {
    fetchCharacters: () => dispatch(fetchCharacters())
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CharacterList);
