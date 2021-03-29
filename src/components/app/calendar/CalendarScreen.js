import React, { useEffect, useState } from 'react'
import { Event } from './Event';
import firebase from './../../../firebase/firebase';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import moment from 'moment'

export const CalendarScreen = () => {

  const [isLogeIn, setIsLogeIn] = useState(false);
  const [data, setData] = useState([]);
  const [userGoogle, setUserGoogle] = useState({});
  const [isLoading, setIsLoading] = useState(false)


  var API_KEY = "AIzaSyCxsQbh0D8YCNlldHGf7IgzzwNSMW8kPyE"

  useEffect(() => {

  
    const userGoogle = JSON.parse(localStorage.getItem('userGoogle'));
  
    if (userGoogle != null) {

      const decodedToken = jwtDecode(userGoogle.idToken);
      const expiresAt = new Date(decodedToken.exp * 1000)

      if (new Date() > expiresAt) {
        localStorage.removeItem('userGoogle');
      } else {

        setUserGoogle(userGoogle);
        setIsLogeIn(true);
        getEvents(userGoogle.accessToken);
      }

    } else {
      console.log('No token found')
    }
    return () => {

    }
  }, [])


  const loginGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/calendar');
    firebase.auth().signInWithPopup(provider).then(result => {


     
      setIsLogeIn(true);

      localStorage.setItem('userGoogle', JSON.stringify({
        idToken: result.credential.idToken,
        accessToken: result.credential.accessToken
      }));

      getEvents(result.credential.accessToken);

    }).catch(err => {
      console.log(err);
    })

  }


  const getEvents = (token) => {


    setIsLoading(true);
    axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      params: {
        showDeleted: false,
        timeMax: moment().add(30,'days').toDate().toISOString(),
        timeMin: moment().toDate().toISOString(),
        key: API_KEY
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }

    }).then((res) => {

      setIsLoading(false);

      setData(getFilters(res.data.items));

    }).catch((err) => {
      console.log(err);
    })
  }


  const getFilters = (events) =>{

    return events.filter(event => event.status === 'confirmed');
  }


  const handleDeleteEvent = (idEvent) => {

    console.log(idEvent);

    axios.delete(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${idEvent}`, {
      params: {
        key: API_KEY
      },
      headers: {
        'Authorization': `Bearer ${userGoogle.accessToken}`
      }

    }).then((res) => {
      const userGoogle = JSON.parse(localStorage.getItem('userGoogle'));
  
      getEvents(userGoogle.accessToken);

    }).catch((err) => {
      console.log(err);
    })

  }

  return (
    <div>
      {
        isLoading?(
          <div className="pre-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ):(
          
            (data.length <= 0 && isLogeIn && !isLoading) ? (
              <h1 className="center ">You're free next month, you don't have events</h1>
            ) : (
              <div className="container">
                <div className="row mt-4">
                  {
                    data.map(event => {
                      return <Event key={event.id} event={event} handleDeleteEvent={handleDeleteEvent} />
                    })
                  }
                </div>
    
              </div>
            )
        )
      }

      {
        !isLogeIn && (
          <button className="center btn btn-primary" onClick={loginGoogle}>Login Google</button>
        ) 
      }

    </div>
  )
}
