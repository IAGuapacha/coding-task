import {  gql} from '@apollo/client';
export const QUERY_REPOSITORIES = gql`
    query($name:String!)  { 
            user(login:$name){
                repositories(first:50){
                totalCount
                nodes{
                    id
                    name,
                    description,
                    createdAt
                }
            }
        }
    }
    `;

