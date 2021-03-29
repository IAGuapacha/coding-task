import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { Repository } from './Repository';
import { QUERY_REPOSITORIES } from './../../../graphql/queries';
import { MUTATION_ADD_FAVORITES } from './../../../graphql/mutations'
import PropTypes from 'prop-types'

export const GitHubRepositoriesScreen = ({ userName }) => {

    const [handleAddFavorite] = useMutation(MUTATION_ADD_FAVORITES);

    const { data, error, loading } = useQuery(QUERY_REPOSITORIES, {
        variables: {
            name: userName
        }
    });

    if (error) return <h1>lo siento </h1>
    if (loading || !data) {

        return (<div className="pre-loader">
            <span></span>
            <span></span>
            <span></span>
        </div>)
    }

    return (
        <div>
            <div className="container">
                <div className="row mt-4" >
                    {
                        data.user.repositories.nodes.map((repository) => {
                            return <Repository
                                key={repository.id}
                                repository={repository}
                                handleAddFavorite={handleAddFavorite}
                                user={userName}/>
                        })
                    }
                </div>
            </div>
        </div>

    )
}

GitHubRepositoriesScreen.propTypes = {
    userName: PropTypes.string.isRequired
}
