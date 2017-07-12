import React, { Component } from 'react';
import Recommendations from '../components/Recommendations';
import withAuth from '../hocs/withAuth';
import { connect } from 'react-redux';
import { reachOutEmail, destroy } from '../actions';
import { getDecisions, getBandRecommendations, getArtistRecommendations, makeDecision} from '../actions/action_recommendations';
import { bindActionCreators } from 'redux';
import DecisionList from '../components/DecisionList';
import classnames from 'classnames';
import '../styles/current_user_profile.css';
import {
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';

class CurrentUserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendations: [],
      activeTab: '1',
    };

    this.getRecommendations = this.getRecommendations.bind(this);
    this.addWillContact = this.addWillContact.bind(this);
    this.addRejected = this.addRejected.bind(this);
    this.renderRecommendations = this.renderRecommendations.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.getDecisions(this.props.user);
  }

  genresList(genres) {
    return genres.map(g => <li key={Math.random() * 100000 + 1}>{g.name}</li>);
  }

  instrumentsList(instruments) {
    return instruments.map(i => <li key={Math.random() * 100000 + 1}>{i.name}</li>);
  }

  getRecommendations(user) {
    if (user.meta_type === 'Band') {
      this.props.getBandRecommendations(user.user_info);
    } else {
      this.props.getArtistRecommendations(user.user_info);
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  renderRecommendations() {
    const decisions = this.props.accepted.concat(this.props.rejected).map(function(d) { return d.chosen_id });
    const newRecommendations = this.props.recommendations.filter(r => !decisions.includes(r.user.id));

    return <Recommendations recommendations={newRecommendations} user={this.props.user} handleContactClick={this.addWillContact} handleRejection={this.addRejected} />
  }

  addWillContact(recommendeeId, recommendeeType) {
    this.props.makeDecision(recommendeeId, this.props.user, true);
  }

  addRejected(recommendeeId, recommendeeType) {
    this.props.makeDecision(recommendeeId, this.props.user, false);
  }

  handleDeleteClick(e) {
    let urlType;
    this.props.user.meta_type === 'Band' ? urlType = 'bands' : urlType = 'artists';

    this.props.destroy(this.props.user.id, urlType)
    localStorage.clear();
    this.props.history.push('/login');
  }

  isEmpty(myObject) {
    for(const key in myObject) {
      if (myObject.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { user, accepted, rejected, recommendations } = this.props

    if (this.isEmpty(user)) {
      return <div>Loading...</div>;
    }

    if (recommendations.length === 0) {
      this.getRecommendations(user);
    }

    return (
      <div className="current-user-profile-container">
        <h1>{user.user_info.name}</h1>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === '1',
              })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              About Me
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === '2',
              })}
              onClick={() => {
                this.toggle('2');
              }}
            > Playlist
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === '3',
              })}
              onClick={() => {
                this.toggle('3');
              }}
            > Set List
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === '4',
              })}
              onClick={() => {
                this.toggle('4');
              }}
            > Recommendations
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === '5',
              })}
              onClick={() => {
                this.toggle('5');
              }}
            > Will Contact
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === '6',
              })}
              onClick={() => {
                this.toggle('6');
              }}
            > Rejections
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col className="details">
                <hr />
                <img
                  className="public-profile-pic"
                  src={user.user_info.profile_pic}
                  alt="Link Broken"
                />
                <hr />
                <Row>
                  <Col lg={{ size: 8, offset: 1 }} className="skills" />
                  <Col className="info" lg={{ size: 3, pull: 5 }}>
                    { <ul>{this.genresList(user.user_genres)}</ul>}
                    { user.meta_type === 'Artist' ? <ul>{this.instrumentsList(user.user_instruments)}</ul> : <ul>{this.instrumentsList(user.instrument_preferences)}</ul>}
                  </Col>
                </Row>
                <hr />
                <Row className="specifics">
                  <Col sm="12" lg={{ size: 4, offset: 4 }}>
                    <p className="title">Specifics</p>
                    {user.meta_type === 'Artist' ? <p>Age: {user.user_info.age}</p> : null}
                    {user.meta_type === 'Artist' ? <p>Years of Experience: {user.user_info.experience_in_years}</p>
                    : null}
                    <p>Location: {user.user_info.state}, {user.user_info.zipcode}</p>
                    <p>Radius Preference: {user.user_info.radius_preference}</p>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <Button size="md" onClick={this.handleDeleteClick}>Delete Account</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col>
                <hr />
                <iframe
                  className="current-user-profileplay-list"
                  src={user.user_info.youtube_playlist_link}
                  title="YouTube Playlist"
                  frameBorder="0"
                />
                <hr />
                <h3>Tip! When you update your YouTube playlist, this playlist will automatically update</h3>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12" lg="12">
                <hr />
                <pre>{user.user_info.setList}</pre>
                <hr />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="12" lg="12">
                {this.renderRecommendations()}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="5">
            <Row>
              <Col sm="12" lg={{ size: '8', push: '2' }} md={{ size: '8', push: '2' }}>
                <DecisionList
                  sendEmail={this.props.sendEmail}
                  decisions={accepted}
                  recs={recommendations}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="6">
            <Row>
              <Col className="decisions" sm="12" lg={{ size: '8', push: '2' }} md={{ size: '8', push: '2' }}>
                <DecisionList
                  decisions={rejected}
                  recs={recommendations}
                  sendEmail={reachOutEmail}
                />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.auth.user,
    accepted: state.recommendations.accepted,
    rejected: state.recommendations.rejected,
    recommendations: state.recommendations.recommendations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    reachOutEmail,
    getDecisions,
    destroy,
    makeDecision,
    getBandRecommendations,
    getArtistRecommendations,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(CurrentUserProfile));
