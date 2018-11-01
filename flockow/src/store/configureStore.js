import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducers)


export const store = createStore(
	persistedReducer, 
	composeWithDevTools(applyMiddleware(ReduxThunk))
);

export const persistor = persistStore(store);