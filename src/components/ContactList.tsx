import React from 'react';
import { useCallback, useState, useMemo } from 'react';
import { Contact } from '../../models/Contact';
import Table from 'react-bootstrap/Table';
import { Button, IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import * as contact from '../store/actions';
import * as fromContacts from '../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const REGEXP_STR = '^[0-9]{9}$';

function useInputPhone(contacts: Contact[]): [string, (event: React.ChangeEvent<HTMLInputElement>) => void, boolean] {
    const [inputPhone, setInputPhone] = useState('');

    const isDisabled = useMemo((): boolean => {
        const contactIsDuplicated = !!contacts.find((contact) => contact.phone === inputPhone);
        const numberIsInvalid = !new RegExp(REGEXP_STR).test(inputPhone);
        return contactIsDuplicated || numberIsInvalid;
    }, [contacts, inputPhone]);

    const onChangePhone = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => setInputPhone(event.target.value),
        []
    );

    return [inputPhone, onChangePhone, isDisabled];
}

function useChuckNorris(): [string, (event: React.MouseEvent<HTMLButtonElement>) => void] {
    const [joke, setJoke] = useState<string>('');
    const onClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        fetch('https://api.chucknorris.io/jokes/random')
            .then((response) => response.json())
            .then((data) => {
                setJoke(data.value);
            });
    }, []);
    return [joke, onClick];
}

export const ContactList = () => {
    const contacts = useSelector(fromContacts.contactList);
    const dispatch = useDispatch();
    const [inputName, setInputName] = useState('');
    const [inputPhone, onChangePhone, isDisabled] = useInputPhone(contacts);
    const [joke, getJoke] = useChuckNorris();

    const setAsFav = useCallback(
        (favContact: Contact) => {
            favContact.isFavorite = !favContact.isFavorite;
            dispatch(contact.update(favContact));
        },
        [contacts]
    );

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <TextField id="standard-basic" label="Search for contacts.." />
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
                                    <IconButton
                                        aria-label="Fav"
                                        onClick={() => setAsFav(contact)}
                                        color={contact.isFavorite ? 'primary' : 'default'}
                                    >
                                        <StarIcon />
                                    </IconButton>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <form onSubmit={() => dispatch(contact.add(new Contact(inputPhone, inputName)))}>
                <label htmlFor="input-name">Nombre</label>
                <input type="text" id="input-name" onChange={(event: any) => setInputName(event.target.value)} />
                <label htmlFor="input-phone">Número</label>
                <input type="text" id="input-phone" onChange={onChangePhone} pattern={REGEXP_STR} />

                <Button
                    variant="contained"
                    disabled={isDisabled}
                    type="submit"
                >
                    Añade nuevo contacto
                </Button>
            </form>
            <br />

            <Button variant="contained" color="primary" onClick={getJoke}>
                Chucknorrisame!
            </Button>

            <div>{joke}</div>
        </Grid>
    );
};
