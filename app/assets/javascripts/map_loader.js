// loading layers
function initLayers(battlefield) {
  // compose EaselJS tileset from image (fixed 64x64 now, but can be parametized)

  var mapData = battlefield.mapData;
  var stage = battlefield.stage;
  var w = mapData.tilesets[0].tilewidth;
  var h = mapData.tilesets[0].tileheight;
  var imageData = {
    images : [ battlefield.tileset ],
    frames : {
      width : w,
      height : h
    }
  };
  // create spritesheet
  App.tilesetSheet = new createjs.SpriteSheet(imageData);
  
  // loading each layer at a time
  for (var idx = 0; idx < mapData.layers.length; idx++) {
    var layerData = mapData.layers[idx];
    if (layerData.type == 'tilelayer')
      initLayer(layerData, App.tilesetSheet, mapData.tilewidth, mapData.tileheight, stage);
  }
  // stage updates (not really used here)
  createjs.Ticker.setFPS(20);
  createjs.Ticker.addEventListener(stage);
}

// layer initialization
function initLayer(layerData, tilesetSheet, tilewidth, tileheight, stage) {
  App.mountains = [];
  App.plains = [];
  App.forests = [];
  App.hills = [];
  App.fortresses = [];
  App.water_regions = [];

  for ( var y = 0; y < layerData.height; y++) {
    for ( var x = 0; x < layerData.width; x++) {
      // create a new Bitmap for each cell
      var cellBitmap = new createjs.BitmapAnimation(tilesetSheet);
      // layer data has single dimension array
      var idx = x + y * layerData.width;
      // tilemap data uses 1 as first value, EaselJS uses 0 (sub 1 to load correct tile)
      cellBitmap.gotoAndStop(layerData.data[idx] - 1);
      // isometrix tile positioning based on X Y order from Tiled
      cellBitmap.x = x * tilewidth;///2; //- y * tilewidth/2;
      cellBitmap.y = y * tileheight;///2; //+ x * tileheight/2;

      if(layerData.data[idx] == 3){
        App.mountains.push({x: cellBitmap.x, y: cellBitmap.y})
      } else if (layerData.data[idx] == 1){
        App.plains.push({x: cellBitmap.x, y: cellBitmap.y})
      } else if (layerData.data[idx] == 2){
        App.forests.push({x: cellBitmap.x, y: cellBitmap.y})
      } else if (layerData.data[idx] == 6){
        App.hills.push({x: cellBitmap.x, y: cellBitmap.y})
      } else if (layerData.data[idx] == 5){
        App.fortresses.push({x: cellBitmap.x, y: cellBitmap.y})
      } else if (layerData.data[idx] == 7){
        App.water_regions.push({x: cellBitmap.x, y: cellBitmap.y})
      }

      // add bitmap to stage
      stage.addChild(cellBitmap);
// 1 grass
// 2 bush
// 3 mountain
// 4 castle
// 5 fortress
// 6 hill
// 7 water
// 8 fortress
// 9 water on top grass bottom
// 10 
// 10 
// 10 
// 13 water on top forest bottom 
//if(cellBitmap.tile == 3){
//  var btn1 = stage.addChild(new Button("i", "#FFF"));
//  btn1.x = cellBitmap.x;
//  btn1.y = cellBitmap.y;
//  stage.addChild(btn1);
//} else if(cellBitmap.tile == 5){
//  var btn1 = stage.addChild(new Button("i", "#000"));
//  btn1.x = cellBitmap.x;
//  btn1.y = cellBitmap.y;
//  stage.addChild(btn1);
      //}

    }
  }
}

// utility function for loading assets from server
function httpGet(theUrl) {
  var xmlHttp = null;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

// utility function for loading json data from server
function httpGetData(theUrl) {
  var responseText = httpGet(theUrl);
  return JSON.parse(responseText);
}

var mapDataJson = { "height":25,
 "layers":[
        {
         "data":[2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 6, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 3, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 6, 6, 6, 6, 6, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 3, 3, 6, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 3, 3, 6, 1, 1, 1, 1, 4, 1, 1, 2, 2, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 3, 3, 3, 6, 6, 1, 1, 1, 1, 1, 2, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 3, 3, 3, 3, 6, 1, 1, 1, 1, 2, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 3, 3, 3, 3, 3, 6, 6, 6, 6, 2, 1, 2, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 3, 3, 3, 3, 3, 3, 6, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6, 6, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 5, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 13, 1, 1, 1, 1, 1, 1, 1, 1, 9, 7, 7, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":25,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":25,
         "x":0,
         "y":0
        }],
 "orientation":"orthogonal",
 "properties":
    {

    },
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "image":"map.png",
         "imageheight":578,
         "imagewidth":32,
         "margin":0,
         "name":"map",
         "properties":
            {

            },
         "spacing":0,
         "tileheight":32,
         "tilewidth":32
        }],
 "tilewidth":32,
 "version":1,
 "width":25
}
