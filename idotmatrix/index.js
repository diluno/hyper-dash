import HomeAssistant from '../src/helpers/homeassistant.js';
import ws from 'ws';
import http from 'http';
import fs from 'fs';
import { exec } from 'child_process';
import Jimp from 'jimp';
import { subscribeEntities } from 'home-assistant-js-websocket';

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
let cover = '';

var child = null;

function turnOff() {
  if (child) {
    child.kill();
    child = null;
  }
  child = exec(
    '~/python3-idotmatrix-client/run_in_venv.sh --address D4:B6:AD:A9:EA:9B --screen off'
  );
}

function checkCover(_entities) {
  let url = null;
  mediaEntities.forEach((slug) => {
    const entity = _entities[slug];
    if (!entity) return;
    if (entity.state == 'playing' && entity.attributes.entity_picture) {
      url = coverBase + entity.attributes.entity_picture;
    }
  });
  if (!url) {
    turnOff();
    return;
  }
  if (url == cover) return;
  console.log(url);
  cover = url;
  const file = fs.createWriteStream(imageName);
  http
    .get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        Jimp.read('cover.jpg', (err, lenna) => {
          if (err) throw err;
          lenna
            .resize(32, 32) // resize
            .write('cover.png'); // save
          if (child) {
            child.kill();
            child = null;
          }
          child = exec(
            '~/python3-idotmatrix-client/run_in_venv.sh --address D4:B6:AD:A9:EA:9B --image true --set-image ~/hyper-dash/idotmatrix/cover.png'
          );
        });
      });
    })
    .on('error', (err) => {
      fs.unlink(imageName);
      console.error(`Error downloading image: ${err.message}`);
    });
}

const conn = await homeassistant.connectSocket();
subscribeEntities(conn, (ent) => {
  checkCover(ent);
});
