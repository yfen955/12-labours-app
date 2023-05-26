import { GraphQLClient } from "graphql-request";

export default (
  { beforeNuxtRender, $config: { graphcms_endpoint } },
  inject
) => {
  if (typeof window === "undefined") {
    beforeNuxtRender((nuxtState) => {
      nuxtState.nuxtState.config.graphcms_endpoint = graphcms_endpoint;
    });
  }
  inject("graphcms", new GraphQLClient(graphcms_endpoint));
};
