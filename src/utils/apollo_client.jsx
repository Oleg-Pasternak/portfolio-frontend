import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const graphql_endpoint = "https://backend.karpenko.work/api/graphql";
const allowed_hosts = ["karpenko.work", "pasternak.work"];

const generateApolloClients = (allowedHosts, endpoint) => {
  let clients = {};

  allowedHosts.forEach((host) => {
    clients[host] = new ApolloClient({
      uri: endpoint,
      cache: new InMemoryCache(),
    });
  });
  clients["default"] = new ApolloClient({
    uri: graphql_endpoint,
    cache: new InMemoryCache(),
  })

  return clients;
};

export const clients_dict = generateApolloClients(allowed_hosts, graphql_endpoint);