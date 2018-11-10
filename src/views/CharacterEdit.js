import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCharacter } from "../actions/CharacterAction";

class CharacterEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: {},
      imagePreviewUrl: ""
    };

    this.handleFileInput = this.handleFileInput.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  async componentWillMount() {
    await this.props.fetchCharacter(this.props.match.params.id);

    this.setState({
      ...this.state,
      character: this.props.editCharacter.character,
      imagePreviewUrl: `${this.props.editCharacter.character.thumbnail.path}.${
        this.props.editCharacter.character.thumbnail.extension
      }`
    });
  }

  handleChangeInput(event) {
    const { target } = event;
    const { value } = target;

    if (value) this.props.searchCharacters(value);
    else this.props.fetchCharacters();
  }

  handleFileInput(event) {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({ imagePreviewUrl: reader.result });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img style={{ maxWidth: 250, maxHeight: 250 }} src={imagePreviewUrl} />
      );
    }

    return (
      <div>
        <h1>Setting Character</h1>
        <div>{$imagePreview}</div>
        Name:
        <input
          name="name"
          type="text"
          placeholder="Enter character name"
          onChange={this.handleChangeInput}
          value={this.state.character.name || ""}
        />
        <br />
        <input
          name="name"
          type="file"
          placeholder="Choose a new picture"
          onChange={this.handleFileInput}
        />
        <br />
        <button type="button" onClick={() => {}}>
          Save
        </button>
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
    fetchCharacter: id => dispatch(fetchCharacter(id))
    // handleEditCharacter: character => dispatch(editCharacter(character)),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CharacterEdit);
