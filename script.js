const width = 512;
const height = 512;
const columns = 16;
const gap = 1;
let fontSize = 32;
let fontFamily = 'monospace';
const canvas = document.querySelector('#canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');
const fontFamilyInput = document.querySelector('#fontFamily');
fontFamilyInput.value = fontFamily;
fontFamilyInput.addEventListener('input', handleInput);
downloadButton = document.querySelector('#download');
downloadButton.addEventListener('click', () => {
  const dataUrl = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `${fontSize}px ${fontFamily}.png`;
  a.click();
  navigator.clipboard.writeText(`${ctx.measureText('a').width}`);
});
function handleInput() {
  fontSize = 32;
  fontFamily = fontFamilyInput.value || 'monospace';
  ctx.reset();
  for (ctx.font = `${fontSize + 1}px ${fontFamily}`; gap + columns * (ctx.measureText('a').width + gap) < width; ctx.font = `${++fontSize + 1}px ${fontFamily}`) {}
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = 'white';
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < columns; col++) {
      ctx.fillText(String.fromCharCode(32 + row * columns + col), gap + col * (ctx.measureText('a').width + gap), gap + fontSize + row * (gap + fontSize) - ctx.measureText(String.fromCharCode(...Array.from({ length: 95 }, (_, i) => 32 + i))).actualBoundingBoxDescent + 1) 
    }
  }
  // for (let row = 0; row < 6; row++) {
  //   for (let col = 0; col < columns; col++) {
  //     ctx.strokeStyle = 'white';
  //     ctx.strokeRect(1 + col * (ctx.measureText('a').width + 1), 1 + row * (fontSize + 1), ctx.measureText('a').width, fontSize);
  //   }
  // }
}
handleInput();