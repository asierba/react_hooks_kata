import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.css';
import { Contact } from '../models/Contact';
import { Provider } from 'react-redux';

import store from './store/State';

const Index = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

ReactDOM.render(<Index />, document.getElementById('root'));
