import { v4 as uuidv4 } from 'uuid';
import { combineReducers } from "redux";
import { createReducer } from '@reduxjs/toolkit';
import * as actions from './contacts-actions';

const itemsReducerInitState = [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
];

const filterReducer = createReducer('', {
    [actions.searchContact]: (_, { payload }) => (payload.currentTarget.value)
})

const itemsReducer = createReducer(itemsReducerInitState, {
    [actions.addContact]: (state, { payload }) => {
            payload.preventDefault();
            const form = payload.target;
            if (state.some(item => item.name === payload.target.children.name.value)) {
                alert(`${payload.target.children.name.value} is already in contacts`);
                form.reset();
                return;
            }
            const newState = [
                ...state,
                { id: uuidv4(), name: payload.target.children.name.value, number: payload.target.children.number.value }
            ];
            form.reset();
            return newState;
    },
    [actions.deleteContact]: (state, {payload}) => state.filter(item => item.id !== payload.target.dataset.id)
})

export default combineReducers({
    items: itemsReducer,
    filter: filterReducer,
});