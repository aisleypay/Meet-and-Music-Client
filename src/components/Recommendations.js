import React, {Component} from 'react';
import withAuth from '../hocs/withAuth';
import '../index.css';
import { Card, CardText, CardTitle, Button, CardLink} from 'reactstrap';

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
    return <CardText>{instruments.map((i, index) => { return <li key={Math.random() * 100000 +1}>{i.instrument.name}</li> })}</CardText>
  }

  bandOnlyFields = (instruments, name) => {
    return <CardText>{instruments.map((i, index) => { return <li key={Math.random() * 100000 +1}>{i.name}</li> })}</CardText>
  }

  render() {
    return (
      <div>
        {this.props.recommendations.filter(function(r) { return r !== null} ).map((rec, idx) => {
          return (
            <Card block className="text-center" key={idx} >
              <CardTitle>{rec.name}</CardTitle>
              { this.props.user.meta_type === 'Artist' ? this.artistOnlyFields(rec.band_instrument_preferences) : this.bandOnlyFields(rec.instruments, rec.name) }
              <CardText>{rec.genres.map((g, index) => { return <li key={Math.random() * 100000 +1}>{g.name}</li> })}</CardText>
              <CardLink href={`/${rec.user.id}`}>Check Me Out</CardLink>
              <Button
                data-recommendee={rec.user.id}
                data-userType={`${rec.user.meta_type}`}
                onClick={this.handleContactClick }>Will Contact</Button>
              <Button
                data-recommendee={rec.user.id}
                data-userType={`${rec.user.meta_type}`}
                onClick={this.handleRejectClick}>Reject</Button>
            </Card>
          )
        })}
      </div>
    )
  }
}

export default withAuth(Recommendations)
