import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache:new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
