import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect  
  } from "react-router-dom"; 
import { AuthRouter } from './AuthRouter';
import { ProfileRouter } from './ProfileRouter';


export const AppRouter = () => {
    return (

        <Router>
                <Switch>
                    <Route
                        component={AuthRouter}
                        path="/auth"
                    />

                    <Route
                        
                        path="/"
                        component={ ProfileRouter }
                    />

                    <Redirect
                        to="/auth/login"
                    />
                    
                </Switch>
        </Router>
        
    )
}
