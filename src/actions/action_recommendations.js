const devUrl = 'http://localhost:3000/api/v1';
const prodUrl = 'https://meet-and-music0api.herokuapp.com/api/v1';
export const MAKE_DECISION = 'make_decision';
export const GET_DECISIONS = 'get_decisions';
export const GET_BAND_RECOMMENDATIONS = 'get_band_recommendations';
export const GET_ARTIST_RECOMMENDATIONS = 'get_ARTIST_recommendations';

function headers() {
  return {
    'content-type': 'application/json',
    accept: 'application/json',
    Authorization: localStorage.getItem('jwt'),
  };
}

export function makeDecision(recommendeeId, user, status) {
  return dispatch => fetch(`${devUrl}/decisions`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      decision: {
        status: status,
        decider_attributes: user,
        chosen_id: recommendeeId,
      },
    }),
  }).then(res => res.json())
  .then(response => dispatch({ type: MAKE_DECISION, payload: response }));
}

export function getDecisions(user) {
  return dispatch => fetch(`${devUrl}/decisions`, {
    headers: headers(),
  }).then(res => res.json())
  .then(response => dispatch({
    type: GET_DECISIONS,
    payload: { decisions: response, user: user }
  }))
}

export function getBandRecommendations(user) {
  return dispatch => fetch(`${devUrl}/bands/${user.id}/recommended-artists`, {
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      Authorization: localStorage.getItem('jwt'),
      id: user,
    },
  }).then(res => res.json())
  .then(response => dispatch({ type: GET_BAND_RECOMMENDATIONS, payload: response }));
}

export function getArtistRecommendations(user) {
  return dispatch => fetch(`${devUrl}/artists/${user.id}/recommended-artists`, {
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      Authorization: localStorage.getItem('jwt'),
      id: user,
    },
  }).then(res => res.json())
  .then(response => dispatch({ type: GET_ARTIST_RECOMMENDATIONS, payload: response }));
}
