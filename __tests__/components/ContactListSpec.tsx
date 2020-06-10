import * as Enzyme from "enzyme";
import {shallow} from "enzyme";
import {ContactList} from "../../src/components/ContactList";
import {Contact} from "../../models/Contact";
import * as React from "react";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new Adapter(),
});

describe("Contact list functionality", () => {
    it("Should render a table with fixed elements", () => {
        const contacts = [
            new Contact("123456", "Papi"),
            new Contact("789101", "Mami")
        ];
        const contactList = shallow(
            <ContactList/>
        )
        contactList.setState({contacts});
        expect(contactList.find(HTMLTableRowElement)).toHaveLength(2);
    });
});
