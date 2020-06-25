import * as React from 'react';
import {useState} from 'react';
import {Contact} from '../../models/Contact';
import Table from 'react-bootstrap/Table';

const initialState = {
    contacts: [] as Contact[]
};

function addContact(contacts: Contact[], setContacts: any) {
    return () => setContacts(contacts.concat(new Contact('555123123','pepe')));
}

export const ContactList = () => {
    const [contacts, setContacts] = useState(initialState.contacts);

    return (
        <>
            <Table bordered hover>
                <thead>
                <tr>
                    <td>Nombre</td>
                    <td>Número</td>
                </tr>
                </thead>
                <tbody>
                {contacts.map(contact => {
                    return (
                        <tr className="contact" key={contact.name.toString()}>
                            <td data-id="name">{contact.name}</td>
                            <td data-id="phone">{contact.phone}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <button onClick={addContact(contacts, setContacts)}>Añade nuevo contacto</button>
        </>
    );
}
