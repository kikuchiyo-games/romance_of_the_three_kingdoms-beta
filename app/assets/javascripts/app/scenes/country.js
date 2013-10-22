$(document).ready(function(){
  canvas.Scene.New({

    name: "Country",

    materials: {
      images: {
        tileset: "assets/grass-tiles-2-small.png",
        zhang_liao:"assets/avatar-zhang_liao.jpeg"
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
        self.element.x = 10;
        self.element.y = 10;
        stage.append(el);
        stage.append(self.element);
      });


      tiled.load(this, el, "battlefield.json");
    },
    
    render: function(stage) {
      //if (this.element && this.element.x < 20) this.element.x++;
      stage.refresh();
    }
  
  });
});
