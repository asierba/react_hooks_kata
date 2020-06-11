import * as Enzyme from "enzyme";
import {shallow} from "enzyme";
import {ContactList2} from "../../src/components/ContactList";
import {Contact} from "../../models/Contact";
import * as React from "react";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new Adapter(),
});

describe("Contact list functionality", () => {
    const contacts = [
        new Contact("123456", "Papi"),
        new Contact("789101", "Mami")
    ];
    const setContacts: any = jest.fn();
    const useStateMock: any = (initState: any) => [contacts, setContacts];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    it("Should render a table with fixed elements", () => {
        const contactList = shallow(
            <ContactList2 useState={useStateMock}/>
        );
        expect(contactList.find(HTMLTableRowElement)).toHaveLength(2);
    });
});
