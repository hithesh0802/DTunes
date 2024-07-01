import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.cs';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;

