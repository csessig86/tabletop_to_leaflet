// Set view of Leaflet map based on screen size
if ($(window).width() < 626) {
	var map = new L.Map('map').setView([42,-93],6);
} else {
	var map = new L.Map('map').setView([42,-91.5],7);
}

// Information for the base tile via Cloudmade
var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/f14689c8008d43da9028a70e6a8e710a/2402/256/{z}/{x}/{y}.png'
var cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18});
// Add to map
map.addLayer(cloudmade);


// Here's the Tabletop feed
// First we'll initialize Tabletop with our spreadsheet
var jqueryNoConflict = jQuery;
jqueryNoConflict(document).ready(function(){
	initializeTabletopObject('0As3JvOeYDO50dF9NWWRiaTdqNmdKQ1lCY3dpdDhZU3c');
});

// Pull data from Google spreadsheet
// And push to our startUpLeaflet function
function initializeTabletopObject(dataSpreadsheet){
	Tabletop.init({
    	key: dataSpreadsheet,
    	callback: startUpLeafet,
    	simpleSheet: true,
    	debug: false
    });
}

// This function gets our data from our spreadsheet
// Then gets it ready for Leaflet.
// It creates the marker, sets location
// And plots on it on our map
function startUpLeafet(tabletopData) {
	// Tabletop creates arrays out of our data
	// We'll loop through them and create markers for each
	for (var num = 0; num < tabletopData.length; num ++) {
		// Our table columns
		// Change 'brewery', 'address', etc.
		// To match table column names in your table
		var dataOne = tabletopData[num].brewery;
		var dataTwo = tabletopData[num].address;
		var dataThree = tabletopData[num].city;
		var dataFour= tabletopData[num].phone;
		var dataFive = tabletopData[num].website;

		// Pull in our lat, long information
		var dataLat = tabletopData[num].latitude;
		var dataLong = tabletopData[num].longitude;

		// Add to our marker
		marker_location = new L.LatLng(dataLat, dataLong);
		// Create the marker
    	layer = new L.Marker(marker_location);
    
    	// Create the popup
    	// Change 'Address', 'City', etc.
		// To match table column names in your table
    	var popup = "<div class=popup_box" + "id=" + num + ">";
    	popup += "<div class='popup_box_header'><strong>" + dataOne + "</strong></div>";
    	popup += "<hr />";
    	popup += "<strong>Address:</strong> " + dataTwo + "<br />";
    	popup += "<strong>City:</strong> " + dataThree + "<br />";
    	popup += "<strong>Phone:</strong> " + dataFour + "<br />";
    	popup += "<strong>Website:</strong> " + dataFive + "<br />";
    	popup += "</div>";
    	// Add to our marker
		layer.bindPopup(popup);
	
		// Add marker to our to map
		map.addLayer(layer);
	}
};



// Toggle for 'About this map' and X buttons
// Only visible on mobile
isVisibleDescription = false;
// Grab header, then content of sidebar
sidebarHeader = $('.sidebar_header').html();
sidebarContent = $('.sidebar_content').html();
// Then grab credit information
creditsContent = $('.leaflet-control-attribution').html();
$('.toggle_description').click(function() {
	if (isVisibleDescription === false) {
		$('.description_box_cover').show();
		// Add Sidebar header into our description box
		// And 'Scroll to read more...' text on wide mobile screen
		$('.description_box_header').html(sidebarHeader + '<div id="scroll_more"><strong>Scroll to read more...</strong></div>');
		// Add the rest of our sidebar content, credit information
		$('.description_box_text').html(sidebarContent + '<br />');
		$('#caption_box').html('Credits: ' + creditsContent);
		$('.description_box').show();
		isVisibleDescription = true;
	} else {
		$('.description_box').hide();
		$('.description_box_cover').hide();
		isVisibleDescription = false;
	}
});