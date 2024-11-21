// Redux store configuration for the application.
// Combines all reducers from different components and creates a store.
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import rootReducer from './rootReducer';

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with Redux Toolkit
const store = configureStore({
    reducer: persistedReducer,
    // Ignore serializable checks for specific (non serializable) actions
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
        //devTools: process.env.NODE_ENV !== 'production',
});

// Create the persistor
const persistor = persistStore(store);

// Function to purge persisted state
export const purgePersistedState = () => {
    persistor.purge(); // This will clear the persisted state
    window.location.reload(); // Reload the app after purging the state
};

// Export the store and persistor
export { store, persistor };