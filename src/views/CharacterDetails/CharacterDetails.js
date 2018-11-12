import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Col,
  Row,
  Tab,
  Tabs,
  Card,
  Button,
  MediaBox,
  Collection,
  CollectionItem
} from "react-materialize";
import {
  fetchComics,
  fetchEvents,
  fetchSeries,
  fetchStories,
  fetchCharacter
} from "../../actions/CharacterAction";
import { withRouter } from "react-router-dom";
import BaseView from "../../components/BaseView/BaseView";

class CharacterDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCharacter(this.props.match.params.id);
    this.props.fetchSeries(this.props.match.params.id);
    this.props.fetchEvents(this.props.match.params.id);
    this.props.fetchStories(this.props.match.params.id);
    this.props.fetchComics(this.props.match.params.id);
  }

  renderItem(item, index) {
    let url = item.urls ? item.urls[0].url : "";
    return (
      <CollectionItem key={index} key={index} href={url}>
        {item.title}
      </CollectionItem>
    );
  }

  renderPicture() {
    if (this.props.character) {
      let { name, thumbnail } = this.props.character;
      var stateName = name;
      var statePicture = thumbnail
        ? `${thumbnail.path}.${thumbnail.extension}`
        : "";

      if (this.props.character.settings) {
        let { name, picture } = this.props.character.settings;
        if (name) stateName = name;
        if (picture) statePicture = picture;
      }

      return <MediaBox width="100%" src={statePicture} caption={stateName} />;
    }
  }

  renderButton(item, index) {
    return (
      <Button
        node="a"
        key={index}
        href={item.url}
        className="light left"
        style={{ marginRight: 10 }}
      >
        {item.type}
      </Button>
    );
  }

  render() {
    return (
      <BaseView>
        <Card>
          <Row>
            <Col s={4} m={4}>
              {this.renderPicture()}
            </Col>

            <Col s={4} m={8}>
              <h1>{this.props.character ? this.props.character.name : ""}</h1>

              {this.props.character.urls &&
                this.props.character.urls.map((item, index) => {
                  return this.renderButton(item, index);
                })}
            </Col>
          </Row>
        </Card>

        <Tabs className="tab-demo z-depth-1">
          <Tab title="Personal data" active>
            <Card>
              <p>
                <strong>Name:</strong>{" "}
                {this.props.character ? this.props.character.name : ""}
              </p>
              <p>
                <strong>Abilities:</strong>{" "}
                {this.props.character.settings
                  ? this.props.character.settings.abilities
                  : ""}
              </p>
              <p>
                <strong>Species:</strong>{" "}
                {this.props.character.settings
                  ? this.props.character.settings.species
                  : ""}
              </p>
              <p>
                <strong>First appearance:</strong>{" "}
                {this.props.character.settings
                  ? this.props.character.settings.appearance
                  : ""}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {this.props.character.settings
                  ? this.props.character.settings.description ||
                    this.props.character.description
                  : ""}
              </p>
            </Card>
          </Tab>
          <Tab title="Series">
            <Card>
              {this.props.serieList &&
              this.props.serieList.series.length === 0 ? (
                <p>
                  <strong>There are no items to display</strong>
                </p>
              ) : (
                <Collection>
                  {this.props.serieList &&
                    this.props.serieList.series.map((item, index) =>
                      this.renderItem(item, index)
                    )}
                </Collection>
              )}
            </Card>
          </Tab>
          <Tab title="Events">
            <Card>
              {this.props.eventList &&
              this.props.eventList.events.length === 0 ? (
                <p>
                  <strong>There are no items to display</strong>
                </p>
              ) : (
                <Collection>
                  {this.props.eventList &&
                    this.props.eventList.events.map((item, index) =>
                      this.renderItem(item, index)
                    )}
                </Collection>
              )}
            </Card>
          </Tab>
          <Tab title="Stories">
            <Card>
              {this.props.storyList &&
              this.props.storyList.stories.length === 0 ? (
                <p>
                  <strong>There are no items to display</strong>
                </p>
              ) : (
                <Collection>
                  {this.props.storyList &&
                    this.props.storyList.stories.map((item, index) =>
                      this.renderItem(item, index)
                    )}
                </Collection>
              )}
            </Card>
          </Tab>
          <Tab title="Comics">
            <Card>
              {this.props.comicList &&
              this.props.comicList.comics.length === 0 ? (
                <p>
                  <strong>There are no items to display</strong>
                </p>
              ) : (
                <Collection>
                  {this.props.comicList &&
                    this.props.comicList.comics.map((item, index) =>
                      this.renderItem(item, index)
                    )}
                </Collection>
              )}
            </Card>
          </Tab>
        </Tabs>
      </BaseView>
    );
  }
}

const mapStateToProps = state => {
  return {
    character: state.characterStore.editCharacter.character,
    serieList: state.characterStore.serieList,
    eventList: state.characterStore.eventList,
    storyList: state.characterStore.storyList,
    comicList: state.characterStore.comicList
  };
};

const mapDispathToProps = dispatch => {
  return {
    fetchCharacter: characterId => dispatch(fetchCharacter(characterId)),
    fetchSeries: characterId => dispatch(fetchSeries(characterId)),
    fetchEvents: characterId => dispatch(fetchEvents(characterId)),
    fetchStories: characterId => dispatch(fetchStories(characterId)),
    fetchComics: characterId => dispatch(fetchComics(characterId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispathToProps
  )(CharacterDetails)
);
