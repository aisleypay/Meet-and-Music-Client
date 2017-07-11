import { FETCH_FEATURED_BANDS, FETCH_FEATURED_ARTISTS } from '../actions';

export default function(state = {
  featuredBands: [],
  featuredArtists: []
}, action) {
  switch(action.type) {

    case FETCH_FEATURED_BANDS:
      return Object.assign({}, state, {
        featuredBands : action.payload
      })

    case FETCH_FEATURED_ARTISTS:
    return Object.assign({}, state, {
      featuredArtists : action.payload
    })

    default:
      return state;
  }
}
