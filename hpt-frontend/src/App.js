import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import { Tariffication } from './components/Tariffication/Tariffication';

function App() {
    return (
        <div className="app-wrapper">
            <Route path="/tariffication" component={Tariffication} />
        </div>
    );
}

export default App;
