import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/lib/locale/ru_RU';
import { store } from './redux/store';

import './reset.css';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <ConfigProvider locale={ruRu}>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </ConfigProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
