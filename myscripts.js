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
    attachHoverListeners();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function attachHoverListeners() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        let hoverCount = 0;
        let initialColor = null;

        cell.addEventListener('mouseover', () => {
            if (hoverCount === 0) {
                initialColor = getRandomColor();
                cell.style.backgroundColor = initialColor;
            }
            if (hoverCount < 10) {
                hoverCount++;
                const darkeningFactor = 100 - (hoverCount * 10);
                cell.style.filter = `brightness(${darkeningFactor}%)`;
            }
        });
    });
}

function resetGrid() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = '#ffffff';
        cell.style.filter = 'brightness(100%)';
    });
    attachHoverListeners();
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



// // Add Event Listeners for all new created cells
//     const cells = document.querySelectorAll(".cell");
    
//     cells.forEach(cell => {
//     cell.addEventListener('mouseover', () => {
//         cell.style.backgroundColor = 'black';
//         });
//     });