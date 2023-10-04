var player = document.getElementById('player');

// adjust skybox height to multiple of 32
document.addEventListener("DOMContentLoaded", function () {
  var h = document.getElementById('skybox').offsetHeight;
  var s_h = Math.round(h / 32) * 32;
  document.getElementById('skybox').style.height = `${s_h}px`;
});

function walkLeft() {
  player.className = "walk-left";
  setTimeout(searchLeft, 1000);
}
function searchLeft() {
  player.className = "search-left";
  // player.style.left = "40%";
  setTimeout(walkRight, 3000);
}
function walkRight() {
  player.className = "walk-right";
  setTimeout(searchRight, 1000);
}
function searchRight() {
  player.className = "search-right";
  // player.style.left = "60%";
  setTimeout(walkLeft, 3000);
}

walkLeft();