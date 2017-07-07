import React, {Component} from 'react';
import Recommendations from './Recommendations';
import withAuth from '../hocs/withAuth';
import {RecommendationAdapter} from '../adapters';
import DecisionList from './DecisionList';
import {
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import classnames from 'classnames';
import {DecisionAdapter} from '../adapters';
import '../styles/current_user_profile.css';

class CurrentUserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendations: [],
      accepted: [],
      rejected: [],
      activeTab: '1'
    }

    this.getDecisions = this.getDecisions.bind(this)
    this.getRecommendations = this.getRecommendations.bind(this)
    this.addWillContact = this.addWillContact.bind(this)
    this.addRejected = this.addRejected.bind(this)
    this.renderRecommendations = this.renderRecommendations.bind(this)
    this.toggle = this.toggle.bind(this);

  }

  componentDidMount() {
    this.getDecisions(this.props.user)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({activeTab: tab});
    }
  }

  getDecisions = (user) => {
    DecisionAdapter.getDecisions().then(decisions => this.setState((pstate) => {
      let accepted = decisions.filter(d => d.decider_id === user.id && d.status === true)
      let rejected = decisions.filter(d => d.decider_id === user.id && d.status === false)
      return {accepted: accepted, rejected: rejected}
    }))
  }

  genresList(genres) {
    return genres.map(g => <li key={Math.random() * 100000 + 1}>{g.name}</li>)
  }

  instrumentsList(instruments) {
    return instruments.map(i => <li key={Math.random() * 100000 + 1}>{i.name}</li>)
  }

  getRecommendations = () => {
    let user = this.props.user

    if (user.meta_type === 'Band') {
      RecommendationAdapter.getBandRecommendations(user.user_info).then(recommendations => this.setState({recommendations}))
    } else {
      RecommendationAdapter.getArtistRecommendations(this.props.user.user_info).then(recommendations => this.setState({recommendations}))
    }
  }

  renderRecommendations = () => {
    let decisions = this.state.accepted.concat(this.state.rejected).map(function(d) { return d.chosen_id })
    let newRecommendations = this.state.recommendations.filter(r => !decisions.includes(r.user.id))

    return <Recommendations recommendations={newRecommendations} user={this.props.user} handleContactClick={this.addWillContact} handleRejection={this.addRejected}/>
  }

  addWillContact = (recommendeeId, recommendeeType) => {
    DecisionAdapter.makeDecision(recommendeeId, this.props.user, true).then(decision => this.setState((pstate) => {
      return {
        accepted: [
          ...pstate.accepted,
          decision
        ]
      }
    })).catch(function() {
      console.log('not working')
    })
  }

  addRejected = (recommendeeId, recommendeeType) => {
    DecisionAdapter.makeDecision(recommendeeId, this.props.user, false).then(decision => this.setState((pstate) => {
      return {
        rejected: [
          ...pstate.rejected,
          decision
        ]
      }
    })).catch(function() {
      console.log('not working')
    })
  }

  handleDeleteClick = (e) => {
    this.props.deleteAccount(this.props.user.user_info.id, this.props.user.meta_type)
  }

  render() {
    const {user} = this.props

    if (user === {}) {
      return <div>Loading...</div>
    }

    if (this.state.recommendations.length === 0) {
      this.getRecommendations()
    }
    console.log(user)

    return (
      <div className='current-user-profile-container'>
        <h1>{user.user_info.name}</h1>
        <Nav tabs>
          <NavItem>
            <NavLink className={classnames({
              active: this.state.activeTab === '1'
            })} onClick={() => {
              this.toggle('1');
            }}>
              About Me
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({
              active: this.state.activeTab === '2'
            })} onClick={() => {
              this.toggle('2');
            }}>
              Playlist
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({
              active: this.state.activeTab === '3'
            })} onClick={() => {
              this.toggle('3');
            }}>
              Set List
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({
              active: this.state.activeTab === '4'
            })} onClick={() => {
              this.toggle('4');
            }}>
              Recommendations
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({
              active: this.state.activeTab === '5'
            })} onClick={() => {
              this.toggle('5');
            }}>
              Will Contact
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({
              active: this.state.activeTab === '6'
            })} onClick={() => {
              this.toggle('6');
            }}>
              Rejections
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col className='details'>
                <hr />
                <img className='public-profile-pic' src={user.user_info.profile_pic} alt="Link Broken"/>
                <hr />
                <Row>
                  <Col lg={{size: 8, offset: 1}} className='skills'></Col>
                  <Col className='info' lg={{size: 3, pull: 5}}>
                    { <ul>{this.genresList(user.user_genres)}</ul>}
                    { user.meta_type === 'Artist' ? <ul>{this.instrumentsList(user.user_instruments)}</ul> : <ul>{this.instrumentsList(user.instrument_preferences)}</ul>}
                  </Col>
                </Row>
                <hr/>
                <Row className='specifics'>
                  <Col sm='12' lg={{ size:4, offset: 4 }}>
                    <p className='title'>Specifics</p>
                    {user.meta_type === 'Artist' ? <p>Age: {user.user_info.age}</p> : null}
                    {user.meta_type === 'Artist' ? <p>Years of Experience: {user.user_info.experience_in_years}</p>
                    : null}
                    <p>Location: {user.user_info.state}, {user.user_info.zipcode}</p>
                    <p>Radius Preference: {user.user_info.radius_preference}</p>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                  <Button size='md' onClick={this.handleDeleteClick}>Delete Account</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col>
                <hr />
                <iframe className='current-user-profileplay-list' src={user.user_info.youtube_playlist_link} frameBorder="0"></iframe>
                <hr/>
                <h3>Tip! When you update your YouTube playlist, this playlist will automatically update</h3>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12" lg='12'>
                <hr/>
                <pre>{user.user_info.setList}</pre>
                <hr/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="12" lg='12'>
                {this.renderRecommendations()}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="5">
            <Row>
              <Col sm='12' lg={{ size: '8', push: '2'}} md={{ size: '8', push: '2'}}>
                <DecisionList sendEmail={this.props.sendEmail} decisions={this.state.accepted} recs={this.state.recommendations}/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="6">
            <Row>
              <Col className='decisions' sm='12' lg={{ size: '8', push: '2'}} md={{ size: '8', push: '2'}}>
                <DecisionList decisions={this.state.rejected} recs={this.state.recommendations} sendEmail={this.props.sendEmail}/>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default withAuth(CurrentUserProfile)
