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

//Check if user has clicked using the mouse
mainContainer.addEventListener('mousedown', () => {
  userClickedOnGrid = true;
});

//Check if user has released the mouse button
mainContainer.addEventListener('mouseup', () => {
  userClickedOnGrid = false;
});

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

    //Color item if mouse cursor has entered the item area
    gridItem.addEventListener('mouseenter', () => {
      //Color the item if the user is in the drawable area
      if (userClickedOnGrid === true) {
        let currentColor = gridItem.style.backgroundColor;
        if (currentColor === "") {
          gridItem.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        } else {
          let currentAlpha = getAlphaColorValue(currentColor); //if alpha is zero then color is rgb(0,0,0)
          if (currentAlpha > 0) {
            currentAlpha += 0.1;
            gridItem.style.backgroundColor = `rgba(0, 0, 0, ${currentAlpha})`;
          }
        }

      }
    });

    //Color item if user clicks using the mouse
    gridItem.addEventListener('mouseup', () => {
      //Color the item if the user is in the drawable area
      if (userClickedOnGrid === true) {
        let currentColor = gridItem.style.backgroundColor;
        if (currentColor === "") {
          gridItem.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        } else {
          let currentAlpha = getAlphaColorValue(currentColor);
          if (currentAlpha > 0) {
            currentAlpha += 0.1;
            gridItem.style.backgroundColor = `rgba(0, 0, 0, ${currentAlpha})`;
          }
        }
      }
    });
  }
}

function getAlphaColorValue(rgbaColor) {
  let values = [];
  if (rgbaColor.substring(0, 4) === 'rgba') {
    values = rgbaColor.substring(5, rgbaColor.length - 1).split(", ");
  } else {
    values = rgbaColor.substring(4, rgbaColor.length - 1).split(", ");
  }
  return parseFloat(values[values.length - 1]);
}