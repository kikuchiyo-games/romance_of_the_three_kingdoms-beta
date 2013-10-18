var map;
function initialize() {
  var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(35.00, 103.00),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
//google.maps.event.addDomListener(window, 'load', initialize);
