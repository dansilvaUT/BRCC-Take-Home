import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/client/react';
import React from 'react';

const GRAPHQL_URL = process.env.GRAPHQL_URL;

let apolloClient = null;

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: GRAPHQL_URL,
      fetch,
    }),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const Apollo = ({ children, initialState }) => {
  const client = initializeApollo(initialState);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
