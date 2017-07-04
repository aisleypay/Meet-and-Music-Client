import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';

class UserProfile extends Component {

  genresList(genres) {
    return genres.map(g => <li key={Math.random() * 100000 +1}>{g.name}</li>)
  }

  instrumentsList(instruments) {
    return instruments.map(i => <li key={Math.random() * 100000 +1}>{i.name}</li>)
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
