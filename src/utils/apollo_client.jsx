import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
    uri: 'https://backend.karpenko.work/api/graphql',
    cache: new InMemoryCache(),
});

export default client;