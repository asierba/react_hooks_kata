import { Contact } from '../../models/Contact';
import { createStore } from 'redux';
import { ContactActionTypes, ContactActions } from './actions';

export interface State {
    contacts: Contact[];
}



const LOCAL_STORAGE_KEY = 'contacts';

export function reducer(state: State, action: ContactActions) {
    const initialState: State = {
        contacts: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'),
    };
    state = state ||  initialState;
    switch (action.type) {
        case ContactActionTypes.ADD: {
            const newContacts = state.contacts.concat(action.payload);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContacts));
            return { contacts: newContacts };
        }
        case ContactActionTypes.UPDATE: {
            const newContacts = state.contacts.map((contact) =>
                contact.phone === action.payload.phone ? action.payload : contact
            );
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContacts));
            return {
                contacts: newContacts,
            };
        }
        default:
            return state;
    }
}
