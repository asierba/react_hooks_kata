import * as Enzyme from 'enzyme';
import { mount } from 'enzyme';
import { ContactList } from '../../src/components/ContactList';
import * as React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Contact } from '../../models/Contact';
import faker from 'faker';
import { render, getRoles, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

Enzyme.configure({
    adapter: new Adapter(),
});

describe('Contact list functionality', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('With localStorage', () => {
        const anyName = faker.name.firstName();
        const anyOtherName = faker.name.firstName();
        const anyPhone = faker.phone.phoneNumber();
        const otherPhone = faker.phone.phoneNumber();
        const contactList = [new Contact(anyPhone, anyName, false), new Contact(otherPhone, anyOtherName, true)];

        beforeEach(() => {
            localStorage.setItem('contacts', JSON.stringify(contactList));
        });

        it('Should load contacts from localstorage', () => {
            render(<ContactList />);

            expect(screen.getAllByRole('row')).toHaveLength(contactList.length + 1);
            expect(screen.getByText(anyName)).toBeInTheDocument();
            expect(screen.getByText(anyPhone)).toBeInTheDocument();
            expect(screen.getAllByText('Fav')[0]).not.toHaveClass('favorite');
            // expect(contactList.find('.contact').first().hasClass('favorite')).toBe(false);
        });

        it('Should add contact as favorite', (done) => {
            const contactList = mount(<ContactList />);

            contactList.find('.contact').first().find('[data-id="fav"]').simulate('click');

            setImmediate(() => {
                expect(JSON.parse(localStorage.getItem('contacts'))[0].isFavorite).toBe(true);
                expect(contactList.find('.contact').first().hasClass('favorite')).toBe(true);
                done();
            });
        });

        it('Should render a fav contact ', () => {
            const contactList = mount(<ContactList />);

            expect(
                contactList
                    .find('.contact')
                    .map((node) => node.hasClass('favorite'))
                    .some((x) => x) // ???
            ).toBe(true);
        });
    });

    describe('Without localStorage', () => {
        it('Should save new added contact', (done) => {
            const contactList = mount(<ContactList />);
            const name = faker.name.firstName();
            const phone = faker.phone.phoneNumber();

            contactList.find('[data-id="input-name"]').simulate('change', { target: { value: name } });
            contactList.find('[data-id="input-phone"]').simulate('change', { target: { value: phone } });
            contactList.find('button').simulate('click');

            setImmediate(() => {
                expect(localStorage.getItem('contacts')).toBe(JSON.stringify([{ phone, name, isFavorite: false }]));

                done();
            });
        });

        it('Should render no contacts in initial state', () => {
            const contactList = mount(<ContactList />);
            expect(contactList.find('.contact')).toHaveLength(0);
        });

        it('Should render a specific contact when button is pressed', (done) => {
            const contactList = mount(<ContactList />);
            const name = faker.name.firstName();
            const phone = faker.phone.phoneNumber();

            contactList.find('[data-id="input-name"]').simulate('change', { target: { value: name } });
            contactList.find('[data-id="input-phone"]').simulate('change', { target: { value: phone } });
            contactList.find('button').simulate('click');

            setImmediate(() => {
                expect(contactList.find('.contact')).toHaveLength(1);
                expect(contactList.find('.contact').first().find('[data-id="name"]').text()).toBe(name);
                expect(contactList.find('.contact').first().find('[data-id="phone"]').text()).toBe(phone);
                done();
            });
        });
    });
});
