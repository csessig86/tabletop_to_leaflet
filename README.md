Tabletop to Leaflet
===========
* [Live demo](http://csessig86.github.io/tabletop_to_leaflet)

* [Demo with clusters](http://csessig86.github.io/tabletop_to_leaflet#cluster)

* Uses [Tabletop.js](http://builtbybalance.com/Tabletop/) and a [Google Spreadsheet](https://docs.google.com/spreadsheet/pub?key=0As3JvOeYDO50dF9NWWRiaTdqNmdKQ1lCY3dpdDhZU3c&output=html) to feed data to a [Leaflet](http://leafletjs.com/) map template.

* The map template is responsive.

* Besides Tabletop.js and Leaflet, the template utilizes the [Bootstrap](http://twitter.github.io/bootstrap/) framework.

* H/T to [Chris Keller](https://twitter.com/ChrisLKeller) for his work on his [Tabletop to DataTables template](https://github.com/chrislkeller/datafeed_to_datatables).


Setting up Tabletop
===========
* Follow the [Tabletop.js instructions](http://builtbybalance.com/Tabletop/#tabletop-instructions) for setting up the spreadsheet and publishing it.

* Make sure your table includes columns titled 'latitude' and 'longitude' with lat, long values for each location. Leaflet needs these values to map our markers. Click to view the [example table](https://docs.google.com/spreadsheet/pub?key=0As3JvOeYDO50dF9NWWRiaTdqNmdKQ1lCY3dpdDhZU3c&output=html).

* Open up the js/script.js file and add your spreadsheet ID as a value of the spreadsheet_key variable. Then rename "lat_column" and "long_column" to whatever the latitude and longitude columns in your table are called.

Plugins
===========
* You can also use [Leaflet plugins](http://leafletjs.com/plugins.html‎) with the map. One example is the [Leaflet.markercluster plugin](https://github.com/Leaflet/Leaflet.markercluster), which clusters markers that are close together. You can see an example of this [here](http://csessig86.github.io/tabletop_to_leaflet#cluster).