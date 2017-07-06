import React, { Component } from 'react';
import Recommendations from './Recommendations';
import withAuth from '../hocs/withAuth';
import { RecommendationAdapter } from '../adapters';
import DecisionList from './DecisionList';
import {Row, Col, Button} from 'reactstrap';
import { DecisionAdapter } from '../adapters';
import { Link, Route, Switch } from 'react-router-dom';

class CurrentUserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendations: [],
      accepted: [],
      rejected: []
    }

    this.getDecisions = this.getDecisions.bind(this)
    this.getRecommendations = this.getRecommendations.bind(this)
    this.addWillContact = this.addWillContact.bind(this)
    this.addRejected = this.addRejected.bind(this)
    this.renderRecommendations = this.renderRecommendations.bind(this)
  }

  componentDidMount() {
    this.getDecisions(this.props.user)
  }

  getDecisions = (user) => {
    DecisionAdapter.getDecisions()
    .then(decisions =>  this.setState((pstate) => {
      let accepted = decisions.filter(d => d.decider_id === user.id && d.status === true)
      let rejected = decisions.filter(d => d.decider_id === user.id && d.status === false)
      return {
        accepted: accepted,
        rejected: rejected
      }
    }))
  }

  genresList(genres) {
    return genres.map(g => <li key={Math.random() * 100000 +1}>{g.name}</li>)
  }

  instrumentsList(instruments) {
    return instruments.map(i => <li key={Math.random() * 100000 +1}>{i.name}</li>)
  }

  getRecommendations = () => {
    let user = this.props.user

    if (user.meta_type === 'Band') {
      RecommendationAdapter.getBandRecommendations(user.user_info)
      .then(recommendations => this.setState({ recommendations }))
    } else {
      RecommendationAdapter.getArtistRecommendations(this.props.user.user_info)
      .then(recommendations => this.setState({ recommendations }))
    }
  }

  renderRecommendations = () => {
    let decisions = this.state.accepted.concat(this.state.rejected).map(function(d) {return d.chosen_id})
    let newRecommendations = this.state.recommendations.filter(r => !decisions.includes(r.user.id))
    return <Recommendations recommendations={newRecommendations} user={this.props.user} handleContactClick={this.addWillContact} handleRejection={this.addRejected} />
  }

  addWillContact = (recommendeeId, recommendeeType) => {
    console.log(this.state)
    DecisionAdapter.makeDecision(recommendeeId, this.props.user, true)
    .then(decision => this.setState((pstate) => {
      return {
        accepted: [...pstate.accepted, decision]
      }
    }))
    .catch(function() {
      console.log('not working')
    })
  }

  addRejected = (recommendeeId, recommendeeType) => {
    DecisionAdapter.makeDecision(recommendeeId, this.props.user, false)
    .then(decision => this.setState((pstate) => {
      return {
        rejected: [...pstate.rejected, decision]
      }
    }))
    .catch(function() {
      console.log('not working')
    })
  }

  handleDeleteClick = (e) => {
    this.props.deleteAccount(this.props.user.user_info.id, this.props.user.meta_type)
  }

  render() {
    const { user } = this.props

    if (user === {} ) {
      return <div>Loading...</div>
    }

    if (this.state.recommendations.length === 0) {
      this.getRecommendations()
    }

    return (
      <Switch>
        <Route exact path='/profile/will-contact' render={() => <DecisionList sendEmail={this.props.sendEmail} decisions={this.state.accepted} recs={this.state.recommendations} title='Will Contact List' />}/>
        <Route exact path='/profile/rejected' render={() => <DecisionList decisions={this.state.rejected} recs={this.state.recommendations} sendEmail={this.props.sendEmail} title='Previously Rejected List'/> }/>
        <Route render={() => {
            return (
              <Col className='current-user-profile-container'>
                <Row>
                  <Col className='current-user-profile' md={{ size: 11, offset: 3  }}>
                    <Row>
                      <Col>
                        <Row>
                          <Col><img className='public-profile-pic' src={user.user_info.profile_pic} alt="Link Broken"/></Col>
                          <Col>
                            <h1>{user.user_info.name}</h1>
                            { <ul>{this.genresList(user.user_genres)}</ul>}
                            { user.meta_type === 'Artist' ? <ul>{this.instrumentsList(user.user_instruments)}</ul> : null}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={{ size: 11, offset: 1  }}>
                            <iframe className='current-user-profileplay-list' src={user.user_info.youtube_playlist_link} frameBorder="0"></iframe>
                          </Col>
                        </Row>
                        <h2>Location: {user.user_info.state}, {user.user_info.zipcode}</h2>
                        { user.meta_type === 'Artist' ? <h2>Age: {user.user_info.age}</h2> : null}
                        { user.meta_type === 'Artist' ? <h2>Year of Experience: {user.user_info.experience_in_years}</h2> : null}
                      </Col>
                      <Col>
                        <Link to={`/profile/will-contact`}>Will Contact</Link>
                        <Link to={`/profile/rejected`}>Previously Rejected</Link>
                        <Button onClick={this.handleDeleteClick}>Delete Account</Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 11, offset: 1  }}>
                    {this.renderRecommendations()}
                  </Col>
                </Row>
              </Col>
            )
          }}/>
      </Switch>
    )
  }
}

export default withAuth(CurrentUserProfile)
