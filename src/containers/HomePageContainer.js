import React, {Component} from 'react';
import {UserAdapter} from '../adapters';
import {Link} from 'react-router-dom'
import {Carousel} from 'react-responsive-carousel';
import { connect } from 'react-redux';
import { featuredBands, featuredArtists } from '../actions'
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import '../styles/main.min.css'
import '../styles/carousel.min.css'

class HomePageContainer extends Component {

  componentDidMount() {
    this.props.featuredBands()
    this.props.featuredArtists()
  }

  render() {
    if (this.props.bands.length === 0 || this.props.artists.length === 0) {
      return <header>Loading....</header>
    }

    const users = _.concat(this.props.bands, this.props.artists)

    return (
      <section>
        <Carousel className='presentation-mode' showThumbs={false} showArrows={true} autoPlay infiniteLoop>
          {_.map(users, a => {
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

const mapStateToProps = (state) => {
  return {
    bands: state.users.featuredBands,
    artists: state.users.featuredArtists
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    featuredArtists: featuredArtists,
    featuredBands: featuredBands
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer)
