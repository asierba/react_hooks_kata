import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.css';
import { Contact } from '../models/Contact';

export interface IState {
    contacts: Contact[];
}

const Index = () => {
    return <App />;
};

ReactDOM.render(<Index />, document.getElementById('root'));
