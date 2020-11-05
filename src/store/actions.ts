import { Contact } from '../../models/Contact';

export enum ContactActionTypes {
    LOAD = 'LOAD',
    ADD = 'ADD',
    UPDATE = 'UPDATE',
}

interface LoadAction {
    type: ContactActionTypes.LOAD;
}
interface AddAction {
    type: ContactActionTypes.ADD;
    payload: Contact;
}

interface UpdateAction {
    type: ContactActionTypes.UPDATE;
    payload: Contact;
}

export type ContactActions = LoadAction | AddAction | UpdateAction;

export function load(): LoadAction {
    return { type: ContactActionTypes.LOAD };
}

export function add(contact: Contact): AddAction {
    return { type: ContactActionTypes.ADD, payload: contact };
}

export function update(contact: Contact): UpdateAction {
    return { type: ContactActionTypes.UPDATE, payload: contact };
}
