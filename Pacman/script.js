/* list of features*/
/*1) have JS display the world of brick/coin etc DONE
2) have the pacman move up and down.

*/
var world = [
    [2,2,2,2,2,2,2,2,2,2],
    [2,1,2,1,1,1,1,2,1,2],
    [2,1,2,1,2,2,2,2,1,2],
    [2,1,2,1,1,1,1,1,1,2],
    [2,1,2,1,1,2,2,2,1,2],
    [2,1,1,1,1,2,1,2,1,2],
    [2,1,1,2,2,2,1,2,1,2],
    [2,1,1,1,1,1,1,2,1,2],
    [2,2,2,2,2,2,2,2,2,2]
];

var pacman = {
    x: 21,
    y: 25.5
};

function displayWorld() {
    var output= "";

    for(var i=0; i<world.length; i++) { //need to loop twice to get to the inner array
        output += "\n<div class='row'>\n";
        for(var j=0; j<world[i].length; j++) {
            if(world[i][j] == 2) 
                output+="<div class='brick'></div>" // \n\t is adding a new line and a new tab each time the if runs.
            else if(world[i][j] == 1) 
                output+="<div class='coin'></div>"
            if(world[i][j] == 0) 
                output+="<div class='empty'></div>"
        }
        output += "\n</div>";
    }
    // console.log(output);
    document.getElementById('world').innerHTML = output;
}
function displayPacman() {
    document.getElementById('pacman').style.top = pacman.y+"px"
    document.getElementById('pacman').style.left = pacman.x+"px"
}

displayPacman()
displayWorld();

document.onkeydown = function(e) {
    if (e.keyCode == 37) {
        pacman.x -= 21.25
    } //left key
    else if (e.keyCode == 39) {
        pacman.x += 21.25
    } //right key
    if (e.keyCode == 38) {
        pacman.y -= 25.25
    } //top key
    else if (e.keyCode == 40) {
        pacman.y += 25.25
    } //bottom key
    displayPacman() //you must display the pacman again once you update its location.
}