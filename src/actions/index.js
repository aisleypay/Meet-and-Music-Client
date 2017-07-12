const devUrl = 'http://localhost:3000/api/v1';
const prodUrl = 'https://meet-and-music0api.herokuapp.com/api/v1';

export const FETCH_FEATURED_BANDS = 'fetch_featured_bands';
export const FETCH_FEATURED_ARTISTS = 'fetch_featured_artists';
export const FETCH_USER_PROFILE = 'fetch_user_profile';
export const CREATE_BAND = 'create_band';
export const CREATE_ARTIST = 'create_artist';
export const DELETE_USER = 'delete_user';
export const EMAIL_USER = 'email_user';
export const FETCH_INSTRUMENTS = 'fetch_instruments';
export const FETCH_GENRES = 'fetch_genres';
export const CURRENT_USER = 'current_user';
export const LOGIN = 'login';
export const SIGN_OUT = 'sign_out';
export const SEARCH_USERS = 'search_users';

function headers() {
  return {
    'content-type': 'application/json',
    accept: 'application/json',
    Authorization: localStorage.getItem('jwt'),
  };
}

export function login(loginParams) {
  return dispatch => fetch(`${devUrl}/auth`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(loginParams),
  }).then(res => res.json())
  .then(response => dispatch({ type: LOGIN, payload: response }));
}

export function currentUser() {
  return dispatch => fetch(`${devUrl}/current_user`, {
    headers: headers(),
  }).then(res => res.json())
  .then(user => dispatch({ type: CURRENT_USER, payload: user }));
}

export function featuredBands() {
  return dispatch => fetch(`${devUrl}/bands/featured`, {
    headers: headers(),
  }).then(res => res.json())
    .then(bands => dispatch({ type: FETCH_FEATURED_BANDS, payload: bands }));
}

export function featuredArtists() {
  return dispatch => fetch(`${devUrl}/artists/featured`, {
    headers: headers(),
  }).then(res => res.json())
    .then(artists => dispatch({ type: FETCH_FEATURED_ARTISTS, payload: artists }));
}

export function fetchUserProfile(id) {
  return dispatch => fetch(`${devUrl}/users/${id}`, {
    headers: headers(),
  }).then(res => res.json())
    .then(user => dispatch({ type: FETCH_USER_PROFILE, payload: user }));
}

export function fetchInstruments() {
  return dispatch => fetch(`${devUrl}/instruments`, {
    headers: headers(),
  }).then(res => res.json())
  .then(instruments => dispatch({ type: FETCH_INSTRUMENTS, payload: instruments }));
}

export function fetchGenres() {
  return dispatch => fetch(`${devUrl}/genres`, {
    headers: headers(),
  }).then(res => res.json())
  .then(genres => dispatch({ type: FETCH_GENRES, payload: genres }));
}

export function reachOutEmail(id, recipient) {
  return fetch(`${devUrl}/users/${id}/reach-out`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      recipient,
    }),
  }).then(res => res.json());
}

export function signOut() {
  return dispatch => dispatch({ type: SIGN_OUT });
}

export function destroy(id, type) {
  return dispatch => fetch(`${devUrl}/${type}/${id}`, {
    method: 'DELETE',
    headers: headers()
  }).then(res => res.json())
  .then(user => dispatch({ type: DELETE_USER, payload: user }));
}

export function createBand(band) {
  return dispatch => fetch(`${devUrl}/bands`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      band,
    }),
  }).then(res => res.json());
}

export function createArtist(artist) {
  return dispatch => fetch(`${devUrl}/artists`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      artist,
    }),
  }).then(res => res.json());
}

export function searchUsers(searchTerms) {
  if (searchTerms.selectedUserType === 'Artist') {
    return dispatch => fetch(`${devUrl}/artists/search-artists`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: localStorage.getItem('jwt'),
        instrument: searchTerms.instrumentSelected,
        genre: searchTerms.genreSelected,
        zipcode: searchTerms.zipcode,
        radius: searchTerms.radius,
      },
    }).then(res => res.json())
      .then(users => dispatch({ type: SEARCH_USERS, payload: users }));
  } else {
    return dispatch => fetch(`${devUrl}/bands/search-bands`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: localStorage.getItem('jwt'),
        instrument: searchTerms.instrumentSelected,
        genre: searchTerms.genreSelected,
        zipcode: searchTerms.zipcode,
        radius: searchTerms.radius,
      },
    }).then(res => res.json())
      .then(users => dispatch({ type: SEARCH_USERS, payload: users }));
  }
}
