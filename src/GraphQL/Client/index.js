import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    AttributeSet: {
      keyFields: false,
    },
    Attribute: {
      keyFields: false,
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache,
});

export { client, cache };
