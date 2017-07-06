import React, {Component} from 'react';
import {Button, Col, Row} from 'reactstrap';
import {InstrumentAdapter, UserAdapter} from '../adapters';
import '../styles/public_profile.css'

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
          <Col>
            <Row><h1>{this.state.user.meta.name}</h1>
            <Button className='public-email-button' onClick={() => sendEmail(currentUser.id, this.state.user)}>Email</Button>
            </Row>
            <Row>{this.state.user.meta_type === 'Artist'
              ? <p>Instruments: {this.instrumentsList(this.state.user.meta.instruments)}</p>
              : <p>Looking For: {this.instrumentPreferencesList(this.state.user.meta.band_instrument_preferences)}</p>
          }</Row>
          <Row><p>Genres: {this.genresList(this.state.user.meta.genres)}</p></Row>
          </Col>
        </Row>
        <Row className='video-l'>
          <iframe className='public-play-list' src={this.state.user.meta.youtube_playlist_link} frameBorder="0"></iframe>
        </Row>
        <Row>
          <Col>
            <Col><img className='public-profile-pic' src={this.state.user.meta.profile_pic} alt="Link Broken"/></Col>

          </Col>
        </Row>
        <h2>Location: {this.state.user.meta.state}, {this.state.user.meta.zipcode}</h2>
        {this.state.user.meta_type === 'Artist' ? <h2>Age: {this.state.user.meta.age}</h2> : null}
        {this.state.user.meta_type === 'Artist' ? <h2>Year of Experience: {this.state.user.meta.experience_in_years}</h2> : null}
      </Col>
    )
  }
}


// <Col className='public-profile-container'>
//   <Row>
//     <Col><img className='public-profile-pic' src={this.state.user.meta.profile_pic} alt="Link Broken"/></Col>
//   </Row>
//   <Row>
//     <iframe className='play-list' src={this.state.user.meta.youtube_playlist_link} frameBorder="0"></iframe>
//   </Row>
//   <Row>
//     <Col>
//       <h1>{this.state.user.meta.name}</h1>
//       <Button onClick={() => sendEmail(currentUser.id, this.state.user)}>Email</Button>
//       <ul>Genres: {this.genresList(this.state.user.meta.genres)}</ul>
//       {this.state.user.meta_type === 'Artist'
//         ? <p>Instruments: {this.instrumentsList(this.state.user.meta.instruments)}</p>
//         : <p>Looking For: {this.instrumentPreferencesList(this.state.user.meta.band_instrument_preferences)}</p>
//       }
//     </Col>
//   </Row>
//   <h2>Location: {this.state.user.meta.state}, {this.state.user.meta.zipcode}</h2>
//   {this.state.user.meta_type === 'Artist' ? <h2>Age: {this.state.user.meta.age}</h2> : null}
//   {this.state.user.meta_type === 'Artist' ? <h2>Year of Experience: {this.state.user.meta.experience_in_years}</h2> : null}
// </Col>
export default UserProfile
