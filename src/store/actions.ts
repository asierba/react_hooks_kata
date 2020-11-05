import { Contact } from '../../models/Contact';

export enum ContactActionTypes {
    ADD = 'ADD',
    UPDATE = 'UPDATE',
}

interface AddAction {
    type: ContactActionTypes.ADD;
    payload: Contact;
}

interface UpdateAction {
    type: ContactActionTypes.UPDATE;
    payload: Contact;
}

export type ContactActions = AddAction | UpdateAction;

export function add(contact: Contact): AddAction {
    return { type: ContactActionTypes.ADD, payload: contact };
}

export function update(contact: Contact): UpdateAction {
    return { type: ContactActionTypes.UPDATE, payload: contact };
}
