import * as React from 'react';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Contact } from '../../models/Contact';
import Table from 'react-bootstrap/Table';
import { Button, IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

const REGEXP_STR = '^[0-9]{9}$';

function addToList(contacts: Contact[], inputPhone: string, inputName: string) {
    const allContacts = contacts.concat(new Contact(inputPhone, inputName));
    localStorage.setItem('contacts', JSON.stringify(allContacts));
    return allContacts;
}
function useInputPhone (contacts: Contact[]) : [string, (event: React.ChangeEvent<HTMLInputElement>) => void, boolean ] {
    const [inputPhone, setInputPhone] = useState('');

    const isDisabled = useMemo((): boolean => {
        const contactIsDuplicated = !!contacts.find((contact) => contact.phone === inputPhone);
        const numberIsInvalid = !new RegExp(REGEXP_STR).test(inputPhone);
        return contactIsDuplicated || numberIsInvalid;
    }, [contacts, inputPhone]);

    const onChangePhone = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setInputPhone(event.target.value), []) ;

    return [inputPhone, onChangePhone, isDisabled];
}

function useChuckNorris(): [string, (event: React.MouseEvent<HTMLButtonElement>) => void] {
    const [joke, setJoke] = useState<string>('');
    const onClick = useCallback((event: React.MouseEvent<HTMLButtonElement>)  => {
        fetch('https://api.chucknorris.io/jokes/random')
            .then(response => response.json())
            .then(data => {
                setJoke(data.value);
            });
    }, []);
    return [joke, onClick];
}

export const ContactList = () => {
    const [contacts, setContacts] = useState<Contact[]>(JSON.parse(localStorage.getItem('contacts') || '[]'));
    const [inputName, setInputName] = useState('');
    const [inputPhone, onChangePhone, isDisabled] = useInputPhone(contacts);
    const [joke, getJoke] = useChuckNorris();

    const setAsFav = useCallback(
        (favContact: Contact) => {
            favContact.isFavorite = !favContact.isFavorite;
            setContacts(contacts.map((contact) => (contact.phone === favContact.phone ? favContact : contact)));
        },
        [contacts]
    );

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);


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
                    {contacts.map((contact) => {
                        return (
                            <tr className={`contact ${contact.isFavorite ? 'favorite' : ''}`} key={contact.phone}>
                                <td role="name">{contact.name}</td>
                                <td role="phone">{contact.phone}</td>
                                <td>
                                    <IconButton aria-label="Fav" onClick={() => setAsFav(contact)}>
                                        <StarIcon />
                                    </IconButton>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <label htmlFor="input-name">Nombre</label>
            <input type="text" id="input-name" onChange={(event: any) => setInputName(event.target.value)} />
            <label htmlFor="input-phone">Número</label>
            <input
                type="text"
                id="input-phone"
                onChange={onChangePhone}
                pattern={REGEXP_STR}
            />
            <Button variant="contained" disabled={isDisabled} onClick={() => setContacts(addToList(contacts, inputPhone, inputName))}>
                Añade nuevo contacto
            </Button>
            <br/>
            <Button variant="contained" color="primary" onClick={getJoke} >Chucknorrisame!</Button>
            <div>{joke}</div>
        </>
    );
};
