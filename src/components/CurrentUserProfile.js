import React, { Component } from 'react';
import Recommendations from './Recommendations';
import withAuth from '../hocs/withAuth'
import { RecommendationAdapter } from '../adapters'
import { Button, Col} from 'reactstrap';


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
      <Col>
        <h1>{band.name}</h1>
        <h2>Location: {band.state}</h2>
        <h2>Zipcode: {band.zipcode}</h2>
        <ul>Genres: {this.genresList(band.genres)}</ul>
        <Button onClick={() => this.props.deleteAccount(band.id, band.user.meta_type) }>Delete Your Account</Button>
      </Col>
    )
  }

  renderArtist(artist) {
    return (
      <div>
        <h1>{artist.name}</h1>
        <h2>Location: {artist.state}</h2>
        <h2>Zipcode: {artist.zipcode}</h2>
        <ul>Genres: {this.genresList(artist.genres)}</ul>
        <ul>Instruments Played: {this.instrumentsList(artist.instruments)}</ul>
        <Button onClick={() => this.props.deleteAccount(artist.id, artist.user.meta_type) }>Delete Your Account</Button>
      </div>
    )
  }

  getRecommendations() {
    let user = this.props.user
    if (user.user.meta_type === 'Band') {
      RecommendationAdapter.getBandRecommendations(this.props.user)
      .then(recommendations => this.setState({ recommendations }))
    } else {
      RecommendationAdapter.getArtistRecommendations(this.props.user)
      .then(recommendations => this.setState({ recommendations }))
    }
  }

  render() {
    if (this.state.recommendations.length === 0) {
      return <div>Loading.....</div>
    }
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
