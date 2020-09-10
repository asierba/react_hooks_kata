import {ContactList} from '../../src/components/ContactList';
import * as React from 'react';
import {Contact} from '../../models/Contact';
import faker from 'faker';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Contact list functionality', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('With localStorage', () => {
        const anyName = faker.name.firstName();
        const anyOtherName = faker.name.firstName();
        const anyPhone = faker.phone.phoneNumber();
        const anyOtherPhone = faker.phone.phoneNumber();

        it('Should load contacts from localstorage', () => {
            const contactList = [new Contact(anyPhone, anyName, false), new Contact(anyOtherPhone, anyOtherName, true)];
            localStorage.setItem('contacts', JSON.stringify(contactList));
            render(<ContactList />);

            expect(screen.getAllByRole('row')).toHaveLength(contactList.length + 1);
            expect(screen.getByText(anyName)).toBeInTheDocument();
            expect(screen.getByText(anyPhone)).toBeInTheDocument();
            expect(screen.getAllByRole('row')[1]).not.toHaveClass('favorite');
        });

        it('Should toggle contact as favorite', () => {
            const contactList = [new Contact(anyPhone, anyName, false)];
            localStorage.setItem('contacts', JSON.stringify(contactList));
            render(<ContactList/>);

            userEvent.click(screen.getAllByText('Fav')[0]);

            expect(JSON.parse(localStorage.getItem('contacts'))[0].isFavorite).toBe(true);
            expect(screen.getAllByRole('row')[1]).toHaveClass('favorite');

            userEvent.click(screen.getAllByText('Fav')[0]);

            expect(JSON.parse(localStorage.getItem('contacts'))[0].isFavorite).toBe(false);
            expect(screen.getAllByRole('row')[1]).not.toHaveClass('favorite');
        });

        it.skip('Should disable the button if phone contact already exists', (done) => {
            const contactList = [new Contact(anyPhone, anyName, false)];
            localStorage.setItem('contacts', JSON.stringify(contactList));
            render(<ContactList />);
            userEvent.type(screen.getByLabelText('Nombre'), anyOtherName);
            userEvent.type(screen.getByLabelText('Número'), anyPhone);
            expect(screen.getByRole('button')).toBeDisabled();
        });
    });

    describe('Without localStorage', () => {
        it('Should render no contacts in initial state', () => {
            render(<ContactList />);
            expect(screen.getAllByRole('row')).toHaveLength(1);
        });

        it('Should render a specific contact when button is pressed', () => {
            render(<ContactList />);
            const name = faker.name.firstName();
            const phone = faker.phone.phoneNumber();
            userEvent.type(screen.getByLabelText('Nombre'), name);
            userEvent.type(screen.getByLabelText('Número'), phone);

            userEvent.click(screen.getByRole('button'));

            expect(localStorage.getItem('contacts')).toBe(JSON.stringify([{phone, name, isFavorite: false}]));
            expect(screen.getAllByRole('row')).toHaveLength(2);
            expect(within(screen.getAllByRole('row')[1]).getByRole('name').textContent).toBe(name);
            expect(within(screen.getAllByRole('row')[1]).getByRole('phone').textContent).toBe(phone);
        });
    });
});
