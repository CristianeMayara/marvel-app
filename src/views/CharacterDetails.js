import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSeries } from "../actions/CharacterAction";

class CharacterDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchSeries(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <h1>Details with Serie List</h1>
        {this.props.serieList &&
          this.props.serieList.series.available &&
          this.props.serieList.series.items.map((serie, index) => (
            <div key={index}>
              <p>Title: {serie.name}</p>
              <p>URL: {serie.resourceURI}</p>
            </div>
          ))}
      </div>
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
