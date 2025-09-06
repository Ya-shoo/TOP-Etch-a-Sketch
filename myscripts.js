// JavaScript for Etch-a-Sketch
const container = document.getElementById("container");
const btn = document.querySelector("#btn");


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

    // Add Event Listeners for all new created cells
    const cells = document.querySelectorAll(".cell");
    
    cells.forEach(cell => {
    cell.addEventListener('mouseover', () => {
        cell.style.backgroundColor = 'black';
        });
    });
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

