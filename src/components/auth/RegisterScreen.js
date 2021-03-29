import React from 'react'
import { useForm } from '../../hooks/useForm'
import {
    Link
  } from "react-router-dom";
  import swal from 'sweetalert';
  import Logo from './../../img/user.png';

export const RegisterScreen = ({history}) => {


    const[formValues,handleInputChange] = useForm({
        name: '',
        email: '',
        password:'',
        confirmPassword: ''
    }); 

    const {email,password,name,confirmPassword} = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === '' || password === '' || confirmPassword === '' || email ==='') {
            swal({
                title: 'Message',
                text: 'Fill in all fields',
                icon: 'error'
            });
            return;
        }

        localStorage.setItem('user',JSON.stringify({
            name:name,
            email:email,
            password:password,
            loggedIn:false
        }));
        
        console.log(email,password);

        history.push('/auth/login');
 
    }

    return (

        <div className="modal-dialog text-center">
            <div className="col-sm-8 main-section">
                <div className="modal-content">
                    <div className="col-12 user-img">
                        <img src={Logo} alt="logo" />

                    </div>
                    <form className="col-12" method="get">

                    <div className="form-group" >
                            <input
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                onChange={handleInputChange}
                                value={name}
                                name="name"
                                placeholder="name" />

                        </div>

                        <div className="form-group" >
                            <input
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                onChange={handleInputChange}
                                value={email}
                                name="email"
                                placeholder="email" />

                        </div>
                        <div className="form-group" >
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                autoComplete="off"
                                onChange={handleInputChange}
                                value={password}
                                name="password"
                            />
                        </div>

                        <div className="form-group" >
                            <input
                                type="password"
                                className="form-control"
                                placeholder="confirm password"
                                autoComplete="off"
                                onChange={handleInputChange}
                                value={confirmPassword}
                                name="confirmPassword"
                            />
                        </div>
                        <button 
                        onClick={handleSubmit}
                        type="submit" 
                        className="btn btn-primary">Sign up</button>
                    </form>
                   
                    <Link
                        to="/auth/login"
                        className="col-12 forgot"
                    >Login</Link>

                    
                </div>
            </div>
        </div>

        

        
    )
}
