//global boolean variable for checking if user clicked on drawing area
let userClickedOnGrid = false;
let gridSize = 16;

//Create button for prompt
const button = document.createElement('button');
button.style.height = '40px';
button.textContent = 'Click me to select a grid size';
document.querySelector('body').appendChild(button);


//Create the main container
const mainContainer = document.createElement('div');
mainContainer.classList.add('main-container');
document.querySelector('body').appendChild(mainContainer);

//Set its default size
mainContainer.style.width = '640px';
mainContainer.style.height = '640px';

//Button listener to create grid as per user input
button.addEventListener('click', () => {
  gridSize = prompt('Grid size? (Between 16 and 100)');
  while (gridSize > 100 || gridSize < 0) {
    gridSize = prompt('Invalid grid size. Please choose again.');
  }
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
  createGrid(mainContainer, gridSize);
});

//Create default 16x16 grid
createGrid(mainContainer, gridSize);

function createGrid(mainContainer, gridSize) {
  //Create a grid template (default grid size is 16 x 16)
  mainContainer.style.display = 'grid';

  //Add grid items with equal width and height as per grid size
  mainContainer.style.gridTemplateColumns = `repeat(${gridSize},auto)`;
  mainContainer.style.gridTemplateRows = `repeat(${gridSize},auto)`;

  //Add 16 x 16 grid items to the grid
  for (let i = 0; i < Math.pow(gridSize, 2); i++) {

    //Create the grid item
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.style.border = '1px solid #ccc';

    //Set attribute to disable dragging (other methods did not work)
    gridItem.setAttribute('ondragstart', 'return false');
    mainContainer.appendChild(gridItem);

    //Color item if mouse button has been clicked
    gridItem.addEventListener('mousedown', () => {
      userClickedOnGrid = true;
      colorGridItem(gridItem);
    });

    //Color item if mouse cursor has entered the item area
    gridItem.addEventListener('mouseenter', () => {
      //Color the item if the user is in the drawable area
      if (userClickedOnGrid === true) {
        colorGridItem(gridItem);
      }
    });

    //Disable coloring when user releases mouse button
    gridItem.addEventListener('mouseup', () => {
      userClickedOnGrid = false;
    });
  }
}

//Color the grid item
function colorGridItem(gridItem) {
  let currentColor = gridItem.style.backgroundColor;
  if (currentColor === "") {
    gridItem.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
  } else {
    let currentAlpha = getAlphaColorValue(currentColor);
    if (currentAlpha < 1) {
      currentAlpha += 0.1;
      gridItem.style.backgroundColor = `rgba(0, 0, 0, ${currentAlpha})`;
    }
  }
}

//Get current alpha value from current rgb or rgba string value
function getAlphaColorValue(rgbaColor) {
  let values = [];
  //If color is of the form rgba(x,x,x,x)
  if (rgbaColor.substring(0, 4) === 'rgba') {
    values = rgbaColor.substring(5, rgbaColor.length - 1).split(", ");
  } else {
    //If color is of the form rgb(x,x,x) then alpha is 1
    values = [1];
  }
  return parseFloat(values[values.length - 1]);
}