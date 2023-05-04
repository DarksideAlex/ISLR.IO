var mstick;
var astick;
  
var touchdevice = false;

window.ontouchstart = function() {
  touchdevice = true;
}

function showGame() {
  var swagethi_yolonese = document.getElementsByClassName("game")[0];
  swagethi_yolonese.style.display = "inline-block";
}

function hideGame() {
  var swagethi_yolonese = document.getElementsByClassName("game")[0];
  swagethi_yolonese.style.display = "none";
}

function showDOM(elment){
  elment.style.display = "inline-block";
}

function hideDOM(elment){
  elment.style.display = "none";
}

function hideMenu(DOM, id) {
  var element = DOM.getElementsByClassName("menu" + id)[0];
  if (DOM.contains(DOM.getElementsByClassName("menu" + id)[0])) {
    element.style.display = "none";
  }
  else {
    console.error("Invalid DOM or invalid ID entered for hideMenu(" + DOM + ", " + id + ")");
  }
}

function showMenu(DOM, id) {
  var element = DOM.getElementsByClassName("menu" + id)[0];
  if (DOM.contains(DOM.getElementsByClassName("menu" + id)[0])) {
    element.style.display = "block";
  }
  else {
    console.error("Invalid DOM or invalid ID entered for showMenu(" + DOM + ", " + id + ")");
  }
}

function startGame() {

  window.server_adress = document.querySelector("#ip").value;

  document.title = "Islr.io - Joining";

  /* server connection stuff here */

  sleep(250);

  game = "running";

  render();

  if(touchdevice) {

    mstick = document.querySelector("#mstick");
    astick = document.querySelector("#astick");

    
    showDOM(mstick);
    showDOM(astick);

    window.mstick = nipplejs.create({
      color: "#000000",
      shape: "square",
      zone: mstick,
      threshold: 0.5,
      fadeTime: 300
    });

    window.astick = nipplejs.create({
      color: "#000000",
      shape: "circle",
      zone: astick,
      threshold: 0.5,
      fadeTime: 300
    });
    
  }

  document.title = "Islr.io - Playing";
  hideMenu(document, 0);
  hideMenu(document, 1);
  showGame();
  return "game started";
}

function endGame() {
  document.title = "Islr.io - Lobby";
  showMenu(document, 0);
  showMenu(document, 1);
  hideGame();
  hideDOM(mstick);
  hideDOM(astick);
  game = stop;
  return "game ended";
}

function openLoadOut() {
  document.title = "Islr.io - LoadOut";
  hideMenu(document, 0);
  hideMenu(document, 1);
  showMenu(document, 2);
}

function closeLoadOut() {
  document.title = "Islr.io - Lobby";
  showMenu(document, 0);
  showMenu(document, 1);
  hideMenu(document, 2);
}









window.costume = 1;