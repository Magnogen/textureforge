import {
  render as renderPalette,
  getRgb,
} from './palette.js';

import {
  render as renderCanvas,
} from './canvas.js';

const $picker = $('#picker');
const $palette = $('#palette');

const updatePicker = (e) => {
  const rect = $palette.getBoundingClientRect();
  
  const localX = e.clientX - rect.left;
  const localY = e.clientY - rect.top;

  $picker.style.top = `${e.clientY}px`;
  $picker.style.left = `${e.clientX}px`;

  const { r, g, b } = getRgb(localX, localY);
  $picker.style.backgroundColor = `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
};

$palette.on('pointerenter', (e) => {
  $picker.style.display = 'block';
  updatePicker(e);
});

$palette.on('pointermove', (e) => {
  $picker.style.display = 'block';
  updatePicker(e);
});

$palette.on('pointerleave', () => {
  $picker.style.display = 'none';
});