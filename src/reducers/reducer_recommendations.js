import { MAKE_DECISION, GET_DECISIONS, GET_BAND_RECOMMENDATIONS, GET_ARTIST_RECOMMENDATIONS } from '../actions/action_recommendations';

export default function (state = {
  recommendations: [],
  accepted: [],
  rejected: [],
}, action) {
  switch (action.type) {
    case MAKE_DECISION:
      if (action.payload.status === true) {
        return Object.assign({}, state, {
          accepted: [...state.accepted, action.payload],
        });
      } else {
        return Object.assign({}, state, {
          rejected: [...state.rejected, action.payload],
        });
      }

    case GET_DECISIONS:
      const accepted = action.payload.decisions.filter(d => d.decider_id === action.payload.user.id && d.status === true);
      const rejected = action.payload.decisions.filter(d => d.decider_id === action.payload.user.id && d.status === false);

      return Object.assign({}, state, {
        accepted,
        rejected,
      });
    case GET_BAND_RECOMMENDATIONS:
      return Object.assign({}, state, {
        recommendations: action.payload,
      });
    case GET_ARTIST_RECOMMENDATIONS:
      return Object.assign({}, state, {
        recommendations: action.payload,
      });
    default:
      return state;
  }
}
