import React, { Component } from 'react';
import withAuth from '../hocs/withAuth';

class UserProfile extends Component {
  constructor(props) {
    super(props);

  }

  determineTypeOfUser() {
    let user = this.props.user
    if (user['classification'] === 'band') {
      return this.renderBand(user.bands[0])
    } else {
      return this.renderArtist(user.artists[0])
    }
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

  render() {
    return (
      <div>
        {this.determineTypeOfUser()}
      </div>
    )
  }
}

export default withAuth(UserProfile)
