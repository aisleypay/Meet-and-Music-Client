import React, {Component} from 'react';
import {UserAdapter} from '../adapters';
import {Link} from 'react-router-dom'
import {Carousel} from 'react-responsive-carousel';
import '../styles/main.min.css'
import '../styles/carousel.min.css'

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
    UserAdapter.retrieveFeaturedBands().then(bands => this.setState({bands}))
  }

  retrieveFeaturedArtists() {
    UserAdapter.retrieveFeaturedArtists().then(artists => this.setState({artists}))
  }

  render() {
    if (this.state.artists.length === 0 || this.state.bands.length === 0) {
      return <header>Loading....</header>
    }
    return (
      <section>
        <Carousel className='presentation-mode' showThumbs={false} showArrows={true} autoPlay infiniteLoop>
          {this.state.artists.concat(this.state.bands).map(a => {
            return (
              <div key={a.user.id}>
                <Link to={`/${a.user.id}`}>
                  <p className="legend">{a.name}</p>
                </Link>
                <p className='home-page-title'>Meet and Music</p>
                <img src={a.profile_pic} alt="Broken Link"/>
              </div>
            )
          })}
        </Carousel>
      </section>
    )
  }
}
