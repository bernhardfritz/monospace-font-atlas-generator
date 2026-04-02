const rows = 6;
const columns = 16;
const gap = 1;
const DEFAULT_FONT_SIZE = 32;
const DEFAULT_FONT = `${DEFAULT_FONT_SIZE}px monospace`;
let fontSize = DEFAULT_FONT_SIZE;
let font = DEFAULT_FONT;
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const fontInput = document.querySelector('#fontInput');
fontInput.value = font;
fontInput.addEventListener('input', () => {
  font = fontInput.value;
  const regexMatch = font.match(/(\d+)px (.+)/);
  if (regexMatch) {
    fontSize = +regexMatch[1]; 
  } else {
    font = DEFAULT_FONT;
    fontSize = DEFAULT_FONT_SIZE;
  }
  repaint();
});
downloadButton = document.querySelector('#downloadButton');
downloadButton.addEventListener('click', () => {
  const dataUrl = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `${fontInput.value}.png`;
  a.click();
});
function repaint() {
  ctx.font = font;
  const monospaceWidth = ctx.measureText('a').width;
  canvas.width = Math.ceil(gap + (monospaceWidth + gap) * columns);
  canvas.height = Math.ceil(gap + (fontSize + gap) * rows);
  ctx.reset();
  ctx.font = font;
  ctx.fillStyle = 'white';
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      ctx.fillText(String.fromCharCode(32 + row * columns + col), gap + col * (ctx.measureText('a').width + gap), gap + fontSize + row * (gap + fontSize) - ctx.measureText(String.fromCharCode(...Array.from({ length: 95 }, (_, i) => 32 + i))).actualBoundingBoxDescent + 1);
    }
  }
  // for (let row = 0; row < rows; row++) {
  //   for (let col = 0; col < columns; col++) {
  //     ctx.strokeStyle = 'white';
  //     ctx.strokeRect(gap + col * (ctx.measureText('a').width + gap), gap + row * (fontSize + gap), ctx.measureText('a').width, fontSize);
  //   }
  // }
}
repaint();