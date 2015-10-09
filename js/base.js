// HELPER FUNCTIONS
// Used to capitalize first letter of string
function capitaliseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

// Used to capitalize first letter of all words
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
    	first_letter = txt.charAt(0).toUpperCase();

    	// This captures words with an apostrophe as the second character
    	// And capitalizes them correctly
    	// Example: o'brien = O'Brien
    	if (txt.charAt(1) === "'") {
    		return first_letter + txt.charAt(1) + txt.charAt(2).toUpperCase() + txt.substr(3).toLowerCase();
    	} else {
    		return first_letter + txt.substr(1).toLowerCase();
    	}
    });
}

// Add commas to numbers over 1000
function commaSeparateNumber(val){
	while (/(\d+)(\d{3})/.test(val.toString())){
		val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	}
	return val;
}

// This removes special characters and spaces
function removeSpecialCharacters(string) {
    return string.replace(/[^\w\s]/gi, '').replace(/ /g,'');
}

// Capitalize first letter of string, lower case the rest
function capitalizeFirstLowercaseRest(string){
    return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
}

// Format the address
function formatAddress(address) {
    address_title = toTitleCase(address);
    address_directions = address_title.replace('Ne', 'NE').replace('Se', 'SE').replace('Nw', 'NW').replace('Sw', 'SW');
    address_directions_two = address_directions.replace('Nb', 'NB').replace('Sb', 'SB').replace('Eb', 'EB').replace('Wb', 'WB');
    address_directions_three = address_directions_two.replace('Brg', 'Bridge');
    address_ia = address_directions_three.replace(' Ia', ' IA');
    address_roads = address_ia.replace('Ave ', 'Ave. ').replace('St ', 'St. ').replace('Rd ', 'Rd. ').replace('Ct ', 'Ct. ').replace('Blvd ', 'Blvd. ').replace('Dr ', 'Dr. ').replace('Av ', 'Av. ');
    address_city = address_roads.replace('NE Cedar Rapids', 'NE, Cedar Rapids ').replace('SE Cedar Rapids', 'SE, Cedar Rapids ').replace('NW Cedar Rapids', 'NW, Cedar Rapids ').replace('SW Cedar Rapids', 'SW, Cedar Rapids ');

    return address_city;
}