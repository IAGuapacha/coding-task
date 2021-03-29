import React, { useEffect } from 'react'
import { useForm } from '../../hooks/useForm'
import {
    Link
} from "react-router-dom";
import Logo from './../../img/user.png';
import swal from 'sweetalert';

export const LoginScreen = ({ history }) => {


    const [formValues, handleInputChange, resetValues] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    useEffect(() => {

        const userData = JSON.parse(localStorage.getItem("user"));
        console.log(userData);
        if (userData != null) {
            if (userData.loggedIn === 'true') {
                history.push('/calendar');
            }
        }

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();


        const userData = JSON.parse(localStorage.getItem("user"));
    
        if (userData != null) {
            const { email: emailData, password: passsworData } = userData;
            if (emailData === email && passsworData === password) {
                history.push('/calendar');
                userData.loggedIn = true
                localStorage.setItem('user',JSON.stringify(userData));
            } else {
                swal({
                    title: 'Message',
                    text: 'Wrong email or password',
                    icon: 'error'
                });
            }
        } else {
            swal({
                title: 'Message',
                text: 'Wrong email or password',
                icon: 'error'

            });
        }
    

        resetValues({
            email: '',
            password: ''
        });

    }

    return (

        <div className="modal-dialog text-center">
            <div className="col-sm-8 main-section">
                <div className="modal-content">
                    <div className="col-12 user-img">
                        <img src={Logo} alt="logo" />

                    </div>
                    <form className="col-12" method="get" >
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

                        <button

                            onClick={handleSubmit}
                            type="submit"
                            className="btn btn-primary button-auth">Login </button>
                    </form>


                    <Link
                        to="/auth/register"
                        className="col-12 forgot"
                    >Sign up</Link>


                </div>
            </div>
        </div>

    )
}
