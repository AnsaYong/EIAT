// Sets up the Redux store
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import rootReducer from './rootReducers';

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Apply persistReducer for state persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = createStore(
    persistedReducer,
    //rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

//export { store, persistor };
export { store, persistor };
