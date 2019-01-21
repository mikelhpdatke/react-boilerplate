import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { drawer } from './drawer.reducer';
import { home } from './home.reducer';
import { dialogs } from './dialogs.reducer';
import { services } from './services.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  drawer,
  home,
  dialogs,
  services,
});

export default rootReducer;
