export default function({ $auth, $config: { client_id, login_url } }) {
  $auth.strategies.google.options.clientId = client_id;
  $auth.strategies.google.options.endpoints.userInfo = `${login_url}/user/local/profile`;
}
