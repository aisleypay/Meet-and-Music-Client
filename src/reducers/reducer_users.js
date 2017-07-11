import {FETCH_FEATURED_BANDS, FETCH_FEATURED_ARTISTS, CREATE_BAND} from '../actions';

export default function(state = {
  featuredBands: [],
  featuredArtists: []
}, action) {
  switch(action.type) {

    case CREATE_BAND:
      return Object.assign({}, state, {
        bands: state.bands.concat(action.band)
      })

    case FETCH_FEATURED_BANDS:
      return Object.assign({}, state, {
        featuredBands : action.payload
      })

    case FETCH_FEATURED_ARTISTS:
    return Object.assign({}, state, {
      featuredBands : action.payload
    })

    default:
      return state;
  }
}
