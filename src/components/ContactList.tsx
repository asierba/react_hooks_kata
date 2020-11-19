import React, { ChangeEvent } from 'react';
import { useCallback, useState, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { AppBar, Button, IconButton, InputBase, Toolbar, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';

import { Contact } from '../../models/Contact';
import * as contact from '../store/actions';
import * as fromContacts from '../store/selectors';

const REGEXP_STR = '^[0-9]{9}$';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

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
    const [searchValue, setSearchValue] = useState('');
    const [inputPhone, onChangePhone, isDisabled] = useInputPhone(contacts);
    const [joke, getJoke] = useChuckNorris();
    const classes = useStyles();

    const setAsFav = useCallback(
        (favContact: Contact) => {
            favContact.isFavorite = !favContact.isFavorite;
            dispatch(contact.update(favContact));
        },
        [contacts]
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {'super contact list!'.toUpperCase()}
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search.."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Table bordered hover>
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Número</td>
                        <td>Fav!</td>
                    </tr>
                </thead>
                <tbody>
                    {contacts.filter((contact) => contact.phone.includes(searchValue) ).map((contact) => {
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

                <Button variant="contained" disabled={isDisabled} type="submit">
                    Añade nuevo contacto
                </Button>
            </form>
            <br />

            <Button variant="contained" color="primary" onClick={getJoke}>
                Chucknorrisame!
            </Button>

            <div>{joke}</div>
        </>
    );
};
