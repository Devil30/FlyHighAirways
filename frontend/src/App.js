import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import FlightSearch from './containers/FlightSearch/FlightSearch';
import HomePage from './containers/Homepage/Hompage';

import 'antd/dist/antd.css';

import reducer from './store/reducer';

const store = createStore(reducer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/flights" component={FlightSearch} />
                        {/* <Route path="/book-flight" /> */}
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
