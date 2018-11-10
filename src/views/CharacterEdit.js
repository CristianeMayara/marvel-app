import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Card, Input, Button, MediaBox } from "react-materialize";
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
    const { name, value } = target;

    let { character } = this.state;
    character[name] = value;

    return this.setState({ ...this.state, character });
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
        <MediaBox
          width="350"
          src={imagePreviewUrl}
          caption={this.state.character.name}
        />
      );
    }

    return (
      <Row style={{}}>
        <h1>Setting Character</h1>
        {$imagePreview}
        <Input
          s={12}
          name="name"
          type="text"
          label="Name"
          onChange={this.handleChangeInput}
          placeholder={this.state.character.name || ""}
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
          onClick={() => {}}
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
    fetchCharacter: id => dispatch(fetchCharacter(id))
    // handleEditCharacter: character => dispatch(editCharacter(character)),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CharacterEdit);
