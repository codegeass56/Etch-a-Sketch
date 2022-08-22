//global boolean variable for checking if user clicked on drawing area
let userClickedOnGrid = false;
let eraserToolActive = false;
let gridLinesActive = true;
let gridSize = 16;

//Get main container
const mainContainer = document.querySelector('.main-container');

//Ensure drawing button is disable when outside the grid
document.querySelector('body').addEventListener(
  'mouseup', () => {
    if (userClickedOnGrid) {
      userClickedOnGrid = false;
    }
  }
)
//Get buttons container
const buttonContainer = document.querySelector('.button-container');

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

//get button for clearing grid
const clearButton = document.querySelector('.clear-button');

//Create the grid container
const gridContainer = document.createElement('div');
gridContainer.classList.add('grid-container');
gridContainer.style.display = 'flex';
gridContainer.style.justifyContent = 'center';
gridContainer.style.backgroundColor = 'white';
mainContainer.append(gridContainer);

//Move the grid options to the end
mainContainer.append(document.querySelector('.grid-options-container'));

//Create the grid item container
const gridItemContainer = document.createElement('div');
gridItemContainer.classList.add('grid-item-container');
gridItemContainer.style.flexShrink = '0';
gridContainer.appendChild(gridItemContainer);

//Set its default size
gridItemContainer.style.width = '640px';
gridItemContainer.style.height = '640px';

//Grid size slider
const gridSizeSlider = document.querySelector('.grid-size-range');
gridSizeSlider.addEventListener('change', () => {
  gridSize = gridSizeSlider.value;
  document.querySelector('.current-grid-size-text').textContent =
    `Grid Size ${gridSize} x ${gridSize}`;
  clearGrid(gridItemContainer);
})

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