// Set view of Leaflet map based on screen size
var layer = new L.StamenTileLayer('toner-background');
if ($(window).width() < 626) {
	var map = new L.Map('map').setView([42,-93],6);
} else {
	var map = new L.Map('map').setView([42,-91.5],7);
}
map.addLayer(layer);
