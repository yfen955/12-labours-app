export default function({ $axios, $config: { login_api_key } }) {
  $axios.onRequest((config) => {
    config.headers.common["Authorization"] = login_api_key;
  });
}
