import Header from './Header';
import Scroll from './Scroll';
import { ApolloProvider } from '@apollo/client';
import { client } from '../api';

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Scroll />
    </ApolloProvider>
  );
}

export default App;
