import { Contact } from '../../models/Contact';
import { createStore } from 'redux';

export interface State {
    contacts: Contact[]
}

const initialState: State = {
    contacts: []
};

enum ActionTypes {
    LOAD  = 'LOAD',
    ADD = 'ADD',
}

interface LoadAction {
    type: ActionTypes.LOAD
}
interface AddAction {
    type: ActionTypes.ADD;
    payload: Contact
}

function load() : LoadAction  {
    return { type: ActionTypes.LOAD };
}

function add(contact: Contact) : AddAction  {
    return { type: ActionTypes.ADD, payload: contact };
}

function reducer(state: State = initialState, action: LoadAction | AddAction) {
    switch (action.type) {
        case ActionTypes.ADD:
            return { contacts: state.contacts.concat(action.payload)};
        case ActionTypes.LOAD:
            return { contacts: JSON.parse(localStorage.getItem('contacts') || '[]')};
        default:
            return state;
    }
}

export default createStore(reducer);
