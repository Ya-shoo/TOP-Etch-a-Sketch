// JavaScript for Etch-a-Sketch

const container = document.getElementById("container");

//16x16 grid of divs
function createGrid(numDivs) {
    for (let d = 0; d < numDivs; d++) {
        let cells = document.createElement("div");
        cells.setAttribute("class", "cell");
        container.appendChild(cells);
    }
}
createGrid((16 * 16));

let gridItems = document.querySelectorAll(".cell");

gridItems.forEach(cell => {
    cell.addEventListener('mouseover', () => {
        cell.style.backgroundColor = 'black';
    });
});