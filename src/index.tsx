import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';

import { reducer } from './store/State';
import { createStore } from 'redux';

const Index = () => {
    const store = createStore(reducer);
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

ReactDOM.render(<Index />, document.getElementById('root'));
