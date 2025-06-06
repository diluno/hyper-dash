import {
  getAuth,
  createLongLivedTokenAuth,
  createConnection,
  ERR_HASS_HOST_REQUIRED,
} from 'home-assistant-js-websocket';

class HomeAssistant {
  constructor() {
    this.hassioUrl = 'http://homeassistant.local:8123';
    // this.hassioUrl = 'https://hassio.dil.uno';
    this.token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzYTg1YjIxNGU3NjE0YjlmOGYxMTNhMTU0YWRkZGU0ZCIsImlhdCI6MTczNTg0NzQwMiwiZXhwIjoyMDUxMjA3NDAyfQ.L92_K-gAIvgYPNN_8qQfpsVoMEw_2HVSXFh_K0ravyQ';
  }
  async connectSocket() {
    let auth;
    try {
      auth = await createLongLivedTokenAuth(this.hassioUrl, this.token);
    } catch (err) {
      if (err === ERR_HASS_HOST_REQUIRED) {
        auth = await getAuth({ hassUrl: this.hassioUrl });
      } else {
        alert(`Unknown error: ${err}`);
        return;
      }
    }
    const connection = await createConnection({ auth });
    // subscribeEntities(connection, _callback);
    return connection;
  }
}
export default HomeAssistant;
