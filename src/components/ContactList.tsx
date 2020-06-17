import * as React from 'react';
import {Contact} from '../../models/Contact';
import Table from 'react-bootstrap/Table';

interface IContactListProps {
}

export type IContactListState = Readonly<{
    contacts: Contact[]
}>;

const initialState = {
    contacts: [] as Contact[]
};

export class ContactList extends React.Component<IContactListProps, IContactListState> {
    readonly state: IContactListState = initialState;

    private addContact = (): void => {
        const contacts = this.state.contacts;
        this.setState({contacts: contacts.concat(new Contact(Math.random().toString(), Math.random().toString()))})
    }

    render(): JSX.Element {
        const {contacts} = this.state;


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
                                <td>{contact.name}</td>
                                <td>{contact.phone}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                <button onClick={this.addContact}>Añade nuevo contacto</button>
            </>
        );
    }
}
