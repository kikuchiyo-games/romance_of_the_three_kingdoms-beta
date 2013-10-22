var canvas = CE.defines("game_map").
  extend(Tiled).
  ready(function() {
  canvas.Scene.call("Country");
});
