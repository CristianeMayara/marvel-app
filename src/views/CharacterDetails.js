import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab, Tabs, Card, Collection, CollectionItem } from "react-materialize";
import {
  fetchComics,
  fetchEvents,
  fetchSeries,
  fetchStories,
  fetchCharacter
} from "../actions/CharacterAction";
import BaseView from "../components/BaseView";

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
    return (
      <Card key={index}>
        <CollectionItem key={index} href={item.resourceURI}>
          {item.title}
        </CollectionItem>
      </Card>
    );
  }

  renderSeries() {}
  renderDetails() {}

  render() {
    return (
      <BaseView>
        <Tabs className="tab-demo z-depth-1">
          <Tab title="Personal data" active>
            <Card>
              <p>
                <strong>Abilities:</strong> abc
              </p>
              <p>
                <strong>Species:</strong> abc
              </p>
              <p>
                <strong>First appearance:</strong> abc
              </p>
              <p>
                <strong>Description:</strong> abc
              </p>
            </Card>
          </Tab>
          <Tab title="Series">
            <Card>
              {this.props.serieList &&
              this.props.serieList.series.length === 0 ? (
                <p>
                  <strong>Não há itens para mostrar</strong>
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
                  <strong>Não há itens para mostrar</strong>
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
                  <strong>Não há itens para mostrar</strong>
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
                  <strong>Não há itens para mostrar</strong>
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
    fetchCharacter: id => dispatch(fetchCharacter(id)),
    fetchSeries: characterId => dispatch(fetchSeries(characterId)),
    fetchEvents: characterId => dispatch(fetchEvents(characterId)),
    fetchStories: characterId => dispatch(fetchStories(characterId)),
    fetchComics: characterId => dispatch(fetchComics(characterId))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CharacterDetails);
