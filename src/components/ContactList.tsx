import * as React from 'react';
import {useEffect, useState} from 'react';
import {Contact} from '../../models/Contact';
import Table from 'react-bootstrap/Table';

function addToList(contacts: Contact[], inputPhone: string, inputName: string) {
    const allContacts = contacts.concat(new Contact(inputPhone, inputName));
    localStorage.setItem('contacts', JSON.stringify(allContacts));
    return allContacts;
}

export const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputPhone, setInputPhone] = useState('');


    useEffect(() => {
        const allContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        setContacts(allContacts);

    },[]);

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
                        <tr className="contact" key={contact.name}>
                            <td data-id="name">{contact.name}</td>
                            <td data-id="phone">{contact.phone}</td>
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
