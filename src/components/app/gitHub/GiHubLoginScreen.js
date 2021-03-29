import React, { useEffect, useState } from 'react'
import firebase from '../../../firebase/firebase';
import { GitHubRepositoriesScreen } from './GitHubRepositoriesScreen';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client'


export const GiHubLoginScreen = () => {

    const [isLogedIn, setIsLogedIn] = useState(false);
  
    const handleLogin = () => {

        let provider = new firebase.auth.GithubAuthProvider();

        firebase.auth().signInWithPopup(provider).then(result => {

            const userData = JSON.stringify({
                token: result.credential.accessToken,
                user: result.additionalUserInfo.username
            })
           
          
            localStorage.setItem('userGithub', userData);
            setIsLogedIn(true);

        }).catch(err => {
            console.log(err)
        })


    }

    useEffect(() => {

        const userGithub = JSON.parse(localStorage.getItem('userGithub'));
    
        if (userGithub != null) {
            setIsLogedIn(true);
        } else {
            console.log('No token found')
        }
        return () => {

        }
    }, [])



    const getClient = () => {

        const userGithub = JSON.parse(localStorage.getItem('userGithub'));

        const client = new ApolloClient({
            uri: 'https://api.github.com/graphql',

            headers: {
                Authorization: `bearer ${userGithub.token}`
            },
            cache: new InMemoryCache()

        });

        return client;
    }

    const getUser = () => {
        const userGithub = JSON.parse(localStorage.getItem('userGithub'));
      
        return userGithub.user;
    };


    return (
        <div>

            {
                isLogedIn ? (
                    <ApolloProvider client={getClient()}>
                        <GitHubRepositoriesScreen userName={getUser()} />
                    </ApolloProvider>
                ) : (
                    <div className="center">

                        <button className="btn btn-primary"
                            onClick={handleLogin}
                        >Login github</button>
                    </div>
                )
            }
        </div>
    )
}
