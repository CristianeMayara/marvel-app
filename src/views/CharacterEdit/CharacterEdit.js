import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Card, Input, Button, MediaBox } from "react-materialize";
import { withRouter } from "react-router-dom";
import { editCharacter, fetchCharacter } from "../../actions/CharacterAction";
import BaseView from "../../components/BaseView/BaseView";

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

    let stateName = "";
    let statePicture = "";
    let stateSpecies = "";
    let stateAbilities = "";
    let stateAppearance = "";
    let stateDescription = "";

    if (this.props.editCharacter.character) {
      let { name, thumbnail, description } = this.props.editCharacter.character;

      stateName = name;
      stateDescription = description;
      statePicture = `${thumbnail.path}.${thumbnail.extension}`;

      if (this.props.editCharacter.character.settings) {
        let {
          name,
          picture,
          species,
          abilities,
          appearance,
          description
        } = this.props.editCharacter.character.settings;

        if (name) stateName = name;
        if (picture) statePicture = picture;
        if (species) stateSpecies = species;
        if (abilities) stateAbilities = abilities;
        if (appearance) stateAppearance = appearance;
        if (description) stateDescription = description;
      }
    }

    this.setState({
      ...this.state,
      character: this.props.editCharacter.character,
      name: stateName,
      species: stateSpecies,
      abilities: stateAbilities,
      appearance: stateAppearance,
      description: stateDescription,
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
        <MediaBox
          width="100%"
          src={imagePreviewUrl}
          caption={this.state.name}
        />
      );
    }
  }

  render() {
    return (
      <BaseView>
        <h1>Setting Character</h1>
        <Card>
          <Row>
            <Col s={6} m={4}>
              {this.renderPicture()}
            </Col>

            <Col s={6} m={8}>
              <Input
                s={6}
                name="name"
                type="text"
                label="Name"
                onChange={this.handleChangeInput}
                placeholder={this.state.name || ""}
              />
              <Input
                s={6}
                name="abilities"
                type="text"
                label="Abilities"
                onChange={this.handleChangeInput}
                placeholder={this.state.abilities || ""}
              />
              <Input
                s={6}
                name="species"
                type="text"
                label="Species"
                onChange={this.handleChangeInput}
                placeholder={this.state.species || ""}
              />
              <Input
                s={6}
                name="appearance"
                type="text"
                label="First appearance"
                onChange={this.handleChangeInput}
                placeholder={this.state.appearance || ""}
              />
              <Input
                s={12}
                name="description"
                type="textarea"
                label="Description"
                onChange={this.handleChangeInput}
                placeholder={this.state.description || ""}
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
            </Col>
          </Row>
        </Card>
      </BaseView>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispathToProps
  )(CharacterEdit)
);
