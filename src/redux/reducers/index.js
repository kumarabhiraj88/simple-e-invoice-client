import { combineReducers } from 'redux';
import userReducer from './userReducer';
import invoiceReducer from './invoiceReducer';
import sidebarReducer from './sidebarReducer';


export default combineReducers({
    userReducer,
    invoiceReducer,
    sidebarReducer,
})