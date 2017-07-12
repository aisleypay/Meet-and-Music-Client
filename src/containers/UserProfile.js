import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchUserProfile, fetchInstruments, reachOutEmail } from '../actions';
import { bindActionCreators } from 'redux';
import '../styles/public_profile.css';

class UserProfile extends Component {
  componentDidMount() {
    this.props.fetchUserProfile(this.props.id);
    this.props.fetchInstruments();
  }

  genresList(genres) {
    return genres.map(g => `${g.name} `);
  }

  instrumentsList(instruments) {
    return instruments.map(i => `${i.name} `);
  }

  instrumentPreferencesList(preferences) {
    let pList = preferences.map(i => i.instrument_id);
    let list = this.props.instruments.filter(i => pList.includes(i.id));

    return list.map(i => `${i.name} `);
  }

  render() {
    const { reachOutEmail, currentUser, user } = this.props;

    if (user === '') {
      return <div>Loading...</div>;
    }
    return (
      <Col className="public-profile-container">
        <Row className="top-summary">
          <Col lg="8">
            <Row>
              <h1>{user.meta.name}</h1>
              <Button
                className="public-email-button"
                onClick={() => reachOutEmail(currentUser.id, user)}
              >Email
              </Button>
            </Row>
            <Row>
              { user.meta_type === 'Artist'
                ? <p>Instruments: {this.instrumentsList(user.meta.instruments)}</p>
                : <p>Looking For: {this.instrumentPreferencesList(user.meta.band_instrument_preferences)}</p>
              }
            </Row>
            <Row>
              <p>Genres: {this.genresList(user.meta.genres)}</p>
            </Row>
          </Col>
          <Col className="float-right right-info">
            <p>{user.meta.state}, {user.meta.zipcode}</p>
            {user.meta_type === 'Artist' ? <p>Age: {user.meta.age}</p> : null}
            {user.meta_type === 'Artist' ? <p>Years of Experience: {user.meta.experience_in_years}</p> : null}
          </Col>
        </Row>
        <Row>
          <iframe
            className="public-play-list"
            src={user.meta.youtube_playlist_link}
            title="YouTube Playlist"
            frameBorder="0"
          />
        </Row>
        <hr />
        <Row>
          <Col>
            <Col className="public-pic-col">
              <img className="public-profile-pic" src={user.meta.profile_pic} alt="Link Broken" />
            </Col>
          </Col>
        </Row>
        <hr />
        <Row className="setlist">
          <Col>
            <section
              className="panel-group"
              id="accordion"
              role="tablist"
              aria-multiselectable="true"
            >
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingOne">
                  <h4 className="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      className="title"
                    >
                      Set List
                    </a>
                  </h4>
                </div>
                <div className="panel-teaser panel-body" >
                  <pre>{user.meta.setList.slice(0, 50)}</pre>
                </div>
                <div
                  id="collapseOne"
                  className="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="headingOne"
                >
                  <div className="panel-body">
                    <pre>{user.meta.setList.slice(51)}</pre>
                  </div>
                </div>
              </div>
            </section>
          </Col>
        </Row>
        <hr />
      </Col>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.selectedUser,
    instruments: state.instruments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUserProfile,
    fetchInstruments,
    reachOutEmail,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
