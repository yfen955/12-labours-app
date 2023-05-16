import { GraphQLClient } from "graphql-request";

export default ({ $config: { graphcms_endpoint } }, inject) => {
  inject("graphcms", new GraphQLClient(graphcms_endpoint));
};
