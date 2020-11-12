import { Contact } from '../../models/Contact';
import { ContactActions, ContactActionTypes } from './actions';

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
            return {
                contacts: newContacts
            };
        }
        case ContactActionTypes.UPDATE: {
            const newContacts = state.contacts.map((contact) =>
                contact.phone === action.payload.phone ? action.payload : contact
            );
            return {
                contacts: newContacts,
            };
        }
        default:
            return state;
    }
}

export const syncContactsWithStorageMiddleware = (storeAPI:any) => (next:any) => (action:any) => {
    const result = next(action);
    const state : State = storeAPI.getState();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.contacts));
    return result;
}
