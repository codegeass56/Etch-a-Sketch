//Boolean to check if user clicked on the grid
let userClickedOnGrid = false;

//Create the main container
const mainContainer = document.createElement('div');
mainContainer.classList.add('main-container');
document.querySelector('body').appendChild(mainContainer);

//Check if user has clicked using the mouse
mainContainer.addEventListener('mousedown', () => {
  userClickedOnGrid = true;
});

//Check if user has released the mouse button
mainContainer.addEventListener('mouseup', () => {
  userClickedOnGrid = false;
});

//Set its default size
mainContainer.style.width = '640px';
mainContainer.style.height = '640px';

//Create a grid template (default grid size is 16 x 16)
mainContainer.style.display = 'inline-grid';
let gridSize = 16;

//Add grid items with equal width and height as per grid size
mainContainer.style.gridTemplateColumns = `repeat(${gridSize},auto)`;
mainContainer.style.gridTemplateRows = `repeat(${gridSize},auto)`;

//Add 16 x 16 grid items to the grid
for (let i = 0; i < Math.pow(gridSize, 2); i++) {
  //Create the grid item
  const gridItem = document.createElement('div');
  gridItem.classList.add('grid-item');
  gridItem.style.border = '1px solid black';
  //Set attribute to disable dragging (other methods did not work)
  gridItem.setAttribute('ondragstart', 'return false');
  mainContainer.appendChild(gridItem);
  //Color item if mouse cursor has entered the item area
  gridItem.addEventListener('mouseenter', () => {
    //Color the item if the user is in the drawable area
    if (userClickedOnGrid === true) {
      gridItem.style.backgroundColor = 'black';
    }
  });
  //Color item if user clicks using the mouse
  gridItem.addEventListener('mouseup', () => {
    //Color the item if the user is in the drawable area
    if (userClickedOnGrid === true) {
      gridItem.style.backgroundColor = 'black';
    }
  });

}