import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Col, Row, Card, CardTitle, Input } from "react-materialize";
import {
  fetchCharacters,
  searchCharacters
} from "../../actions/CharacterAction";
import BaseView from "../../components/BaseView/BaseView";

class CharacterList extends Component {
  constructor(props) {
    super(props);

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  componentDidMount() {
    this.props.fetchCharacters(0);
  }

  handleChangeInput(event) {
    const { target } = event;
    const { value } = target;

    if (value) this.props.searchCharacters(value);
    else this.props.fetchCharacters(0);
  }

  renderItem(item, index) {
    let itemName = item.name;
    let itemPicture = `${item.thumbnail.path}.${item.thumbnail.extension}`;

    if (item.settings) {
      let { name, picture } = item.settings;

      if (name) itemName = item.settings.name;
      if (picture) itemPicture = item.settings.picture;
    }

    return (
      <Col m={4} key={index}>
        <Card
          header={
            <div className="card-image">
              <img alt={itemName} src={itemPicture} />
            </div>
          }
          actions={[
            <Link key={`${index}-link1`} to={`/character/${item.id}`}>
              Edit
            </Link>,
            <Link key={`${index}-link2`} to={`/details/${item.id}`}>
              See details
            </Link>
          ]}
        >
          <h5>{itemName}</h5>
        </Card>
      </Col>
    );
  }

  fetchNextPage = () => {
    if (this.props.page > 0) {
      this.props.fetchCharacters(this.props.page);
    }
  };

  render() {
    return (
      <BaseView>
        <div>
          <h1>Character List</h1>
          <Input
            s={12}
            name="name"
            type="text"
            onChange={this.handleChangeInput}
            placeholder="Search for a character"
          />
          <Row>
            <InfiniteScroll
              loader={<h4>Loading...</h4>}
              next={this.fetchNextPage}
              hasMore={true}
              dataLength={
                this.props.characterList.characters &&
                this.props.characterList.characters.length
              }
            >
              {this.props.characterList.characters &&
                this.props.characterList.characters.map((item, index) => {
                  return this.renderItem(item, index);
                })}
            </InfiniteScroll>
          </Row>
        </div>
      </BaseView>
    );
  }
}

const mapStateToProps = state => {
  return {
    page: state.characterStore.page,
    characterList: state.characterStore.characterList
  };
};

const mapDispathToProps = dispatch => {
  return {
    fetchCharacters: page => dispatch(fetchCharacters(page)),
    searchCharacters: name => dispatch(searchCharacters(name))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CharacterList);
