//Create the main container
const mainContainer = document.createElement('div');
mainContainer.classList.add('main-container');
document.querySelector('body').appendChild(mainContainer);

//Set its default size
mainContainer.style.width = '640px';
mainContainer.style.height = '640px';

//Create a grid template (default grid size is 16 x 16)
mainContainer.style.display = 'inline-grid';

let gridSize = 16;
mainContainer.style.gridTemplateColumns = `repeat(${gridSize},40px)`;
mainContainer.style.gridTemplateRows = `repeat(${gridSize},40px)`;

//Add 16 x 16 grid items to the grid
for (let i = 0; i < Math.pow(gridSize, 2); i++) {
  const gridItem = document.createElement('div');
  gridItem.classList.add('grid-item');
  gridItem.textContent = `${i + 1}`;
  mainContainer.appendChild(gridItem);
  gridItem.addEventListener('mouseenter', () => {
    gridItem.style.backgroundColor = 'black';
  });
}