export default function({ $auth, $config: { google_client_id, login_api_url } }) {
  $auth.strategies.google.options.clientId = google_client_id;
  $auth.strategies.google.options.endpoints.userInfo = `${login_api_url}/user/local/profile`;
}
