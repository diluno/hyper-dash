class HomeAssistant {
  constructor() {
    this.baseUrl = 'http://localhost:8080';
    this.token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2ZDM5NGE5N2VhYTM0ZmJiYWY0MDFiYTMzZjRhZjFiYyIsImlhdCI6MTcwNTA5NDM2MywiZXhwIjoyMDIwNDU0MzYzfQ.91RstDHi9OG1U0_OFWudSjaNGzTo5RWX2laKbhIFZMU';
  }
  async getPlayerState(entityId) {
    const url = `${this.baseUrl}/states/${entityId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        ContentType: 'application/json',
      },
    });
    const data = await response.json();
    return data;
  }
}
export default HomeAssistant;
