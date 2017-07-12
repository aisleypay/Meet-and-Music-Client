import React, { Component } from 'react';
import withAuth from '../hocs/withAuth';
import FontAwesome from 'react-fontawesome';
import {
  Card,
  CardText,
  CardTitle,
  Button,
  CardLink,
  CardImg,
  Row,
  CardBlock,
  CardSubtitle,
} from 'reactstrap';

class Recommendations extends Component {

  handleContactClick = (e) => {
    const recommendeeId = e.target.getAttribute('data-recommendee');
    const recommendeeType = e.target.getAttribute('data-userType');
    this.props.handleContactClick(recommendeeId, recommendeeType);
  }

  handleRejectClick = (e) => {
    const recommendeeId = e.target.getAttribute('data-recommendee');
    const recommendeeType = e.target.getAttribute('data-userType');

    this.props.handleRejection(recommendeeId, recommendeeType);
  }

  artistOnlyFields(instruments, name) {
    return <CardText>Looking For: {instruments.map(i => `${i.instrument.name} `)}</CardText>
  }

  bandOnlyFields(instruments, name) {
    return <CardText>Skilled In: {instruments.map(i => `${i.name} `)}</CardText>
  }

  render() {
    return (
      <Row className="recommendation-list">
        {this.props.recommendations.filter((r) => {
          return r !== null;
        }).map((rec) => {
          return (
            <Card className="recommendation-card">
              <CardBlock >
                <div className="float-right">
                  <Button>
                    <FontAwesome name="hand-peace-o" size="2x" onClick={this.handleContactClick} data-recommendee={rec.user.id} data-userType={`${rec.user.meta_type}`}/>
                  </Button>
                  <Button>
                    <FontAwesome name="thumbs-o-down" size="2x" data-recommendee={rec.user.id} data-userType={`${rec.user.meta_type}`} onClick={this.handleRejectClick}/>
                  </Button>
                </div>
                <div >
                  <CardTitle>{rec.name}</CardTitle>
                  <CardSubtitle>
                    {this.props.user.meta_type === 'Artist'
                      ? this.artistOnlyFields(rec.band_instrument_preferences)
                      : this.bandOnlyFields(rec.instruments, rec.name)
                    }
                  </CardSubtitle>
                </div>
              </CardBlock>
              <CardImg className="recommendation-pic" src={rec.profile_pic} alt="Broken Link" />
              <CardBlock>
                <CardText>Genres: {rec.genres.map(g => `${g.name} `)}</CardText>
                <Button size="md" block>
                  <CardLink href={`/${rec.user.id}`}>Check Me Out</CardLink>
                </Button>
              </CardBlock>
            </Card>
          );
        })}
      </Row>
    );
  }
}

export default withAuth(Recommendations);
