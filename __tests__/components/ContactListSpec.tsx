import * as Enzyme from "enzyme";
import {shallow} from "enzyme";
import {ContactList} from "../../src/components/ContactList";
import * as React from "react";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new Adapter(),
});

describe("Contact list functionality", () => {
    it("Should render no contacts in initial state", () => {
        const contactList = shallow(
            <ContactList/>
        );
        expect(contactList.find('.contact')).toHaveLength(0);
    });
    it("Should render a new contact when button is pressed", (done) => {
        const contactList = shallow(
            <ContactList/>
        );
        contactList.find('button').simulate('click');
        setImmediate(() => {
            expect(contactList.find('.contact')).toHaveLength(1);
            done();
        })
    });
});
