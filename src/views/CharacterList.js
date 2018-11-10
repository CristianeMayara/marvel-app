import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row, Card, CardTitle, Input } from "react-materialize";
import { fetchCharacters, searchCharacters } from "../actions/CharacterAction";

class CharacterList extends Component {
  constructor(props) {
    super(props);

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  componentDidMount() {
    this.props.fetchCharacters();
  }

  handleChangeInput(event) {
    const { target } = event;
    const { value } = target;

    if (value) this.props.searchCharacters(value);
    else this.props.fetchCharacters();
  }

  renderItem(item, index) {
    return (
      <Col m={4} s={12} key={index}>
        <Card
          className="large"
          header={
            <CardTitle
              image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
            >
              {item.name}
            </CardTitle>
          }
          actions={[
            <Link to={`/character/${item.id}`}>Edit</Link>,
            <Link to={`/details/${item.id}`}>See details</Link>
          ]}
        >
          I am a very simple card. I am good at containing small bits of
          information. I am convenient because I require little markup to use
          effectively.
        </Card>
      </Col>
    );
  }

  render() {
    return (
      <Row>
        <div>
          <h1>Character List</h1>
          <Input
            s={12}
            name="name"
            type="text"
            placeholder="Search for a character"
            onChange={this.handleChangeInput}
          />
          {this.props.characterList.characters &&
            this.props.characterList.characters.map((item, index) =>
              this.renderItem(item, index)
            )}
        </div>
      </Row>
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
