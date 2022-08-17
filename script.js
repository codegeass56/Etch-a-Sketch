//global boolean variable for checking if user clicked on drawing area
let userClickedOnGrid = false;
let eraserToolActive = false;
let gridLinesActive = true;
let gridSize = 16;

//Create mainContainer
// const mainContainer = document.createElement('div');
// mainContainer.classList.add('main-container');
// mainContainer.style.display = 'flex';
// mainContainer.style.flexDirection = 'column';
// mainContainer.style.justifyContent = 'center';
// mainContainer.style.alignItems = 'center';
// document.querySelector('body').appendChild(mainContainer);

const mainContainer = document.querySelector('.main-container');

//Create buttons container
const buttonContainer = document.querySelector('.button-container');
// buttonContainer.classList.add('button-container');
// buttonContainer.style.display = 'flex';
// buttonContainer.style.justifyContent = 'space-between';
// buttonContainer.style.width = '640px';
// mainContainer.appendChild(buttonContainer);

//Create button for prompt
// const promptButton = document.createElement('button');
// promptButton.style.height = '40px';
// promptButton.textContent = 'Select Grid Size';
// buttonContainer.appendChild(promptButton);

// //Create color picker
// const colorPicker = document.createElement('input');
// colorPicker.setAttribute('type', 'color');
// colorPicker.style.border = '1px solid black'
// colorPicker.style.padding = '0px'
// colorPicker.style.height = '40px';
// colorPicker.style.width = '100px';
// buttonContainer.appendChild(colorPicker);

//Create button for prompt
const eraserButton = document.querySelector('.eraser-button');
// eraserButton.style.height = '40px';
// eraserButton.style.backgroundColor = 'orange';
// eraserButton.textContent = 'Eraser';
// eraserButton.style.fontWeight = 'bold';
// eraserButton.style.fontSize = '25px';
// eraserButton.style.borderRadius = '15px';
// buttonContainer.appendChild(eraserButton);

//Create button for clearing grid
const clearButton = document.querySelector('.clear-button');
// clearButton.style.height = '40px';
// clearButton.textContent = 'Clear';
// clearButton.style.backgroundColor = '#4CAF50';
// clearButton.style.fontWeight = 'bold';
// clearButton.style.fontSize = '20px';
// clearButton.style.borderRadius = '10px';
// buttonContainer.appendChild(clearButton);

//Create the main container
const gridContainer = document.createElement('div');
gridContainer.classList.add('grid-container');
gridContainer.style.display = 'flex';
gridContainer.style.justifyContent = 'center';
gridContainer.style.backgroundColor = 'white';
mainContainer.append(gridContainer);

//Move the grid options to the end
mainContainer.append(document.querySelector('.grid-options-container'));

//Create the grid container
const gridItemContainer = document.createElement('div');
gridItemContainer.classList.add('grid-item-container');
gridItemContainer.style.flexShrink = '0';
gridContainer.appendChild(gridItemContainer);

//Set its default size
gridItemContainer.style.width = '640px';
gridItemContainer.style.height = '640px';

//Prompt button for user input
// promptButton.addEventListener('click', () => {
//   gridSize = prompt('Grid size? (Between 16 and 100)');
//   while (gridSize > 100 || gridSize < 0) {
//     gridSize = prompt('Invalid grid size. Please choose again.');
//   }
//   clearGrid(gridItemContainer);
// });

//Clear button
clearButton.addEventListener('click', () => {
  clearGrid(gridItemContainer);
});

//Trigger erasing
eraserButton.addEventListener('click', () => {
  if (eraserToolActive) {
    eraserToolActive = false;
    eraserButton.classList.remove('eraser-on');
  } else {
    eraserToolActive = true;
    eraserButton.classList.add('eraser-on');
  }
});

//Toggle grid lines
document.querySelector('.grid-lines-button')
  .addEventListener('click', () => {
    if (gridLinesActive) {
      gridLinesActive = false;
      disableGridLines(gridItemContainer);
    } else {
      gridLinesActive = true;
      enableGridLines(gridItemContainer);
    }
  })

//Create default 16x16 grid
createGrid(gridItemContainer, gridSize);

function createGrid(gridItemContainer, gridSize) {
  //Create a grid template (default grid size is 16 x 16)
  gridItemContainer.style.display = 'grid';

  //Add grid items with equal width and height as per grid size
  gridItemContainer.style.gridTemplateColumns = `repeat(${gridSize},auto)`;
  gridItemContainer.style.gridTemplateRows = `repeat(${gridSize},auto)`;

  //Add 16 x 16 grid items to the grid
  for (let i = 0; i < Math.pow(gridSize, 2); i++) {

    //Create the grid item
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.style.border = '1px solid #ccc';

    //Set attribute to disable dragging (other methods did not work)
    gridItem.setAttribute('ondragstart', 'return false');
    gridItemContainer.appendChild(gridItem);

    //Color item if mouse promptButton has been clicked
    gridItem.addEventListener('mousedown', () => {
      userClickedOnGrid = true;
      if (eraserToolActive) {
        eraseGridItem(gridItem);
      } else {
        colorGridItem(gridItem);
      }
    });

    //Color item if mouse cursor has entered the item area
    gridItem.addEventListener('mouseenter', () => {
      //Color the item if the user is in the drawable area
      if (userClickedOnGrid === true) {
        if (eraserToolActive) {
          eraseGridItem(gridItem);
        } else {
          colorGridItem(gridItem);
        }
      }
    });

    //Disable coloring when user releases mouse promptButton
    gridItem.addEventListener('mouseup', () => {
      userClickedOnGrid = false;
    });
  }
}

function clearGrid(gridItemContainer) {
  while (gridItemContainer.firstChild) {
    gridItemContainer.removeChild(gridItemContainer.firstChild);
  }
  createGrid(gridItemContainer, gridSize);
  if (gridLinesActive === false) {
    disableGridLines(gridItemContainer);
  }
}

function disableGridLines(gridItemContainer) {
  for (let i = 0; i < gridItemContainer.childNodes.length; i++) {
    gridItemContainer.childNodes[i].style.border = 'none';
  }
}

function enableGridLines(gridItemContainer) {
  for (let i = 0; i < gridItemContainer.childNodes.length; i++) {
    gridItemContainer.childNodes[i].style.border = '1px solid #ccc';
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

//Erase the grid item color
function eraseGridItem(gridItem) {
  let currentColor = gridItem.style.backgroundColor;
  if (currentColor === "") {
    return;
  } else {
    let currentAlpha = getAlphaColorValue(currentColor);
    if (currentAlpha > 0) {
      currentAlpha -= 0.1;
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