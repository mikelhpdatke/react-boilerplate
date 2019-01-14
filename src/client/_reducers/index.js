import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { drawer } from './drawer.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  drawer,
});

export default rootReducer;
