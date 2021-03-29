import {  gql} from '@apollo/client';
export const MUTATION_ADD_FAVORITES = gql`
        mutation addStarRepository($repository:ID!,$user:String!) {
            addStar(input:{starrableId:$repository,clientMutationId:$user}){
              starrable{
                stargazerCount
              }
            } 
          }
        `;