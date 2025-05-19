'use client';

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({ // Create an Apollo Client instance
  link: authLink.concat(httpLink), // Concatenate the authLink and httpLink
  cache: new InMemoryCache(), // Use InMemoryCache for caching
  defaultOptions: { // Set default options for queries and mutations
    watchQuery: { // Set default options for watchQuery
      fetchPolicy: 'network-only', // Always fetch from the network
    },                          
  },
});

export default client; 