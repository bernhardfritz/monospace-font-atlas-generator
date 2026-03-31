const width = 512;
const height = 512;
const columns = 16;
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
});
function handleInput() {
  fontSize = 32;
  fontFamily = fontFamilyInput.value || 'monospace';
  ctx.reset();
  for (ctx.font = `${fontSize + 1}px ${fontFamily}`; ctx.measureText('a').width < width / columns; ctx.font = `${++fontSize + 1}px ${fontFamily}`) {}
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = 'white';
  for (let row = 0; row < 6; row++) {
    ctx.fillText(String.fromCharCode(...Array.from({ length: columns }, (_, i) => 32 + row * columns + i)), 0, fontSize + row * fontSize - ctx.measureText(String.fromCharCode(...Array.from({ length: 95 }, (_, i) => 32 + i))).actualBoundingBoxDescent);
  }
}
handleInput();