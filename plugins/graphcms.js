import { GraphQLClient } from "graphql-request";

export default (
  { beforeNuxtRender, $config: { graphcms_endpoint } },
  inject
) => {
  if (process.server) {
    beforeNuxtRender((nuxtState) => {
      nuxtState.nuxtState.config.graphcms_endpoint = graphcms_endpoint;
    });
  }
  inject(
    "graphcms",
    graphcms_endpoint ? new GraphQLClient(graphcms_endpoint) : graphcms_endpoint
  );
};
