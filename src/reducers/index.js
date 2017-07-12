import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UsersReducer from './reducer_users';
import InstrumentReducer from './reducer_instruments';
import GenresReducer from './reducer_genres';
import RecommendationsReducer from './reducer_recommendations';

const rootReducer = combineReducers({
  users: UsersReducer,
  instruments: InstrumentReducer,
  genres: GenresReducer,
  recommendations: RecommendationsReducer,
  form: formReducer,
});

export default rootReducer;
