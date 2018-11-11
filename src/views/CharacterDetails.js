import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab, Tabs, Card, Collection, CollectionItem } from "react-materialize";
import { fetchSeries, fetchCharacter } from "../actions/CharacterAction";
import BaseView from "../components/BaseView";

class CharacterDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCharacter(this.props.match.params.id);
    this.props.fetchSeries(this.props.match.params.id);
  }

  renderItem(item, index) {
    return (
      <Card key={index}>
        <CollectionItem key={index} href={item.resourceURI}>
          {item.name}
        </CollectionItem>
      </Card>
    );
  }

  renderSeries() {}
  renderDetails() {}

  render() {
    console.log(this.props.character);
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
              <Collection>
                {this.props.serieList &&
                  this.props.serieList.series.available &&
                  this.props.serieList.series.items.map((item, index) =>
                    this.renderItem(item, index)
                  )}
              </Collection>
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
    serieList: state.characterStore.serieList
  };
};

const mapDispathToProps = dispatch => {
  return {
    fetchCharacter: id => dispatch(fetchCharacter(id)),
    fetchSeries: characterId => dispatch(fetchSeries(characterId))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CharacterDetails);
