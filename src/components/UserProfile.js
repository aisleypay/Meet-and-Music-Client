import React, { Component } from 'react';
import withAuth from '../hocs/withAuth';

class UserProfile extends Component {

  determineTypeOfUser() {
    let user = this.props.user
    if (user.user.meta_type === 'Band') {
      return this.renderBand(user)
    } else {
      return this.renderArtist(user)
    }
  }

  genresList(genres) {
    return genres.map(g => <li key={g.id}>{g.name}</li>)
  }
  
  instrumentsList(instruments) {
    return instruments.map(i => <li key={i.id}>{i.name}</li>)
  }

  renderBand(band) {
    return (
      <div>
        <h1>{band.name}</h1>
        <h2>{band.state}</h2>
        <h2>{band.zipcode}</h2>
        <ul>{this.genresList(band.genres)}</ul>
      </div>
    )
  }

  renderArtist(artist) {
    return (
      <div>
        <h1>{artist.name}</h1>
        <h2>{artist.state}</h2>
        <h2>{artist.zipcode}</h2>
        <ul>{this.genresList(artist.genres)}</ul>
        <ul>{this.instrumentsList(artist.instruments)}</ul>
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
