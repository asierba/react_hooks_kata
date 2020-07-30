import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {Contact} from '../../models/Contact';
import Table from 'react-bootstrap/Table';

function addToList(contacts: Contact[], inputPhone: string, inputName: string) {
    const allContacts = contacts.concat(new Contact(inputPhone, inputName));
    localStorage.setItem('contacts', JSON.stringify(allContacts));
    return allContacts;
}


export const ContactList = () => {
    const [contacts, setContacts] = useState<Contact[]>(JSON.parse(localStorage.getItem('contacts') || '[]'));
    const [inputName, setInputName] = useState('');
    const [inputPhone, setInputPhone] = useState('');

    const setAsFav = useCallback((favContact: Contact) =>  {
        favContact.isFavorite = true;
        setContacts(contacts.map(contact => contact.phone === favContact.phone ? favContact : contact));
    },[contacts]);

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    },[contacts]);


    return (
        <>
            <Table bordered hover>
                <thead>
                <tr>
                    <td>Nombre</td>
                    <td>Número</td>
                    <td>Fav!</td>
                </tr>
                </thead>
                <tbody>
                {contacts.map(contact => {
                    return (
                        <tr className={ `contact ${contact.isFavorite ? "favorite" : ""}` } key={contact.name}>
                            <td data-id="name">{contact.name}</td>
                            <td data-id="phone">{contact.phone}</td>
                            <td><button data-id="fav" onClick={() => setAsFav(contact)}>Fav</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <input type="text" data-id="input-name" onChange={(event: any) => setInputName(event.target.value) } />
            <input type="text" data-id="input-phone" onChange={(event: any) => setInputPhone(event.target.value) } />
            <button
                onClick={() => setContacts(addToList(contacts, inputPhone, inputName))}>Añade nuevo contacto</button>
        </>
    );
}
