import React, { Component } from 'react';
import Recommendations from './Recommendations';
import withAuth from '../hocs//withAuth'

class CurrentUserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendations: []
    }
  }

  componentDidMount() {
    this.getRecommendations()
  }

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

  getRecommendations() {
    fetch(`http://localhost:3000/api/v1/bands/${this.props.user.id}/searchArtists`, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt'),
        'id': this.props.user
      }
    }).then(res => res.json())
    .then(recommendations => this.setState({ recommendations }))
    console.log(this.state.recommendations)
  }

  render() {
    return (
      <div>
        <div className='row'>
          {this.determineTypeOfUser()}
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <Recommendations recommendations={this.state.recommendations} user={this.props.user} />
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(CurrentUserProfile)
