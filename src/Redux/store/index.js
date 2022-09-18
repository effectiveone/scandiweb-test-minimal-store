import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import cartReducer from './Cart/Cart.reducer';
import CurrencyReducer from './Currency/Currency.reducer';
import ProductReducer from './Product/Product.reducer';
import CategoryReducer from './Category/Category.reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
  CurrencyReducer,
  ProductReducer,
  CategoryReducer,
  cartReducer,
});

const persistConfig = {
  key: 'scandiweb-test-storage',
  storage,
  whitelist: ['CurrencyReducer', 'CartReducer'],
};

const pReducer = persistReducer(persistConfig, reducers);
const store = createStore(pReducer, applyMiddleware(logger));
const persistor = persistStore(store);
export { persistor, store };
