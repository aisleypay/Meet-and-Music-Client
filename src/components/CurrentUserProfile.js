import React, { Component } from 'react';
import Recommendations from './Recommendations';
import withAuth from '../hocs//withAuth'

class CurrentUserProfile extends Component {
  constructor(props) {
    super(props);
  }

  determineTypeOfUser() {
    this.renderBand(this.props.user)
  }

  renderBand(band) {
    return (
      <div>
        <h1>{band.name}</h1>
        <h2>{band.state}</h2>
        <h2>{band.zipcode}</h2>
        <h2>{band.genres[0].name}</h2>
      </div>
    )
  }

  renderArtist(artist) {
    return (
      <div>
        <h1>{artist.name}</h1>
        <h2>{artist.state}</h2>
        <h2>{artist.zipcode}</h2>
        <h2>{artist.instruments[0].name}</h2>
        <h2>{artist.genres[0].name}</h2>
      </div>
    )
  }

  getRecommendation() {
    fetch('http://localhost:3000/api/v1/bands/searchArtists', {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        band: {
          instruments: [],
        }
      })
    })
  }

  render() {
    return (
      <div>
        {this.determineTypeOfUser()}
        <Recommendations />
      </div>
    )
  }
}

export default withAuth(CurrentUserProfile)
