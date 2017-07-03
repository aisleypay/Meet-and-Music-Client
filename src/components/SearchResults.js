import React, { Component} from 'react';
import { Container, Card, CardImg, CardTitle, CardBlock, CardSubtitle, CardText } from 'reactstrap';
import {Link } from 'react-router-dom'

const SearchResults = ({ results }) => {

  return (
    <Container>
    {results.map(r => {
      return (
        <Card>
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
          <CardBlock>
            <CardTitle>{r.name}</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Instrumentssss</CardText>
            <Link to={`/${r.user.id}`}>Check Me Out</Link>
          </CardBlock>
        </Card>
      )
    })}
    </Container>
  )
}

export default SearchResults;
