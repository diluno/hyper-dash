import chroma from 'chroma-js';
import { Hsluv } from 'hsluv';
var conv = new Hsluv();

const parts = 4;
const minHueDiffAngle = 60;

function contrastingColor(hex, factorAlpha = false) {
  let [r, g, b, a] = hex
    .replace(
      /^#?(?:(?:(..)(..)(..)(..)?)|(?:(.)(.)(.)(.)?))$/,
      '$1$5$5$2$6$6$3$7$7$4$8$8'
    )
    .match(/(..)/g)
    .map((rgb) => parseInt('0x' + rgb));
  return (~~(r * 299) + ~~(g * 587) + ~~(b * 114)) / 1000 >= 128 ||
    (!!(~(128 / a) + 1) && factorAlpha)
    ? '#000'
    : '#FFF';
}
function hsluvToHex(h, s, l) {
  const conv = new Hsluv();
  conv.hsluv_h = h;
  conv.hsluv_s = s;
  conv.hsluv_l = l;
  conv.hsluvToHex();
  return conv.hex;
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function getColors() {
  const colors = [];
  // create an array of hues to pick from.
  const baseHue = random(0, 360);
  const hues = new Array(Math.round(360 / minHueDiffAngle))
    .fill('')
    .map((offset, i) => {
      return (baseHue + i * minHueDiffAngle) % 360;
    });

  //  low saturation color
  const baseSaturation = random(5, 40);
  const baseLightness = random(0, 20);
  const rangeLightness = 90 - baseLightness;

  colors.push(
    hsluvToHex(hues[0], baseSaturation, baseLightness * random(0.25, 0.75))
  );

  // random shades
  const minSat = random(50, 70);
  const maxSat = minSat + 30;
  const minLight = random(35, 70);
  const maxLight = Math.min(minLight + random(20, 40), 95);
  // const lightDiff = maxLight - minLight;

  const remainingHues = [...hues];

  for (let i = 0; i < parts - 2; i++) {
    const hue = remainingHues.splice(random(0, remainingHues.length - 1), 1)[0];
    const saturation = random(minSat, maxSat);
    const light =
      baseLightness + random(0, 10) + (rangeLightness / (parts - 1)) * i;

    colors.push(hsluvToHex(hue, saturation, random(light, maxLight)));
  }

  colors.push(
    hsluvToHex(remainingHues[0], baseSaturation, rangeLightness + 10)
  );

  const colors2 = chroma.scale(colors).padding(0.175).mode('lab').colors(4);

  return colors2.map((c) => {
    return {
      color: c,
      textColor: contrastingColor(c),
    };
  });
}
