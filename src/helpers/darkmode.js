import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

class DarkMode {
  constructor() {
    this.apiUrl =
      'https://api.sunrisesunset.io/json?lat=47.362000&lng=8.517480';

    this.check();

    setInterval(() => {
      this.check();
    }, 60000);
  }
  async check() {
    const response = await fetch(this.apiUrl);
    const data = await response.json();
    const lastLight = dayjs(data.results.dusk, 'h:m:s A');
    const sunrise = dayjs(data.results.dawn, 'h:m:s A');
    const now = dayjs();
    const isDay = now.isBetween(sunrise, lastLight);
    if (isDay) {
    } else {
      document.body.classList.add('dark');
    }
    document.body.classList.remove('dark');
    return data;
  }
}
export default DarkMode;
