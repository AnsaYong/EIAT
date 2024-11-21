// Combines different feature-based reducers into a single root reducer using combineReducers from Redux
import { combineReducers } from 'redux';

// Custom reducers
import toolbarReducer from './toolbars/reducer';
import navbarWidthReducer from './sidebar/reducer';
//import authReducer from './auth/reducer';

const rootReducer = combineReducers({
    toolbars: toolbarReducer,
    navbar: navbarWidthReducer,
    //project: projectReducer,
    //auth: authReducer,
  // Add more reducers as needed
});

export default rootReducer;
