var torpedosUsed = 25;
var board = [];
var SHIP = 5;
var coordinates = [];
var shipsSunk = 0;

$(document).ready(function(){
  boardSetup();
  $("td").on("click",
    function() {
      $(this).addClass("miss").off("click");
      fireTorpedo();
      $("#torpedos").text("Torpedos Left: " +torpedosUsed);
      //sets the value of the coordinates == to the td's id
      coordinates = $(this).attr("id");
      //if the coordinates match match the location of a ship
      if (board[coordinates[0]][coordinates[1]] == 5) {
        // calls the id using the values of the coordinates. and adds a class and increments shipsSunk.
        $("#"+coordinates[0]+coordinates[1]).addClass("hit");
        shipsSunk++;
      }
      if (shipsSunk == 5) {
        $("#result").text("Congrats, You Sunk My Battleships.");
        $("td").off("click");
      }
      if (torpedosUsed <= 0) {
        $("td").off("click");
        if (shipsSunk < 5) {
          $("#result").text("Sorry, You Lose.");
          revealAnswer();
        }
      }
    }
  );

  createBoard(board);
  $("#Ship1").on("click",
    function() {
      clearTDClasses();
      board = [];
      createBoard(board);
      deployShipX(board, 1, 5);
    }
  );
  $("#Ship5").on("click",
    function() {
      clearTDClasses();
      board = [];
      createBoard(board);
      deployShipX(board, 5, 1);
    }
  );
  $("#Ship4").on("click",
    function() {
      clearTDClasses();
      board = [];
      createBoard(board);
      deployShipX(board, 4, 2);
    }
  );
  $("#Ship3").on("click",
    function() {
      clearTDClasses();
      board = [];
      createBoard(board);
      deployShipX(board, 3, 2);
    }
  );
  $("#Ship2").on("click",
    function() {
      clearTDClasses();
      board = [];
      createBoard(board);
      deployShipX(board, 2, 2);
    }
  );
  $("#Sub1").on("click",
    function() {
      clearTDClasses();
      board = [];
      createBoard(board);
      deployShipX(board, 1, 1);
    }
  );
})

// Purpose: create a table to use as gameboard
// Signature: takes nothing, creates the table, and assign each td a unique id up to 100
// Example: boardSetup(); --> creates 10x10 square
function boardSetup() {
  for (y = 0; y < 10; y++) {
    $("table").append("<tr></tr>");
    for (x = 0; x < 10; x++) {
      $("tr").last().append("<td id="+y+x+"></td>");
    }
  }
}

// Purpose: keep track of how many torpedos fired
// Signature: takes nothing, increments torpedosUsed
// Example: fireTorpedo(); --> increments torpedosUsed by 1
function fireTorpedo() {
  torpedosUsed--;
}

// Purpose: add 10 empty arrays to an existing array, and within those arrays add 10 zeros
// Signature: takes an array, adds 10 arrays inside of it with 10 zeros inside of those 10 arrays
// Example: createBoard(z); ---> z[[0,0,0,0,...],[0,0,0,0,...],...]
function createBoard(array) {
  for (i = 0; i < 10; i++) {
    array.push([]);
  }
  for (var j = 0; j < 10; j++) {
    for (var k = 0; k < 10; k++) {
    array[k].push(0);
    }
  }
}

// Purpose: reveal where the ships that were not hit were located.
// Signature: takes 0 arguments --> finds the "SHIP"s and gives them a class
// Example: revealAnswer(); ---> ship at board[0][5] now has a class hiddenships
function revealAnswer() {
  for (var y = 0; y < 10; y++) {
    for (var x = 0; x < 10; x++) {
      if (board[y][x] === SHIP) {
      $("#"+y+x).addClass("hiddenships");
      }
    }
  }
};

function clearTDClasses(){
  for (var y = 0; y < 10; y++) {
    for (var x = 0; x < 10; x++) {
      $("#"+y+x).removeClass("hiddenships");
      $("#"+y+x).removeClass("miss");
      $("#"+y+x).removeClass("hit");
    }
  }
}

function deployShipX(array, shipLength, numOfShips) {
  var deployedships = 0;
  do  {
    var xCoordinate = Math.floor(Math.random() * (11-shipLength));
    var yCoordinate = Math.floor(Math.random() * 10);
    if (canShipBePlaced(shipLength, array, yCoordinate, xCoordinate)) {
      placeShipX(shipLength, yCoordinate, xCoordinate, array);
      deployedships++;
    }
  }
  while (deployedships < numOfShips)
}


function canShipBePlaced(shipLength, array, yCoordinate, xCoordinate) {
  //check all points of ship for adjacent occupied points
  for (var x = 0; x < shipLength; x++) {
    //if there is an occupied point around the current point, the ship cannot be placed
    if (isCoordinateOnBoardAndOccupied(array, yCoordinate, xCoordinate+x) || areAdjacentCoordinatesOccupied(array, yCoordinate, xCoordinate+x)){
      return false;
    }
  }
  return true;
}

function placeShipX(shipLength, yCoordinate, xCoordinate, array){
  for (var x = 0; x < shipLength; x++){
    array[yCoordinate][xCoordinate+x] = SHIP;
    $("#"+yCoordinate+(xCoordinate+x)).addClass("hiddenships");
  }
}

function isCoordinateOnBoardAndOccupied(array, yCoordinate, xCoordinate) {
  //check if coordinate is on the board on the y axis
  if (!(yCoordinate >= 0 && yCoordinate <= array.length-1)) {
    return false;
  }
  //check if coordinate is on the board on the x axis
  if (!(xCoordinate >= 0 && xCoordinate <= array[yCoordinate].length-1)) {
    return false;
  }
  //checks if coordinate is occupied
  return array[yCoordinate][xCoordinate] === SHIP;
}

function areAdjacentCoordinatesOccupied(array, yCoordinate, xCoordinate) {
  if (isCoordinateOnBoardAndOccupied(array, yCoordinate+1, xCoordinate)) {
    return true;
  }
  if (isCoordinateOnBoardAndOccupied(array, yCoordinate-1, xCoordinate)) {
    return true;
  }
  if (isCoordinateOnBoardAndOccupied(array, yCoordinate, xCoordinate+1)) {
    return true;
  }
  if (isCoordinateOnBoardAndOccupied(array, yCoordinate, xCoordinate-1)) {
    return true;
  }
  return false;
}
