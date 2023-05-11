import { GraphQLClient } from "graphql-request";

export default ({ $config: { graphcms_api } }, inject) => {
  inject("graphcms", new GraphQLClient(graphcms_api));
};
