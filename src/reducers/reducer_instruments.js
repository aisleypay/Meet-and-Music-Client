import { FETCH_INSTRUMENTS } from '../actions';

export default function (state = [], action) {
  switch (action.type) {

    case FETCH_INSTRUMENTS:
      return action.payload;

    default:
      return state;
  }
}
