import HomeAssistant from '../src/helpers/homeassistant.js';
import ws from 'ws';
import http from 'http';
import fs from 'fs';
import { exec } from 'child_process';

global.WebSocket = ws;
const homeassistant = new HomeAssistant();

const coverBase = 'http://homeassistant.local:8123';
const mediaEntities = [
  'media_player.living_room',
  'media_player.bathroom',
  'media_player.bedroom',
  'media_player.kitchen',
];
const imageName = 'cover.jpg';

function checkCover(_entities) {
  let url = null;
  mediaEntities.forEach((slug) => {
    const entity = _entities[slug];
    if (!entity) return;
    if (entity.state == 'playing' && entity.attributes.entity_picture) {
      url = coverBase + entity.attributes.entity_picture;
    }
  });
  console.log(url);
  if (!url) return;
  const file = fs.createWriteStream(imageName);
  http
    .get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        exec(
          '~/python3-idotmatrix-client/run_in_venv.sh --address D4:B6:AD:A9:EA:9B --image true --set-image ~/hyper-dash/idotmatrix/cover.jpg --process-image 32'
        );
        console.log(`Image downloaded as ${imageName}`);
      });
    })
    .on('error', (err) => {
      fs.unlink(imageName);
      console.error(`Error downloading image: ${err.message}`);
    });
}

homeassistant.connectSocket((ent) => {
  checkCover(ent);
});
