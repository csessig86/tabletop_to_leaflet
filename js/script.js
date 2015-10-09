// Group we will append our markers to
if (window.location.hash === "#cluster") {
	// Set up cluster group
	var markers = new L.MarkerClusterGroup();
} else {
	// Otherwise set up normal groupx`
	var markers = new L.LayerGroup();
}

// Google Docs spreadsheet key
var spreadsheet_key = '0As3JvOeYDO50dF9NWWRiaTdqNmdKQ1lCY3dpdDhZU3c';

// Name of lat, long columns in Google spreadsheet
var lat_column = 'latitude';
var long_column = 'longitude';

// Marker options
var radius = 8;
// Regular fill
var fill_color = "#023858";
var border_color = "#FFF";
// Hover
var fill_color_hover = "#FFF";
var border_color_hover = "#333"

var global_markers_data;

// Function that creates our popup
function generatePopup(content){
    // Generate header
	var popup_header = "<h4>" + toTitleCase(content['brewery']) + "</h4>"
	
	// Generate content
	var popup_content = '<table class="popup_table table">';
	popup_content += '<tr><td><strong>Address:</strong></td>';
	popup_content += '<td>' + content['address'] + '</td>';
	popup_content += '<tr><td><strong>City:</strong></td>';
	popup_content += '<td>' + content['city'] + '</td>';
	popup_content += '<tr><td><strong>Phone:</strong></td>';
	popup_content += '<td>' + content['phone'] + '</td>';
		popup_content += '<tr><td colspan="2"><strong><a href="http://' + content['website'] + '" target="_blank">Learn more</a></strong></td>';
	popup_content += '</tr></table>'

	return popup_header + popup_content;
}

// This goes through our JSON file and puts markers on map
function loadMarkersToMap(markers_data) {
	// If we haven't captured the Tabletop data yet
	// We'll set the Tabletop data to global_markers_data
	if (global_markers_data !== undefined) {
		markers_data = global_markers_data;
	// If we have, we'll load global_markers_data instead of loading Tabletop again
	} else {
		global_markers_data = markers_data;
	}

	for (var num = 0; num < markers_data.length; num++) {
		// Capture current iteration through JSON file
		current = markers_data[num];

		// Add lat, long to marker
		var marker_location = new L.LatLng(current[lat_column], current[long_column]);

		// Determine radius of the circle by the value in total
		// radius_actual = Math.sqrt(current['total'] / 3.14) * 2.8;

		// Options for our circle marker
		var layer_marker = L.circleMarker(marker_location, {
			radius: radius,
			fillColor: fill_color,
			color: border_color,
			weight: 1,
			opacity: 1,
			fillOpacity: 0.8
		});

		// Generate popup
		layer_marker.bindPopup( generatePopup(current) );

		// Add events to marker
		(function (num){
			// Must call separate popup(e) function to make sure right data is shown
			function mouseOver(e) {
				var layer_marker = e.target;
		        layer_marker.setStyle({
		            radius: radius + 1,
		            fillColor: fill_color_hover,
		            color: border_color_hover,
		            weight: 2,
		            opacity: 1,
		            fillOpacity: 1
				});
				// layer_marker.openPopup();
		    }

		    // What happens when mouse leaves the marker
		    function mouseOut(e) {
				var layer_marker = e.target;
				layer_marker.setStyle({
					radius: radius + 1,
					fillColor: fill_color,
					color: border_color,
					weight: 1,
					opacity: 1,
					fillOpacity: 0.8
		        });
		        // layer_marker.closePopup();
		    }

		    // Call mouseover, mouseout functions
		    layer_marker.on({
		    	mouseover: mouseOver,
		    	mouseout: mouseOut
		    });

		})(num)

		// Add to feature group
		markers.addLayer(layer_marker);
	}

	// Add feature group to map
	map.addLayer(markers);

	// Clear load text
	// $('.sidebar_text_intro').html('');
};

// Pull data from Google spreadsheet via Tabletop
function initializeTabletopObjectMarkers(){
	Tabletop.init({
    	key: spreadsheet_key,
    	callback: loadMarkersToMap,
    	simpleSheet: true,
    	debug: false
    });
}

// Add JSON data to map
// If not done with map-tabletop-geojson.js
initializeTabletopObjectMarkers();