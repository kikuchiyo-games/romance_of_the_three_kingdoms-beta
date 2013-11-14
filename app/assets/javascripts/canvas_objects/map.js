//define(['./test_map.js'], function(MapData){
  Map = function(){
    this.initialize = function(){
      this.stage = new createjs.Stage("game_map"),
      this.mapData =  new MapData();
      this.tileset = new Image();
      this.tileset.src = '/' + this.mapData.json.tilesets[0].image;
      this.tileset.onLoad = this.initLayers(); 
      createjs.Ticker.addEventListener("tick", this.stage);
    };

    this.reset = function(){
      $('#game_map').hide();
      $('#attack_menu').css('visibility', 'hidden');
      this.stage.removeAllChildren();
    };

    this.initLayers = function() {
      var mapData = this.mapData.json;
      var stage = this.stage;
      var w = mapData.tilesets[0].tilewidth;
      var h = mapData.tilesets[0].tileheight;
      var imageData = {
        images : [ this.tileset ],
        frames : {
          width : w,
          height : h
        }
      };
      App.tilesetSheet = new createjs.SpriteSheet(imageData);
      
      for (var idx = 0; idx < mapData.layers.length; idx++) {
        var layerData = mapData.layers[idx];
        if (layerData.type == 'tilelayer')
          this.initLayer(layerData, App.tilesetSheet, mapData.tilewidth, mapData.tileheight, stage);
      }
      createjs.Ticker.setFPS(20);
      createjs.Ticker.addEventListener(stage);

      this.stage.enableMouseOver(200);
    };
    
    this.initLayer = function(layerData, tilesetSheet, tilewidth, tileheight, stage) {
      App.mountains = [];
      App.plains = [];
      App.forests = [];
      App.hills = [];
      App.fortresses = [];
      App.water_regions = [];
      App.other_regions = [];
    
      for ( var y = 0; y < layerData.height; y++) {
        for ( var x = 0; x < layerData.width; x++) {
          var cellBitmap = new createjs.BitmapAnimation(tilesetSheet);
          var idx = x + y * layerData.width;
          cellBitmap.gotoAndStop(layerData.data[idx] - 1);
          cellBitmap.x = x * tilewidth;
          cellBitmap.y = y * tileheight;
    
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
          } else {
            App.other_regions.push({x: cellBitmap.x, y: cellBitmap.y})
          }
    
          stage.addChild(cellBitmap);
        }
      }
    };
    
    this.httpGet = function(theUrl) {
      var xmlHttp = null;
      xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", theUrl, false);
      xmlHttp.send(null);
      return xmlHttp.responseText;
    };
    
    this.httpGetData = function(theUrl) {
      var responseText = httpGet(theUrl);
      return JSON.parse(responseText);
    };

    this.initialize();
  };
//});
