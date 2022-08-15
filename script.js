const mainContainer = document.createElement('div');
mainContainer.classList.add('main-container');
document.querySelector('body').appendChild(mainContainer);
mainContainer.style.display = 'inline-grid';
mainContainer.style.gridTemplateColumns = 'repeat(16,40px)';
mainContainer.style.gridTemplateRows = 'repeat(16,40px)';


for (let i = 0; i < 256; i++) {
  const gridItem = document.createElement('div');
  gridItem.classList.add('grid-item');
  gridItem.textContent = `${i + 1}`;
  mainContainer.appendChild(gridItem);
}