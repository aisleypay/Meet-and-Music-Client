import React, { Component} from 'react';
import { Card, CardImg, CardTitle, CardBlock, CardSubtitle, CardText, Row } from 'reactstrap';
import {Link, Switch } from 'react-router-dom';
import {Route} from 'react-router-dom';

class SearchResults extends Component {
  render() {
    if (this.props.results === null) {
      return <article>No Results for Your Query</article>
    }

    if (this.props.results.length === 0) {
      return <article>No Results for Your Query</article>
    }

    return (
      <Row className='search-results'>
        {this.props.results.map(r => {
          return (
            <Card className='search-item'>
              <CardImg src={r.profile_pic} alt="Card image cap" />
              <CardBlock>
                <CardTitle>{r.name}</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Instrumentssss</CardText>
                <Link to={`/${r.user.id}`}>Check Me Out</Link>
              </CardBlock>
            </Card>
          )
        })}
      </Row>
    )
  }
}

export default SearchResults;
