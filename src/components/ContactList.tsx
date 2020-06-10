import * as React from "react";
import {Contact} from "../../models/Contact";
import Table from 'react-bootstrap/Table'

interface IContactListProps {
}

export type IContactListState = Readonly<{
    contacts: Contact[]
}>;

const initialState = {
    contacts: [new Contact("123456", "Pepe")]
};

export class ContactList extends React.Component<IContactListProps, IContactListState> {
    readonly state: IContactListState = initialState;

    render(): JSX.Element {
        const { contacts } = this.state;
        return (
            <Table bordered hover>
                <thead>
                    <td>Nombre</td>
                    <td>Número</td>
                </thead>
                <tbody>
                { contacts.map(contact => {
                    return (
                        <tr key={contact.name.toString()}>
                            <td>{contact.name}</td>
                            <td>{contact.phone}</td>
                        </tr>
                    )
                }) }
                </tbody>
            </Table>
        );
    }
}
