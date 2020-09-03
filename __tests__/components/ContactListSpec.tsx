import {ContactList} from '../../src/components/ContactList';
import * as React from 'react';
import {Contact} from '../../models/Contact';
import faker from 'faker';
import {fireEvent, render, screen, within} from '@testing-library/react';

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

        it('Should toggle contact as favorite', (done) => {
            const contactList = [new Contact(anyPhone, anyName, false)];
            localStorage.setItem('contacts', JSON.stringify(contactList));
            render(<ContactList />);

            fireEvent.click(screen.getAllByText('Fav')[0]);
            setImmediate(() => {
                expect(JSON.parse(localStorage.getItem('contacts'))[0].isFavorite).toBe(true);
                expect(screen.getAllByRole('row')[1]).toHaveClass('favorite');

                fireEvent.click(screen.getAllByText('Fav')[0]);
                setImmediate(() => {
                    expect(JSON.parse(localStorage.getItem('contacts'))[0].isFavorite).toBe(false);
                    expect(screen.getAllByRole('row')[1]).not.toHaveClass('favorite');
                    done();
                });
            });
        });
    });

    describe('Without localStorage', () => {
        it('Should render no contacts in initial state', () => {
            render(<ContactList />);
            expect(screen.getAllByRole('row')).toHaveLength(1);
        });

        it('Should render a specific contact when button is pressed', (done) => {
            render(<ContactList />);
            const name = faker.name.firstName();
            const phone = faker.phone.phoneNumber();
            fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: name }});
            fireEvent.change(screen.getByLabelText('Número'), { target: { value: phone }});
            fireEvent.click(screen.getByRole('button'));
            setImmediate(() => {
                expect(localStorage.getItem('contacts')).toBe(JSON.stringify([{phone, name, isFavorite: false}]));
                expect(screen.getAllByRole('row')).toHaveLength(2);
                expect(within(screen.getAllByRole('row')[1]).getByRole('name').textContent).toBe(name);
                expect(within(screen.getAllByRole('row')[1]).getByRole('phone').textContent).toBe(phone);
                done();
            });
        });
    });
});
