/* list of features*/
/*1) have JS display the world of brick/coin etc DONE
2) have the pacman move up and down.

*/
var world = [
    [2,2,2,2,2,2,2,2,2,2],
    [2,0,2,1,1,1,3,2,0,2],
    [2,1,2,1,2,2,2,2,1,2],
    [2,1,2,1,1,1,1,1,1,2],
    [2,1,2,1,1,2,2,2,1,2],
    [2,1,1,1,1,2,3,2,1,2],
    [2,1,1,2,2,2,1,2,1,2],
    [2,3,1,1,1,1,1,2,0,2],
    [2,2,2,2,2,2,2,2,2,2]
];

var pacman = {
    x: 1,
    y: 1
};

var pacman2 = {
    x: 8,
    y: 1
}

var ghost = {
    x: 8,
    y: 7
}


var score = 0;

function displayWorld() {
    var output= "";

    for(var i=0; i<world.length; i++) { //need to loop twice to get to the inner array
        output += "\n<div class='row'>\n";
        for(var j=0; j<world[i].length; j++) {
            if(world[i][j] == 2) 
                output+="<div class='brick'></div>" // \n\t is adding a new line and a new tab each time the if runs.
            else if(world[i][j] == 1) 
                output+="<div class='coin'></div>"
            else if(world[i][j] == 0) 
                output+="<div class='empty'></div>"
            else if (world[i][j] == 3)
                output+="<div class='cherry'></div>"
            // else if (world[i][j] == 4)
            //     output+="<div id='ghost'></div>"
        }
        output += "\n</div>";
    }
    // console.log(output);
    document.getElementById('world').innerHTML = output;
}
function displayPacman() {
    document.getElementById('pacman').style.top = pacman.y*25.25+"px"
    document.getElementById('pacman').style.left = pacman.x*21.25+"px"
}

function displayPacman2() {
    document.getElementById('pacman2').style.top = pacman2.y*25.25+"px"
    document.getElementById('pacman2').style.left = pacman2.x*21.25+"px"
}

function displayScore() {
    document.getElementById('score').innerHTML = score;
}
function moveGhost() {
    var ghostMovementDecision = [1,2,3,4]
    var ghostCurrentTop = parseInt(document.getElementById('ghost').style.top);
    var ghostCurrentLeft = parseInt(document.getElementById('ghost').style.left);
    var randomDecision = ghostMovementDecision[Math.floor(Math.random() * ghostMovementDecision.length)]
    if (randomDecision == 1 && world[ghost.y][ghost.x-1] != 2) { 
        ghostCurrentLeft -= 21;
        document.getElementById('ghost').style.left = ghostCurrentLeft + "px";
        ghost.x--;
    }
    else if (randomDecision == 2 && world[ghost.y][ghost.x+1] != 2) {
        ghostCurrentLeft += 21;
        document.getElementById('ghost').style.left = ghostCurrentLeft + "px";
        ghost.x++;
    }
    else if (randomDecision == 3 && world[ghost.y-1][ghost.x] != 2) {
        ghostCurrentTop -= 25;
        document.getElementById('ghost').style.top = ghostCurrentTop + "px";
        ghost.y--;
    }
    else if (randomDecision == 4 && world[ghost.y+1][ghost.x] != 2) {
        ghostCurrentTop += 25;
        document.getElementById('ghost').style.top = ghostCurrentTop + "px";
        ghost.y++; // it's replacing the value of ghost element's top... instead of adding to it.
    }
    
    if(ghost.x == pacman.x && ghost.y == pacman.y)  {//if where the pacman is at right now is equal to 4...
        document.getElementById('pacman').remove();//make the Pacman "die" or disappear with class='empty'!
        displayWorld();//update the world each time a coin or cherry is eaten to show it's eaten
    }

    if(ghost.x == pacman2.x && ghost.y == pacman2.y)  {//if where the pacman is at right now is equal to 4...
        document.getElementById('pacman2').remove();//make the Pacman "die" or disappear with class='empty'!
        displayWorld();//update the world each time a coin or cherry is eaten to show it's eaten
    }
}



displayWorld();
displayPacman();
displayPacman2();
setInterval(moveGhost, 500);


document.onkeydown = function(e) {
    if (e.keyCode == 37 && world[pacman.y][pacman.x-1] != 2) {
        pacman.x--
    } //left key
    if (e.keyCode == 39 && world[pacman.y][pacman.x+1] != 2) {
        pacman.x++
    } //right key
    if (e.keyCode == 38 && world[pacman.y-1][pacman.x] != 2) {
        pacman.y--
    } //top key
    if (e.keyCode == 40 && world[pacman.y+1][pacman.x] != 2) {
        pacman.y++
    } //bottom key
    if (e.keyCode == 37 && world[pacman2.y][pacman2.x-1] != 2) {
        pacman2.x--
    } //left key
    if (e.keyCode == 39 && world[pacman2.y][pacman2.x+1] != 2) {
        pacman2.x++
    } //right key
    if (e.keyCode == 38 && world[pacman2.y-1][pacman2.x] != 2) {
        pacman2.y--
    } //top key
    if (e.keyCode == 40 && world[pacman2.y+1][pacman2.x] != 2) {
        pacman2.y++
    } //bottom key
    if (e.keyCode) {
        document.getElementById('pacman').style.transform = "rotate(180deg)";
        document.getElementById('pacman2').style.transform = "none";
    } //left key
    if (e.keyCode == 39) {
        document.getElementById('pacman').style.transform = "none";
        document.getElementById('pacman2').style.transform = "rotate(180deg)";
    } //right key
    if (e.keyCode == 38) {
        document.getElementById('pacman').style.transform = "rotate(270deg)";
        document.getElementById('pacman2').style.transform = "rotate(90deg)";
    } //top key
    if (e.keyCode == 40) {
        document.getElementById('pacman').style.transform = "rotate(90deg)";
        document.getElementById('pacman2').style.transform = "rotate(270deg)";
    } //bottom key

    if(world[pacman.y][pacman.x] == 1)  {//if where the pacman is at right now is equal to 1...
        world[pacman.y][pacman.x] = 0;//make the coin disappear with class='empty'!
        score+= 10; //increase score by 10 when eating a coin.  
        displayScore(); //update score
        displayWorld();//update the world each time a coin or cherry is eaten to show it's eaten
    }
    if(world[pacman.y][pacman.x] == 3)  {//if where the pacman is at right now is equal to 3...
        world[pacman.y][pacman.x] = 0;//make the cherry disappear with class='empty'!
        score+= 50; //increase score by 50 when eating a cherry.  
        displayScore(); //update score
        displayWorld();//update the world each time a coin or cherry is eaten to show it's eaten
    }
    if(world[pacman2.y][pacman2.x] == 1)  {//if where the pacman is at right now is equal to 1...
        world[pacman2.y][pacman2.x] = 0;//make the coin disappear with class='empty'!
        score+= 10; //increase score by 10 when eating a coin.  
        displayScore(); //update score
        displayWorld();//update the world each time a coin or cherry is eaten to show it's eaten
    }
    if(world[pacman2.y][pacman2.x] == 3)  {//if where the pacman is at right now is equal to 3...
        world[pacman2.y][pacman2.x] = 0;//make the cherry disappear with class='empty'!
        score+= 50; //increase score by 50 when eating a cherry.  
        displayScore(); //update score
        displayWorld();//update the world each time a coin or cherry is eaten to show it's eaten
    }
    //the only way this works is because var pacman is set to x: 0 and y:0. That way, we both can use index notation to move the pacman AND update the world / when the pacman is somewhere there's a coin.

    displayPacman()
    displayPacman2() //you must display the pacman again once you update its location.
    console.log("pacman2 Y: " + pacman2.y + " " + "pacman2 X: " + pacman2.x)
    console.log("pacman1 Y: " + pacman.y + " " + "pacman1 X: " + pacman.x)

    if(ghost.x == pacman.x && ghost.y == pacman.y)  {//if where the pacman is at right now is equal to 4...
        document.getElementById('pacman').remove();//make the Pacman "die" or disappear with class='empty'!
        displayWorld();//update the world each time a coin or cherry is eaten to show it's eaten
    }

    if(ghost.x == pacman2.x && ghost.y == pacman2.y)  {//if where the pacman is at right now is equal to 4...
        document.getElementById('pacman2').remove();//make the Pacman "die" or disappear with class='empty'!
        displayWorld();//update the world each time a coin or cherry is eaten to show it's eaten
    }
}