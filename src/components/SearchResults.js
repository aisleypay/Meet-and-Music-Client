import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardImg,
  CardTitle,
  CardBlock,
  CardSubtitle,
  CardText,
  Row,
  Button,
} from 'reactstrap';

class SearchResults extends Component {

  renderInstruments(instruments) {
    return instruments.map(i => `${i.name} `);
  }

  render() {
    if (this.props.results === null) {
      return <article>No Results for Your Query</article>;
    }

    if (this.props.results.length === 0) {
      return <article>No Results for Your Query</article>;
    }

    return (
      <Row className="search-results">
        {this.props.results.map(r => {
          return (
            <Card className="search-item">
              <CardBlock>
                <CardTitle>{r.name}</CardTitle>
                <CardSubtitle>{r.genres.map(g => `${g.name} `)}</CardSubtitle>
                {r.user.meta_type === 'Artist'
                  ? <CardText>Skilled In: {this.renderInstruments(r.instruments)}</CardText>
                  : null}
              </CardBlock>
              <CardImg src={r.profile_pic} alt="Card image cap" />
              <CardBlock>
                <Button size="md" block>
                  <Link to={`/${r.user.id}`}>Check Me Out</Link>
                </Button>
              </CardBlock>
            </Card>
          );
        })}
      </Row>
    );
  }
}

export default SearchResults;
