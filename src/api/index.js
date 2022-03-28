import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
});

const launchesQuery = (limit, offset) => gql`
    query GetLaunches{
      launches(limit: ${limit}, offset: ${offset}) {
        mission_name
        rocket {
          rocket_name
        }
      }
    }
`;

export const fetchLaunches = async (limit, offset) => {
  try {
    const { data } = await client.query({
      query: launchesQuery(limit, offset),
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
