import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { InstrumentAdapter } from '../adapters'

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruments: []
    }
  }

  genresList(genres) {
    return genres.map(g => <li key={Math.random() * 100000 +1}>{g.name}</li>)
  }

  instrumentsList(instruments) {
    return instruments.map(i => <li key={Math.random() * 100000 +1}>{i.name}</li>)
  }

  instrumentPreferencesList(preferences) {
    let pList = preferences.map(i => i.instrument_id)
    InstrumentAdapter.allInstruments()
    .then(instruments => this.setState({ instruments }))
    let list = this.state.instruments.filter(i => pList.includes(i.id))
    return list.map(i => <li key={Math.random() * 100000 +1}>{i.name}</li>)
  }

  render() {
    const { user } = this.props

    if (user === "") {
      return <div>Loading...</div>
    }

    return (
      <Col>
        <Row>
          <Col><img className= 'public-profile-pic' src={user.meta.profile_pic} alt="Link Broken"/></Col>
          <Col>
            <h1>{user.meta.name}</h1><Button>Email</Button>
            <ul>Genres: {this.genresList(user.meta.genres)}</ul>
            { user.meta_type === 'Artist' ? <ul>Instruments: {this.instrumentsList(user.meta.instruments)}</ul> : null}
            { user.meta_type === 'Band' ? <ul>Looking For: {this.instrumentPreferencesList(user.meta.band_instrument_preferences)}</ul> : null}
          </Col>
        </Row>
        <Row>
          <iframe className='play-list' src={user.meta.youtube_playlist_link} frameBorder="0" allowfullscreen></iframe>
        </Row>
        <h2>Location: {user.meta.state}, {user.meta.zipcode}</h2>
        { user.meta_type === 'Artist' ? <h2>Age: {user.meta.age}</h2> : null}
        { user.meta_type === 'Artist' ? <h2>Year of Experience: {user.meta.experience_in_years}</h2> : null}
      </Col>
    )
  }
}

export default UserProfile
