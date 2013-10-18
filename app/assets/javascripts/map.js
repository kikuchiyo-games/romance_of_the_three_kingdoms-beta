$(function () {
  // One instance of tileScroller is required for each viewport.        
  var tileScroller = function (params) {
      var that = {},
          $viewport = params.$viewport,
          // Calculate maximum number of tiles that can be displayed in viewport.
          tilesAcross = Math.ceil(($viewport.innerWidth() + params.tileWidth) / params.tileWidth),
          tilesDown = Math.ceil(($viewport.innerHeight() + params.tileHeight) / params.tileHeight),
  
          // Create a handle element that all tiles will be attached to.
          // If this element is moved, so all the attached tiles will move.
          html = '<div class="handle" style="position:absolute;">',
          left = 0,
          top = 0,
          // General counters.
          tiles = [],
          // Stores are reference to each tile's style property.
          tileBackPos = [],
          // Stores the background position offset for each tile bitmap.
          mapWidthPixels = params.mapWidth * params.tileWidth,
          mapHeightPixels = params.mapHeight * params.tileHeight,
          handle, i; // General counter.
  
      // Attach all the tiles to the handle. This is done by creating
      // one big DOM string and attaching the in one jQuery call.
      // This is faster than attaching each one individually.
      for (top = 0; top < tilesDown; top++) {
          for (left = 0; left < tilesAcross; left++) {
              html += '<div class="tile" style="position:absolute;' +
              'background-image:url(\'' + params.image + '\');' +
              'width:' + params.tileWidth + 'px;' +
              'height:' + params.tileHeight + 'px;' +
              'background-position: 0px 0px;' +
              'left:' + (left * params.tileWidth) + 'px;' +
              'top:' + (top * params.tileHeight) + 'px;' + '"/>';
          }
      }
      html += '</div>';
      // Put the whole lot in the viewport.
      $viewport.html(html);
  
      // Get a reference to the handle DOM element.
      handle = $('.handle', $viewport)[0];
  
      // For each tile in the viewport, store a reference to its
      // css style attribute for speed.
      // This will be updated with the tile's visbility status
      // when scrolling later on.
      for (i = 0; i < tilesAcross * tilesDown; i++) {
          tiles.push($('.tile', $viewport)[i].style);
      }
  
      // For each tile image in the large bitmap, calculate and store the
      // the pixel offsets to be used for the tiles' background image.
      // This is quicker than calculating when updating later.
      tileBackPos.push('0px 0px'); // Tile zero - special 'hidden' tile.
      for (top = 0; top < params.imageHeight; top += params.tileHeight) {
          for (left = 0; left < params.imageWidth; left += params.tileWidth) {
              tileBackPos.push(-left + 'px ' + -top + 'px');
          }
      }
  
      // Useful public variables.
      that.mapWidthPixels = mapWidthPixels;
      that.mapHeightPixels = mapHeightPixels;
  
      that.draw = function (scrollX, scrollY) {
          // If wrapping, transform start positions to valid positive
          // positions within the dimensions of the map.
          // This makes the wrapping code simpler later on.
          var wrapX = params.wrapX,
              wrapY = params.wrapY;
          if (wrapX) {
              scrollX = (scrollX % mapWidthPixels);
              if (scrollX < 0) {
                  scrollX += mapWidthPixels;
              }
          }
          if (wrapY) {
              scrollY = (scrollY % mapHeightPixels);
              if (scrollY < 0) {
                  scrollY += mapHeightPixels;
              }
          }
  
          var xoff = -(scrollX % params.tileWidth),
              yoff = -(scrollY % params.tileHeight);
          // >> 0 alternative to math.floor. Number changes from a float to an int.
          handle.style.left = (xoff >> 0) + 'px';
          handle.style.top = (yoff >> 0) + 'px';
  
          // Convert pixel scroll positions to tile units.
          scrollX = (scrollX / params.tileWidth) >> 0;
          scrollY = (scrollY / params.tileHeight) >> 0;
  
  
          var map = params.map,
              sx, sy = scrollY,               // Copies of scrollX & Y positions (tile units).
              countAcross, countDown,         // Loop counts for tiles across and down viewport. 
              mapWidth = params.mapWidth,     // Copy of map width (tile units). 
              mapHeight = params.mapHeight,   // Copy of map height (tile units).
              i,              // General counter.        
              tileInView = 0, // Start with top left tile in viewport.
              
              tileIndex,      // Tile index number taken from map.
              mapRow;
          // Main drawing loop.
          for (countDown = tilesDown; countDown; countDown--) {
              // Wrap vertically?
              if (wrapY) {
                  if (sy >= mapHeight) {
                      sy -= mapHeight;
                  }
              } else
              // Otherwise clip vertically (just make the whole row blank)
              if (sy < 0 || sy >= mapHeight) {
                  for (i = tilesW; i; i--) {
                      tiles[tileInView++].visibility = 'hidden';
                  }
                  sy++;
                  continue;
              }
              // Draw a row.
              sx = scrollX;
              mapRow = sy * mapWidth;
              for (countAcross = tilesAcross; countAcross; countAcross--) {
                  // Wrap horizontally?
                  if (wrapX) {
                      if (sx >= mapWidth) {
                          sx -= mapWidth;
                      }
                  } else
                  // Or clipping horizontally?
                  if (sx < 0 || sx >= mapWidth) {
                      tiles[tileInView++].visibility = 'hidden';
                      sx++;
                      continue;
                  }
                  // Get tile index no.
                  tileIndex = map[mapRow + sx];
                  sx++;
                  // If tile index non zero, then 'draw' it,
                  if (tileIndex) {
                      tiles[tileInView].visibility = 'visible';
                      tiles[tileInView++].backgroundPosition = tileBackPos[tileIndex];
                  }
                  // otherwise hide it. 
                  else {
                      tiles[tileInView++].visibility = 'hidden';
                  }
              }
              sy++;
          }
      };
      return that;
  };
             
  
  var loadMap = function(xmlFile,$viewports,callback) {
      var tileScrollers = []; // Array of tileScroller instances for each viewport.
      $.ajax({
          type: "GET",
          url: xmlFile,
          dataType: "xml",
          // Success function called when map has loaded.
          success: function(xml) {
              // Get references to image and map information.
              var $imageInfo = $(xml).find('image'),
                  $mapInfo = $(xml).find('map'),
                  i;
              // For each layer, create a tileScroller object.
              $(xml).find('layer').each(function() {
                  // Setup parameters to pass to tileScroller.
                  // The + operator before some values is to ensure
                  // they are treated as numerics instead of strings.
                  var params = {
                      tileWidth: +$mapInfo.attr('tilewidth'),
                      tileHeight:+$mapInfo.attr('tileheight'),
                      wrapX:true,
                      wrapY:true,
                      mapWidth:+$mapInfo.attr('width'),
                      mapHeight:+$mapInfo.attr('height'),
                      image:$imageInfo.attr('source'),
                      imageWidth: +$imageInfo.attr('width'),
                      imageHeight: +$imageInfo.attr('height')
                  },  
                      // Get the actual map data as an array of strings.
                      mapText = $(this).find('data').text().split(','),
                      // Create a viewport.
                      $viewport = $('<div>');
                      $viewport.attr({
                          'id':$(this).attr('name')
                      }).css({
                          'width':'100%',
                          'height':'100%',
                          'position':'absolute',
                          'overflow':'hidden'
                      });
                  // Attach viewport to viewports wrapper.
                  $viewports.append($viewport);
                  // Store viewport in parameters.
                  params.$viewport = $viewport;
                  // Create a map array and store in parameters.
                  params.map = [];
                  // Convert previous text array map into numeric array.
                  for(i=0;i<mapText.length;i++) {
                      params.map.push(+mapText[i]);
                  }
                  // Create a tileScroller and save reference.
                  tileScrollers.push( tileScroller(params) );	
              });
              // Call callback when map loaded, passing array
              // of tileScrollers as parameter.
              callback(tileScrollers);
          }
      });
  };
  
  // Call the loadMap function. The callback passed
  // is a function that scrolls each viewport according
  // to mouse movement.
  loadMap("battlefield.tmx", $('#viewports'), function (tileScrollers) {
      var ts1 = tileScrollers[0],  // Get the three tileScrollers.
          ts2 = tileScrollers[1],
          ts3 = tileScrollers[2],
          scrollX = 0,             // Current scroll position.
          scrollY = 0,
          xSpeed = 0,              // Current scroll speed.                             
          ySpeed = 0,
          // Width and height of viewports.
          viewWidth = $('#viewports').innerWidth(),
          viewHeight = $('#viewports').innerHeight();
  
      // As mouse is moved around viewports,
      // calculate a speed to scroll by.
      $('#viewports').mousemove(function (ev) {
          xSpeed = ev.clientX - (viewWidth / 2);
          xSpeed /= (viewWidth / 2);
          xSpeed *= 10;
          ySpeed = ev.clientY - (viewHeight / 2);
          ySpeed /= (viewHeight / 2);
          ySpeed *= 10;
          //$('img[src="RyuAttackR.gif"]').position().left -= 32;
      });

      setInterval(function () {
          // Each tileScroller is given a different scroll positions
          // for a parralax effect.
          ts1.draw(scrollX / 3, scrollY / 3);
          ts2.draw(scrollX / 2, scrollY / 2);
          ts3.draw(scrollX, scrollY);
          // Update scroll position.
          scrollX += xSpeed;
          scrollY += ySpeed;
          // Stop scrolling at edges of map.
          // This code can be removed to test the wrapping.
          if (scrollX < 0) { scrollX = 0; }
          if (scrollX > ts3.mapWidthPixels - viewWidth) { scrollX = ts3.mapWidthPixels - viewWidth; }
          if (scrollY < 0) { scrollY = 0; }
          if (scrollY > ts3.mapHeightPixels - viewHeight) { scrollY = ts3.mapHeightPixels - viewHeight; }
      }, 30);
      //$('.tile').first().append('<img src="RyuAttackR.gif" />').css('z-index:10');
      //$('img[src="RyuAttackR.gif"]').css('position:absolute');
  });
  
});
