import React from 'react'
import {
    Switch,
    Route,
    Redirect,
    NavLink 
} from "react-router-dom";

import { GiHubLoginScreen } from '../components/app/gitHub/GiHubLoginScreen';
import { CalendarScreen } from '../components/app/calendar/CalendarScreen';

export const ProfileRouter = ({history}) => {
    return (

        <div >

            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <div className="navbar-collapse">
                <div className="navbar-nav">
                            <div className="navbar-nav">

                            <h2 className="navbar-brand" >Profile</h2>
    
                        <NavLink 
                            activeClassName="active"
                            className="nav-item nav-link" 
                            exact
                            to="/github"
                        >
                            Github
                        </NavLink>
    
                        <NavLink 
                            activeClassName="active"
                            className="nav-item nav-link" 
                            exact
                            to="/calendar"
                        >
                            Calendar
                            
                        </NavLink>

                        </div>     
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <button 
                            onClick={() =>{
                                const userData = JSON.parse(localStorage.getItem("user"));
                                userData.loggedIn = false
                                localStorage.setItem('userGithub', JSON.stringify(userData));
                                localStorage.removeItem('userGithub');
                                localStorage.removeItem('userGoogle');
                                
                                history.push('/auth/login');
                            }}
                        activeClassName="active"
                        className="btn btn-primary" 
                        exact
                        
                    >
                        Log out
                    </button>
                </ul>
            </div>
        </nav>
   
            
            <div className="content">

                <Switch>
                    <Route
                        
                        path="/github"
                        component={GiHubLoginScreen}
                    />

                    <Route
                        
                        path="/calendar"
                        component={CalendarScreen}
                    />

                    <Redirect 
                        to="/auth/login"
                    />




                </Switch>
            </div>
        </div>


    )
}
