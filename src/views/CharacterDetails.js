import React, { Component } from "react";
import { connect } from "react-redux";
import { Collection, CollectionItem } from "react-materialize";
import { fetchSeries } from "../actions/CharacterAction";

class CharacterDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchSeries(this.props.match.params.id);
  }

  renderItem(item, index) {
    return (
      <CollectionItem key={index} href={item.resourceURI}>
        {item.name}
      </CollectionItem>
    );
  }

  render() {
    return (
      <Collection>
        {this.props.serieList &&
          this.props.serieList.series.available &&
          this.props.serieList.series.items.map((item, index) =>
            this.renderItem(item, index)
          )}
      </Collection>
    );
  }
}

const mapStateToProps = state => {
  return {
    serieList: state.characterStore.serieList
  };
};

const mapDispathToProps = dispatch => {
  return {
    fetchSeries: characterId => dispatch(fetchSeries(characterId))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CharacterDetails);
