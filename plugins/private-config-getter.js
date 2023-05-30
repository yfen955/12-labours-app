export default (
  {
    beforeNuxtRender,
    $config: { login_api_key, login_secret_key, twelve_labours_xml },
  },
  inject
) => {
  function configGetter() {
    if (process.server) {
      beforeNuxtRender((nuxtState) => {
        nuxtState.nuxtState.config.login_api_key = login_api_key;
        nuxtState.nuxtState.config.login_secret_key = login_secret_key;
        nuxtState.nuxtState.config.twelve_labours_xml = twelve_labours_xml;
      });
    }
  }
  inject("configGetter", () => {
    return configGetter();
  });
};
