import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
    uri: 'https://pasternak.work/api/graphql/',
    cache: new InMemoryCache(),
});

export default client;