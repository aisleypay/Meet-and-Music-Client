import React, {Component} from 'react';
import withAuth from '../hocs/withAuth';
import '../index.css';
import { Card, CardText, CardTitle, Button, CardLink, CardImg, CardImgOverlay, Col } from 'reactstrap';

class Recommendations extends Component {

  handleContactClick = (e) => {
    let recommendeeId = e.target.getAttribute('data-recommendee');
    let recommendeeType = e.target.getAttribute('data-userType');

    this.props.handleContactClick(recommendeeId, recommendeeType)
  }

  handleRejectClick = (e) => {
    let recommendeeId = e.target.getAttribute('data-recommendee');
    let recommendeeType = e.target.getAttribute('data-userType');

    this.props.handleRejection(recommendeeId, recommendeeType)
  }

  artistOnlyFields = (instruments,name) => {
    return <CardText>Looking For: {instruments.map((i, index) => `${i.instrument.name} ` )}</CardText>
  }

  bandOnlyFields = (instruments, name) => {
    return <CardText>Skilled In: {instruments.map((i, index) =>  `${i.name} ` )}</CardText>
  }

  render() {
    return (
      <Col className='recommendation-list'>
        {this.props.recommendations.filter(function(r) { return r !== null} ).map((rec, idx) => {
          return (
            <Card block className="recommendation-card text-center" key={idx} >
              <CardImg className='recommendataion-pic' width="100%" src={rec.profile_pic} alt="Card image cap" />
              <CardImgOverlay>
                <article className='recommendation-card-content'>
                  <CardTitle>{rec.name}</CardTitle>
                  { this.props.user.meta_type === 'Artist' ? this.artistOnlyFields(rec.band_instrument_preferences) : this.bandOnlyFields(rec.instruments, rec.name) }
                  <CardText>Genres: {rec.genres.map((g, index) => `${g.name} ` )}</CardText>
                  <CardLink href={`/${rec.user.id}`}>Check Me Out</CardLink>
                  <Button
                    data-recommendee={rec.user.id}
                    data-userType={`${rec.user.meta_type}`}
                    onClick={this.handleContactClick }>Will Contact</Button>
                  <Button
                    data-recommendee={rec.user.id}
                    data-userType={`${rec.user.meta_type}`}
                    onClick={this.handleRejectClick}>Reject</Button>
                </article>
              </CardImgOverlay>
            </Card>
          )
        })}
      </Col>
    )
  }
}

export default withAuth(Recommendations)
