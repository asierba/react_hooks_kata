import * as Enzyme from "enzyme";
import {shallow} from "enzyme";
import {ContactForm} from "../../src/components/ContactForm";
import * as React from "react";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new Adapter(),
});

xdescribe("Contact form functionality", () => {
    it("Should render contacts with default value", () => {
        const contactForm = shallow(
            <ContactForm/>
        );
        //expect(contactForm.find('.name')).toHaveLength(1);
        //expect(contactForm.find('.phone')).toHaveLength(1);
    });

});
