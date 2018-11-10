import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCharacters, searchCharacters } from "../actions/CharacterAction";

class CharacterList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCharacters();

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChangeInput(event) {
    const { target } = event;
    const { value } = target;

    if (value) this.props.searchCharacters(value);
    else this.props.fetchCharacters();
  }

  render() {
    console.log("characterList", this.props.characterList);
    return (
      <div>
        <h1>Character List</h1>
        <input
          name="name"
          type="text"
          placeholder="Enter character name"
          onChange={this.handleChangeInput}
        />
        {this.props.characterList.characters &&
          this.props.characterList.characters.map(character => (
            <div key={character.id}>
              {character.name}
              <Link to={`/character/${character.id}`}>Edit</Link>
              <Link to={`/details/${character.id}`}>See details</Link>
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
    fetchCharacters: () => dispatch(fetchCharacters()),
    searchCharacters: name => dispatch(searchCharacters(name))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CharacterList);
