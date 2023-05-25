var keysDown = new Array();

function keyDownF(event) {
  keysDown[event.which] = true;
}

function keyUpF(event) {
  keysDown[event.which] = false;
}

window.onkeydown = keyDownF;
window.onkeyup = keyUpF;


var zoom = [];
$.get("./json/misc/zoom.json", function(data) {
    zoom = JSON.parse(data);
}, "text");

var costume = window.costume;



function checkWater(){
  return false;
}


var preview = new Image();
preview.src = "/assets/images/game/player/preview/" + costume + ".svg"
preview.style.width = "50%";
preview.style.height = "auto";

document.querySelector(".character-preview #preview").appendChild(preview);

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

var game = "stop";

var player_costume = new Image();
player_costume.src = "assets/images/game/player/" + costume + ".svg";

var player = new Object();
player.x = 0;
player.y = 0;
player.vel = new Object();
player.size = 50;
player.direction = 90;


var camera = new Object();
camera.x = 0;
camera.y = 0;
camera.vel = new Object();
camera.zoom = 6;

var middle = new Object();

var map = new Object();
map.svg = new Image();
map.grid = new Image();
map.grid.src = "./assets/map/grid.svg";

var currentframe= -1;

var lhand = new Object();
var rhand = new Object();

function render() {

  currentframe++

  map.svg.src = "https://"+window.server_adress+"/map/basic.svg";
  
  player.vel.x = 0;
  player.vel.y = 0;

  if(keysDown[69]){
    player.direction+= 5;
  }
  if(keysDown[81]){
    player.direction-= 5;
  }

  if(keysDown[87]){
    player.vel.y += 1;
  }
  if(keysDown[65]){
    player.vel.x += -1;
  }
  if(keysDown[83]){
    player.vel.y += -1;
  }
  if(keysDown[68]){
    player.vel.x += 1;
  }

  player.vel.sqrt = Math.sqrt((player.vel.x * player.vel.x) + (player.vel.y * player.vel.y));

  camera.zoom = zoom[zoom[0].current];

  player.speed = 5;

  canvas.width = 4000;
  canvas.height = (canvas.width / document.body.clientWidth)*document.body.clientHeight;

  middle.x = canvas.width / 2;
  middle.y = canvas.height / 2;

  if(currentframe>=1){
    if(checkWater()){
      player.speed = 2;
    }
  }

  if(player.vel.sqrt!=0) {
    player.vel.x = (player.vel.x / player.vel.sqrt)*player.speed;
    player.vel.y = (player.vel.y / player.vel.sqrt)*player.speed;
  }
  
  player.x += player.vel.x;
  player.y += player.vel.y;

  camera.x = player.x;
  camera.y = player.y;

  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";

  ctx.clearRect(0, 0, canvas.width, canvas.height); //reset the canvas every frame before drawing

 
  ctx.fillStyle = "rgb(0, 174, 255)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  

  ctx.drawImage(map.svg, 
                (middle.x - ((camera.zoom * 10000) / 2)) + ((camera.zoom) * -camera.x), 
                (middle.y - ((camera.zoom * 10000) / 2)) + ((camera.zoom) * camera.y), 
                (10000 * camera.zoom), 
                (10000 * camera.zoom)
               );

  ctx.drawImage(map.grid, 
                (middle.x - ((camera.zoom * 10000) / 2)) + ((camera.zoom) * -camera.x), 
                (middle.y - ((camera.zoom * 10000) / 2)) + ((camera.zoom) * camera.y), 
                (10000 * camera.zoom), 
                (10000 * camera.zoom)
               );

  

  

  ctx.drawImage(player_costume, 100, 0, 50,50, 
                (middle.x - ((camera.zoom * player.size) / 2)) + ((camera.zoom) * (-player.x + camera.x)), 
                (middle.y - ((camera.zoom * player.size) / 2)) + ((camera.zoom) * (player.y - camera.y)), 
                (camera.zoom * player.size), 
                (camera.zoom * player.size)
              );

  lhand.x = (Math.sin((player.direction + 180 - 40) * ( Math.PI / 180 )) * 27);
  lhand.y = (Math.cos((player.direction + 180 - 40) * ( Math.PI / 180 )) * 27);
  ctx.drawImage(player_costume, 150, 0, 25, 25, 
                (middle.x - ((camera.zoom * player.size) / 4)) + ((camera.zoom) * ( -(player.x + lhand.x) + camera.x)), 
                (middle.y - ((camera.zoom * player.size) / 4)) + ((camera.zoom) * ((player.y + lhand.y) - camera.y)), 
                ((camera.zoom * player.size)/2), 
                ((camera.zoom * player.size)/2)
              );

  rhand.x = (Math.sin((player.direction + 180 + 40) * ( Math.PI / 180 )) * 27);
  rhand.y = (Math.cos((player.direction + 180 + 40) * ( Math.PI / 180 )) * 27);
  ctx.drawImage(player_costume, 150, 25, 25, 25, 
                (middle.x - ((camera.zoom * player.size) / 4)) + ((camera.zoom) * ( -(player.x + rhand.x) + camera.x)), 
                (middle.y - ((camera.zoom * player.size) / 4)) + ((camera.zoom) * ((player.y + rhand.y) - camera.y)), 
                ((camera.zoom * player.size)/2), 
                ((camera.zoom * player.size)/2)
              );

  if (game == "running" || game == "paused") {
    requestAnimationFrame(render);
  }
}
