const devUrl = 'http://localhost:3000/api/v1';
const prodUrl = `https://meet-and-music0api.herokuapp.com/api/v1`;

export const FETCH_FEATURED_BANDS = 'fetch_featured_bands';
export const FETCH_FEATURED_ARTISTS = 'fetch_featured_artists';
export const FETCH_USER_PROFILE = 'fetch_user_profile';
export const CREATE_BAND = 'create_band';
export const CREATE_ARTIST = 'create_artist';
export const DELETE_USER = 'delete_user';
export const EMAIL_USER = 'email_user';


export function featuredBands() {
  return (dispatch) => {
    dispatch({ type: 'START_FETCHING_FEATURED_BANDS' });
    return fetch(`${devUrl}/bands/featured`, {
      headers: headers()
    }).then(res => res.json())
    .then(bands => dispatch({ type: FETCH_FEATURED_BANDS, payload: bands}))
  }
}

export function featuredArtists() {
  return (dispatch) => {
    dispatch({ type: 'START_FETCHING_FEATURED_ARTISTS' });
    return fetch(`${devUrl}/artists/featured`, {
      headers: headers()
    }).then(res => res.json())
    .then(artists => dispatch({ type: FETCH_FEATURED_ARTISTS, payload: artists}))
  }
}

function headers() {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}

// export class UserAdapter {
//   static UserProfile(id) {
//     return fetch(`${devUrl}/users/${id}`, {
//       headers: headers()
//     }).then(res => res.json())
//   }
//
//   static createBand(band) {
//     return fetch(`${devUrl}/bands`, {
//       method: 'POST',
//       headers: headers(),
//       body: JSON.stringify({
//         band: band
//       })
//     }).then(res => res.json())
//   }
//
//   static createArtist(artist) {
//     return fetch(`${devUrl}/artists`, {
//       method: 'POST',
//       headers: headers(),
//       body: JSON.stringify({
//         artist: artist
//       })
//     }).then(res => res.json())
//   }
//
//   static destroy(id, type){
//     return fetch(`${devUrl}/${type}/${id}`, {
//       method: 'DELETE',
//       headers: headers()
//     }).then(res => res.json() )
//   }
//
//   static reachOutEmail(id, recipient) {
//     return fetch(`${devUrl}/users/${id}/reach-out`, {
//       method: 'POST',
//       headers: headers(),
//       body: JSON.stringify({
//         recipient: recipient
//       })
//     }).then(res => res.json() )
//   }
// }
