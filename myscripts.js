// JavaScript for Etch-a-Sketch
const container = document.getElementById("container");
const newSketchBtn = document.querySelector("#btn");
const resetBtn = document.getElementById("reset-btn");


function createGrid(numDivsPerSide) {
    // Flush existing grid
    container.innerHTML = "";

    // Dynamically Calculate the width of each cell
    const cellWidth = 100 / numDivsPerSide;
    const totalCells = numDivsPerSide * numDivsPerSide;

    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        //set flex-basis dynamically
        cell.style.flexBasis = `${cellWidth}%`;
        container.appendChild(cell);
    }
    // Call the function to attach both mouse and touch listeners
    attachDrawingListeners();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function draw(cell) {
    let hoverCount = parseInt(cell.dataset.hoverCount) || 0;
    
    if (hoverCount === 0) {
        cell.style.backgroundColor = getRandomColor();
    }

    if (hoverCount < 10) {
        hoverCount++;
        cell.dataset.hoverCount = hoverCount;
        const darkeningFactor = 100 - (hoverCount * 10);
        cell.style.filter = `brightness(${darkeningFactor}%)`;
    }
}

function attachDrawingListeners() {
    let isDrawing = false;
    const cells = document.querySelectorAll(".cell");

    // Add a single listener to the container
    container.addEventListener('mousedown', () => { isDrawing = true; });
    container.addEventListener('mouseup', () => { isDrawing = false; });
    container.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        if (e.target.classList.contains('cell')) {
            draw(e.target);
        }
    });

    // Add touch event listeners to the container
    container.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent scrolling and other default behaviors
        isDrawing = true;
        if (e.target.classList.contains('cell')) {
            draw(e.target);
        }
    });

    container.addEventListener('touchend', () => {
        isDrawing = false;
        // Reset hover counts on all cells after drawing ends
        cells.forEach(cell => {
            delete cell.dataset.hoverCount;
        });
    });

    container.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling and other default behaviors
        if (!isDrawing) return;
        const touch = e.touches[0];
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        if (targetElement && targetElement.classList.contains('cell')) {
            draw(targetElement);
        }
    });
}

function resetGrid() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = '#ffffff';
        cell.style.filter = 'brightness(100%)';
        delete cell.dataset.hoverCount;
    });
    attachDrawingListeners();
}

//Button & User Prompt
function promptUser() {
    const userInput = prompt("Enter the number of squares per side of your canvas (1-100)");

    //Input Validation
    if (userInput === null || userInput.trim() === '') {
        return;
    }
    const gridDimension = Number(userInput);

    if (gridDimension >= 1 && gridDimension <= 100) {
        createGrid(gridDimension);
    } else {
        alert ("Please enter a number between 1 and 100.")
    }

}

// Default Grid Creation
createGrid(16);
//Button Event Listener
btn.addEventListener('click', promptUser);
resetBtn.addEventListener('click', resetGrid);

