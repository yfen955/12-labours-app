export default ({
  app,
  beforeNuxtRender,
  $config: {
    query_access_token,
    login_api_key,
    login_secret_key,
    twelve_labours_xml,
  },
}) => {
  app.router.afterEach((to, from) => {
    if (process.server) {
      beforeNuxtRender((nuxtState) => {
        nuxtState.nuxtState.config.query_access_token = query_access_token;
        nuxtState.nuxtState.config.login_api_key = login_api_key;
        nuxtState.nuxtState.config.login_secret_key = login_secret_key;
        nuxtState.nuxtState.config.twelve_labours_xml = twelve_labours_xml;
      });
    }
  });
};
