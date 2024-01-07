import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          savedBooks: {
            merge(existing, incoming) {
              existing = Array.isArray(existing) ? existing:[];
              // Define your custom merge function here
              // For example, you might want to merge the incoming books with the existing ones
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
