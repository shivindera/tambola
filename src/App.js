import React from 'react';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { TambolaProvider } from './contexts/TambolaContext';
import Tambola from './components/Tambola';
import Tickets from './components/Tickets';

import './App.scss';

function App() {
    return (
        <div className='main'>
            <TambolaProvider>
                <Router>
                    <nav className='tambola-nav'>
                        <Link to='/'>Board</Link>
                        <Link to='/tickets'>Tickets</Link>
                    </nav>

                    <Switch>
                        <Route path='/tickets'>
                            <Tickets />
                        </Route>
                        <Route path='/'>
                            <Tambola />
                        </Route>
                    </Switch>
                </Router>
            </TambolaProvider>
        </div>
    );
}

export default App;
