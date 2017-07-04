import React, { Component } from 'react';
import Recommendations from './Recommendations';
import withAuth from '../hocs/withAuth';
import { RecommendationAdapter } from '../adapters';
import DecisionList from './DecisionList';
import {Row, Col, Button} from 'reactstrap';
import { DecisionAdapter } from '../adapters';

class CurrentUserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendations: [],
      accepted: [],
      rejected: []
    }
  }

  componentWillMount() {
    this.getRecommendations()
  }

  genresList(genres) {
    return genres.map(g => <li key={Math.random() * 100000 +1}>{g.name}</li>)
  }

  instrumentsList(instruments) {
    return instruments.map(i => <li key={Math.random() * 100000 +1}>{i.name}</li>)
  }

  renderUser(user, type) {
    return (
      <div>
        <img src={user.profile_pic} alt="Link Broken"/>
        <h1>{user.name}</h1>
        <h2>{user.state}</h2>
        <h2>{user.zipcode}</h2>
        { type === 'Artist' ? <h2>{user.age}</h2> : null}
        { <ul>{this.genresList(this.props.user.user_genres)}</ul>}
        { type === 'Artist' ? <h2>{user.experience_in_years}</h2> : null}
        { type === 'Artist' ? <ul>{this.instrumentsList(this.props.user_instruments)}</ul> : null}
      </div>
    )
  }

  getRecommendations = () => {
    let user = this.props.user

    if (user.meta_type === 'Band') {
      RecommendationAdapter.getBandRecommendations(user.user_info)
      .then(recommendations => this.setState({ recommendations }))
      return <Recommendations recommendations={this.state.recommendations} user={user} handleContactClick={this.addWillContact} handleRejection={this.addRejected} />
    } else {
      RecommendationAdapter.getArtistRecommendations(this.props.user.user_info)
      .then(recommendations => this.setState({ recommendations }))
      return <Recommendations recommendations={this.state.recommendations} user={user} handleContactClick={this.addWillContact} handleRejection={this.addRejected}/>
    }
  }

  addWillContact = (recommendeeId, recommendeeType) => {
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

  addRejected = (recommendeeId, recommendeeType) => {
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

  handleRejected = (e) => {
    return <DecisionList users={this.state.rejected} />
  }

  handleWillContact = (e) => {
    return <DecisionList users={this.state.accepted} />

  }

  render() {
    if (this.props.user === {} || this.state.recommendations === []) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Row>
          <Col>
            {this.renderUser(this.props.user.user_info, this.props.user.meta_type)}
          </Col>
          <Col>
            <Button onClick={this.handleWillContact}>Will Contact List</Button>
            <Button onClick={this.handleRejected}>Rejected List</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.getRecommendations()}
          </Col>
        </Row>
      </div>
    )
  }
}

export default withAuth(CurrentUserProfile)
