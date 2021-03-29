import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export const Repository = ({ repository, handleAddFavorite, user }) => {


    const handleClick = () =>{

        /**
         *  Error Resource not accessible by integration
         */
                // handleAddFavorite({
                //     variables:{
                //         repository:repository.id,
                //         user:user
                //     }
                // });
    }

    const getDate = (date) =>{
        return new moment(date).format('LLL');
    }

    return (

        <div className="col-md-4">
            <div className="card mb-4">
                <div className="card text-center">
                    <div className="card-header">{repository.name}</div>
                    <div className="card-body">                       
                        <p className="card-text">
                            {repository.description}
                            </p>
                        <button onClick={handleClick} className="btn btn-primary">Add to favorites</button>
                    </div>
                    <div className="card-footer text-muted">{getDate(repository.createdAt)}</div>
                </div>
            </div>
        </div>
   
    )
}

Repository.propTypes = {
    repository: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    handleAddFavorite: PropTypes.func.isRequired
}
