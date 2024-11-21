import { combineReducers } from 'redux';
import toolbarsReducer from './toolbars/toolbarsSlice';
import menuReducer from './menuSlice/menuSlice';
import stepsReducer from './steps/stepsSlice';
import projectsReducer from './projects/projectsSlice';
import modalReducer from './modals/modalSlice';

const rootReducer = combineReducers({
    toolbars: toolbarsReducer,
    menu: menuReducer,
    steps: stepsReducer,
    projects: projectsReducer,
    modal: modalReducer,
});

export default rootReducer;