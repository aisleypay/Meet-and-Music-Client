import { FETCH_FEATURED_BANDS, FETCH_FEATURED_ARTISTS, FETCH_USER_PROFILE, CURRENT_USER, LOGIN, SIGN_OUT, DELETE_USER, SEARCH_USERS } from '../actions';

export default function (state = {
  featuredBands: [],
  featuredArtists: [],
  selectedUser: '',
  auth: {
    isLoggedIn: false,
    user: {},
  },
  searchedUsers: [],
}, action) {
  switch (action.type) {
    case FETCH_FEATURED_BANDS:
      return Object.assign({}, state, {
        featuredBands: action.payload,
      });

    case FETCH_FEATURED_ARTISTS:
      return Object.assign({}, state, {
        featuredArtists: action.payload,
      });

    case FETCH_USER_PROFILE:
      return Object.assign({}, state, {
        selectedUser: action.payload,
      });

    case DELETE_USER:
      return Object.assign({}, state, {
        auth: {
          isLoggedIn: false,
          user: {},
        },
      });

    case SEARCH_USERS:
      return Object.assign({}, state, {
        searchedUsers: action.payload,
      });

    case CURRENT_USER:
      if (!action.payload.error) {
        return Object.assign({}, state, {
          auth: {
            isLoggedIn: true,
            user: action.payload,
          },
        });
      }
      break;
    case LOGIN:
      if (!action.payload.error) {
        return Object.assign({}, state, {
          auth: {
            isLoggedIn: true,
            user: action.payload,
          },
        });
      }
      break;
    case SIGN_OUT:
      return Object.assign({}, state, {
        auth: {
          isLoggedIn: false,
          user: {},
        },
      });
    default:
      return state;
  }
}
