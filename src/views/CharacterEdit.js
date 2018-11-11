import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Input, Button, MediaBox } from "react-materialize";
import { editCharacter, fetchCharacter } from "../actions/CharacterAction";

class CharacterEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: {},
      name: "",
      imagePreviewUrl: ""
    };

    this.handleFileInput = this.handleFileInput.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  async componentWillMount() {
    await this.props.fetchCharacter(this.props.match.params.id);

    let statePicture = "";
    let stateName = "";

    if (this.props.editCharacter.character) {
      let { name, thumbnail } = this.props.editCharacter.character;

      stateName = name;
      statePicture = `${thumbnail.path}.${thumbnail.extension}`;

      if (this.props.editCharacter.character.settings) {
        let { name, picture } = this.props.editCharacter.character.settings;

        if (picture) statePicture = picture;
        if (name) stateName = name;
      }
    }

    this.setState({
      ...this.state,
      character: this.props.editCharacter.character,
      name: stateName,
      imagePreviewUrl: statePicture
    });
  }

  handleChangeInput(event) {
    const { target } = event;
    const { name, value } = target;

    this.state.character.settings[name] = value;

    return this.setState({ ...this.state, character: this.state.character });
  }

  handleFileInput(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    let name = event.target.name;

    reader.onloadend = () => {
      this.state.character.settings[name] = reader.result;

      this.setState({
        ...this.state,
        character: this.state.character,
        imagePreviewUrl: reader.result
      });
    };

    if (file) reader.readAsDataURL(file);
  }

  saveCharacter(character, settings) {
    this.props.handleEditCharacter(character, settings);
  }

  renderPicture() {
    let { imagePreviewUrl } = this.state;
    if (imagePreviewUrl) {
      return (
        <MediaBox width="350" src={imagePreviewUrl} caption={this.state.name} />
      );
    }
  }

  render() {
    return (
      <Row style={{}}>
        <h1>Setting Character</h1>
        {this.renderPicture()}

        <Input
          s={12}
          name="name"
          type="text"
          label="Name"
          onChange={this.handleChangeInput}
          placeholder={this.state.name || ""}
        />
        <Input
          s={12}
          type="file"
          name="picture"
          label="Change picture"
          placeholder="Select a file"
          onChange={this.handleFileInput}
        />
        <Button
          className="red right"
          sytle={{ marginRight: 10 }}
          onClick={() => {
            this.saveCharacter(
              this.state.character,
              this.state.character.settings
            );
          }}
        >
          Save
        </Button>
      </Row>
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
    fetchCharacter: id => dispatch(fetchCharacter(id)),
    handleEditCharacter: (character, settings) =>
      dispatch(editCharacter(character, settings))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CharacterEdit);
