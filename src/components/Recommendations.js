import React, {Component} from 'react';
import withAuth from '../hocs/withAuth';
import '../index.css'
import { DecisionAdapter } from '../adapters'
import { Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, Button, CardLink} from 'reactstrap';


class Recommendations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accepted: [],
      rejected: []
    }
  }

  handleContactClick = (e) => {
    let recommendeeId = e.target.getAttribute('data-recommendee');
    let recommendeeType = e.target.getAttribute('data-userType');

    if (recommendeeType === 'Artist') {
      DecisionAdapter.bandDecision(recommendeeId, this.props.user, true)
      .then(decision => this.setState((pstate) => {
        return {
          accepted: [...pstate.accepted, decision]
        }
      }))
      .catch(function() {
        console.log('not working')
      })
    }
    console.log(this.state)
  }

  handleRejectClick = (e) => {
    let recommendeeId = e.target.getAttribute('data-recommendee');
    let recommendeeType = e.target.getAttribute('data-userType');

    if (recommendeeType === 'Artist') {
      DecisionAdapter.bandDecision(recommendeeId, this.props.user, false)
      .then(decision => this.setState((pstate) => {
        return {
          rejected: [...pstate.rejected, decision]
        }
      }))
      .catch(function() {
        console.log('not working')
      })
    }
    console.log(this.state)
  }

  render() {
    return (
      <div>
        {this.props.recommendations.map(rec => {
          return (
            <Card block className="text-center" key={rec.user.id} >
              <CardTitle>{rec.name}</CardTitle>
              <CardText>{rec.instruments.map((i, index) => { return <li key={index}>{i.name}</li> })}</CardText>
              <CardText>{rec.genres.map((g, index) => { return <li key={index}>{g.name}</li> })}</CardText>
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
