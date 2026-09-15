import { converter } from 'https://cdn.skypack.dev/culori';

const toRgb = converter('rgb');

const c = $('canvas#palette');
const ctx = c.getContext('2d');

const canvasScale = 1/8;

const $chroma = $('input#chroma');

export const render = () => {
  const { width: w, height: h } = c.getBoundingClientRect();

  const width  = c.width  = Math.floor(w * canvasScale);
  const height = c.height = Math.floor(width / 2);

  const chroma = Number($chroma.value);

  const img = ctx.getImageData(0, 0, width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = 4 * (y * width + x);

      let col = {
        mode: 'hsl',
        h: (x / width) * 360,
        s: chroma,
        l: 1 - (y / height),
      };
      
      const { r, g, b } = toRgb(col);

      img.data[i + 0] = Math.min(255, Math.max(0, (r || 0) * 255));
      img.data[i + 1] = Math.min(255, Math.max(0, (g || 0) * 255));
      img.data[i + 2] = Math.min(255, Math.max(0, (b || 0) * 255));
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
};

$chroma.on('input', render);
render();

export const getRgb = (cssX, cssY) => {
  const { width: w, height: h } = c.getBoundingClientRect();

  const width  = Math.floor(w * canvasScale);
  const height = Math.floor(width / 2);

  const x = (cssX / w) * width;
  const y = (cssY / h) * height;

  const chroma = Number($chroma.value);

  const col = {
    mode: 'hsl',
    h: Math.min(360, Math.max(0, (x / width) * 360)),
    s: chroma,
    l: Math.min(1, Math.max(0, 1 - (y / height))),
  };

  return toRgb(col);
};