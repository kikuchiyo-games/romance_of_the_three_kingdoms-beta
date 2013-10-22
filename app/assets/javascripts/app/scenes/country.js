$(document).ready(function(){
  canvas.Scene.New({

    name: "Country",

    materials: {
      images: {
        //tileset: "assets/grass-tiles-2-small.png",
        tileset: "assets/battlemaps.png",
        zhang_liao:"assets/ShuHorseGeneral.png"
      }
    },

    ready: function(stage) {
      var self  = this;
      var el = this.createElement();

      var tiled = canvas.Tiled.new();

      self.element = this.createElement();
      tiled.ready(function() {
        var tile_w = this.getTileWidth(), tile_h = this.getTileHeight(), layer_object = this.getLayerObject();
        self.element.drawImage('zhang_liao');
        self.element.x = 32;
        self.element.y = 100;
        stage.append(el);
        stage.append(self.element);
      });


      tiled.load(this, el, "province-1.json");
    },
    
    render: function(stage) {
      if (this.element && this.element.x < 800) {
        this.element.x++;
      } else {
        this.element.x = 0;
      }
      stage.refresh();
    }
  
  });
});
