import React, {Component} from 'react';
import {Button, Col, Row} from 'reactstrap';
import {InstrumentAdapter, UserAdapter} from '../adapters';
import '../styles/public_profile.css';
import FA from 'react-fontawesome';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      instruments: [],
      instrumentsPlayed: [],
      instrumentsPreferences: []
    }
  }

  componentDidMount() {
    UserAdapter.UserProfile(this.props.id)
    .then(user => this.setState({user: user}))
    .then(() => {
      InstrumentAdapter.allInstruments()
      .then(instruments => this.setState({instruments}))
    })
  }

  genresList(genres) {
    return genres.map(g => `${g.name} `)
  }

  instrumentsList(instruments) {
    return instruments.map(i => `${i.name} `)
  }

  instrumentPreferencesList(preferences) {
    let pList = preferences.map(i => i.instrument_id)
    let list = this.state.instruments.filter(i => pList.includes(i.id))

    return list.map(i => `${i.name} `)
  }

  render() {
    const {id, sendEmail, currentUser} = this.props

    if (this.state.user === "") {
      return <div>Loading...</div>
    }
    return (
      <Col className='public-profile-container'>
        <Row className='top-summary'>
          <Col lg='8'>
            <Row>
              <h1>{this.state.user.meta.name}</h1>
              <Button className='public-email-button' onClick={() => sendEmail(currentUser.id, this.state.user)}>Email</Button>
            </Row>
            <Row>
              { this.state.user.meta_type === 'Artist'
                ? <p>Instruments: {this.instrumentsList(this.state.user.meta.instruments)}</p>
                : <p>Looking For: {this.instrumentPreferencesList(this.state.user.meta.band_instrument_preferences)}</p>
              }
            </Row>
            <Row>
              <p>Genres: {this.genresList(this.state.user.meta.genres)}</p>
            </Row>
          </Col>
          <Col className='left-info' lg={{ size: '2', push: '2'}}>
            <p>{this.state.user.meta.state}, {this.state.user.meta.zipcode}</p>
            {this.state.user.meta_type === 'Artist' ? <p>Age: {this.state.user.meta.age}</p> : null}
            {this.state.user.meta_type === 'Artist' ? <p>Year of Experience: {this.state.user.meta.experience_in_years}</p> : null}
          </Col>
        </Row>
        <Row>
          <iframe className='public-play-list' src={this.state.user.meta.youtube_playlist_link} frameBorder="0"></iframe>
        </Row>
        <hr/>
        <Row>
          <Col>
            <Col className='public-pic-col'>
              <img className='public-profile-pic' src={this.state.user.meta.profile_pic} alt="Link Broken"/>
              </Col>
            </Col>
        </Row>
        <hr />
        <Row className='setlist'>
          <Col>
            <section className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingOne">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion"
                       href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" className='title'>
                      Set List
                    </a>
                  </h4>
                </div>
                <div className="panel-teaser panel-body" >
                  <pre>{this.state.user.meta.setList.slice(0, 50)}</pre>
                </div>
                <div id="collapseOne" className="panel-collapse collapse in"
                     role="tabpanel" aria-labelledby="headingOne">
                  <div className="panel-body">
                    <pre>{this.state.user.meta.setList.slice(51)}</pre>
                  </div>
                </div>
              </div>
            </section>
          </Col>
        </Row>
        <hr />
      </Col>
    )
  }
}


export default UserProfile
