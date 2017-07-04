import React, {Component} from 'react';
import {UserAdapter} from '../adapters';
import {Link} from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import '../main.min.css'
import '../carousel.min.css'

export default class HomePageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bands: [],
      artists: []
    }

    this.retrieveFeaturedBands = this.retrieveFeaturedBands.bind(this)
    this.retrieveFeaturedArtists = this.retrieveFeaturedArtists.bind(this)
  }

  componentDidMount() {
    this.retrieveFeaturedBands();
    this.retrieveFeaturedArtists();
  }

  retrieveFeaturedBands() {
    UserAdapter.retrieveFeaturedBands().then(bands => this.setState({ bands }))
  }

  retrieveFeaturedArtists() {
    UserAdapter.retrieveFeaturedArtists().then(artists => this.setState({ artists }))
  }

  render() {
    if (this.state.artists.length === 0 || this.state.bands.length === 0) {
      return <header>Loading....</header>
    }
    return (
      <section>
        <Carousel showArrows={true} dynamicHeight autoPlay infiniteLoop>
          {this.state.artists.map(a => {
            return (
              <div key={a.user.id}>
                <Link to={`/${a.user.id}`}><p className="legend">{a.name}</p></Link>
                <img src={a.profile_pic} alt="Broken Link"/>
              </div>
            )
          })}
        </Carousel>

        <Carousel showArrows={true} dynamicHeight>
          {this.state.bands.map(b => {
            return (
              <div key={b.user.id}>
                <Link to={`/${b.user.id}`}><p className="legend">{b.name}</p></Link>
                <img src={b.profile_pic} alt="Broken Link"/>
              </div>
            )
          })}
        </Carousel>
      </section>
    )
  }
}