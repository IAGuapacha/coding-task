import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export const Event = ({ event, handleDeleteEvent }) => {


    const getDate = (date) =>{
        return new moment(date).format('LLL');
    }

    const getDiff = () =>{
        const star = moment(event.start.dateTime);
         const end = moment(event.end.dateTime);
         if(end.diff(star,'hours') <= 1){
             return end.diff(star,'hours')+' hour';
         }else{
            return end.diff(star,'hours')+' hours';
         }
        
    }
    
    
    return (

        <div className="col-md-4">
            <div className="card mb-4">
                <div className="card text-white bg-dark mb-3" >
                    <div className="card-header">{event.summary}</div>
                    <div className="card-body">
                        <h5 className="card-title">{getDate(event.start.dateTime)}</h5>
                        <h5 className="card-title">{getDate(event.end.dateTime)}</h5>
                        <h5 className="card-title">{getDiff()}</h5>
                        <p className="card-text">{event.description}</p>
                        <button className="btn btn-primary" onClick={() => handleDeleteEvent(event.id)}>Delete event</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Event.propTypes = {
    event: PropTypes.object.isRequired,
    handleDeleteEvent: PropTypes.func.isRequired
}
